import {Component, OnInit, TemplateRef} from '@angular/core';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";
import {Location} from "@angular/common";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Inventory} from "../../../models/inventory/inventory";
import moment from 'moment';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.scss']
})
export class CreateInventoryComponent implements OnInit {
  
  stockedMaterials: Material[] = [];
  positions = NbGlobalPhysicalPosition;
  existedMaterial: Material = new Material();
  stockReel;
  counterRS = 0;
  counting = 0;
  inventory;
  existedInv: Inventory = new Inventory();
  inventories: Inventory[] = [];
  moment: any = moment;
  dateToday;
  invDateForm: FormGroup;
  invDateEquality = 0;
  invCheckCreation = 0;
  invEquality = 0;
  userConnected;

  constructor(private invService: InventoryService, private materialService: MaterialService,
              private location: Location, private dialogService: NbDialogService,
              private toastrService: NbToastrService, private router: Router,
              private formBuilder: FormBuilder) {
    this.invDateForm = formBuilder.group({
      inventoryDate: ['', Validators.required]
    })
  }

  invDateChange(event): void {
    this.invDateEquality = 0;
    for (let i = 0; i < this.inventories.length; i++) {
      if (this.moment(this.inventories[i].inventoryDate).format('YYYY-MM-DD') 
        === this.moment(event).format('YYYY-MM-DD') && 
        this.inventories[i].addedBy?.company === this.userConnected.company) {
        this.invDateEquality = this.invDateEquality + 1;
      }
    }
    if (this.invDateEquality > 0) {
      this.showToast('You already created an inventory with this date!' , this.positions.TOP_RIGHT, 'danger');
    }
  }

  goToPreviousRoute(): void {
    this.location.back();
  }

  goToThirdStep(dialog: TemplateRef<any>): void {
    this.counting = this.counting + 1;
    this.dialogService.open(dialog);
  }

  openConfirm(dialogConfirm: TemplateRef<any>) {
    this.dialogService.open(dialogConfirm);
  }

  secondCounting(ref): void {
    this.counting = this.counting + 1;
    ref.close();
  }

  backToFirstCounting(): void {
    this.counting = this.counting - 1;
  }

  changeReelStock(reelStock): void {
    if (reelStock.target.value <= 0) {
      this.showToast(`Reel Stock must be positive!`,
        this.positions.TOP_RIGHT, 'danger');
    }
    if (reelStock.target.value > this.existedMaterial.stockMax) {
      this.showToast(`Reel Stock must be less than maximum quantity in stock!`,
        this.positions.TOP_RIGHT, 'danger');
    }
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "INV"+result;
  }

  goToLastStep(ref): void {
    this.counting = 1;
    this.inventory = {
      counting: 1,
      materials: this.stockedMaterials,
      inventoryDate: this.invDateForm.value.inventoryDate,
      inventoryRef: CreateInventoryComponent.getRandomNumber(100000, 999999)
    };
    ref.close();
  }

  lastStepSecondCounting(): void {
    this.counting = 2;
    this.inventory = {
      counting: this.counting,
      materials: this.stockedMaterials,
      inventoryDate: this.invDateForm.value.inventoryDate,
      inventoryRef: CreateInventoryComponent.getRandomNumber(100000, 999999)
    };
  }
  
  createInventory(ref): void {
    for (let i = 0; i < this.stockedMaterials.length; i++) {
      if (this.stockedMaterials[i].quantityStock === this.stockedMaterials[i].quantityReel) {
        this.invEquality = this.invEquality + 1;
      }
    }
    if (this.invEquality === this.stockedMaterials.length) {
      this.inventory = {
        counting: this.counting,
        materials: this.stockedMaterials,
        inventoryDate: this.invDateForm.value.inventoryDate,
        inventoryRef: CreateInventoryComponent.getRandomNumber(100000, 999999),
        inventoryFixed: true,
        addedBy: this.userConnected
      };
    } else {
      this.inventory = {
        counting: this.counting,
        materials: this.stockedMaterials,
        inventoryDate: this.invDateForm.value.inventoryDate,
        inventoryRef: CreateInventoryComponent.getRandomNumber(100000, 999999),
        inventoryFixed: false,
        addedBy: this.userConnected
      };
    }
    this.invService.createInventory(this.inventory).subscribe(inventory => {
      this.existedInv = inventory;
      ref.close();
      this.showToast(`Inventory Created Successfully!`,
        this.positions.TOP_RIGHT, 'success');
      this.router.navigateByUrl("/pim/stock/inventories");
    }, errorInv => {
      this.showToast(errorInv.error,
        this.positions.TOP_RIGHT, 'danger');
    })
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  open2(dialog: TemplateRef<any>, materialId) {
    this.dialogService.open(dialog);
    this.materialService.getOneMaterial(materialId).subscribe(material => {
      this.existedMaterial = material;
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }
  
  updateStock(ref): void {
    for (let m = 0; m < this.stockedMaterials.length; m++) {
      if (this.stockedMaterials[m].materialId === this.existedMaterial.materialId) {
        this.stockedMaterials[m].quantityReel = this.stockReel;
        this.showToast('Material Updated Successfully' , this.positions.TOP_RIGHT, 'success');
        this.stockReel = null;
        ref.close();
        this.counterRS = this.counterRS + 1;
      }
    }
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.dateToday = new Date();
    this.materialService.getAllMaterials().subscribe(materials => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].stockState === true && 
          materials[m].addedBy?.company === this.userConnected.company) {
          this.stockedMaterials.push(materials[m]);
        }
      }
    });
    this.invService.getAllInventories().subscribe(inventories => {
      this.inventories = inventories;
      for (let i = 0; i < this.inventories.length; i++) {
        if (this.moment(this.inventories[i].inventoryCreationDate).format('YYYY-MM')
          === this.moment(this.dateToday).format('YYYY-MM') 
          && this.inventories[i].addedBy?.company === this.userConnected.company) {
          this.invCheckCreation = this.invCheckCreation + 1;
        }
      }
      if (this.invCheckCreation > 0) {
        this.location.back();
        this.showToast('You have already created an inventory this month. ' +
          'You can only create one inventory per month!', 
          this.positions.TOP_RIGHT, 'danger');
      }
    });
  }

}
