import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import moment from 'moment';
import {StockExitService} from "../../../services/stockExit/stock-exit.service";
import {StockMovementService} from "../../../services/stockMovement/stock-movement.service";

@Component({
  selector: 'ngx-create-stock-exit',
  templateUrl: './create-stock-exit.component.html',
  styleUrls: ['./create-stock-exit.component.scss']
})
export class CreateStockExitComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  selectedMaterial = null;
  materials: Material[] = [];
  selectedMaterials: Material[] = [];
  moment: any = moment;
  stockForm: FormGroup;
  quantityOut = '';
  hiddenUpdate: boolean = true;
  hiddenConfirm: boolean = false;
  stockMvmnt;
  stockExit;
  hiddenQuantityOut = true;
  userConnected;

  constructor(private materialService: MaterialService, private stockExitService: StockExitService,
              private smService: StockMovementService, private dialogService: NbDialogService, 
              private toastrService: NbToastrService, private formBuilder: FormBuilder, 
              private router: Router, private location: Location) {
    this.stockForm = formBuilder.group({
      material: ['', Validators.required],
      quantityOut: ['', Validators.required]
    })
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  open2Update(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  open2SE(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }

  changeQuantityOut(quantityOut): void {
    if (quantityOut.target.value > 0 && quantityOut.target.value > this.selectedMaterial.quantityStock) {
      this.showToast('Quantity Out must be Less than Quantity in Stock!', 
        this.positions.TOP_RIGHT, 'danger');
    }
    if (quantityOut.target.value <= 0) {
      this.showToast('Quantity Out must be Positive!', 
        this.positions.TOP_RIGHT, 'danger');
    }
  }
  
  selectMaterial(selectedMaterial): void {
      this.selectedMaterial = selectedMaterial;
      this.hiddenQuantityOut = false;
  }
  
  setMaterialWithQuantity(ref) {
    if (this.selectedMaterial.quantityStock < this.stockForm.value.quantityOut) {
      this.showToast('Quantity to be out of stock must be less than quantity in stock', 
        this.positions.TOP_RIGHT, 'danger');
      ref.close();
    } else if (this.stockForm.value.quantityOut <= 0) {
      this.showToast('Quantity Out must be Positive', 
        this.positions.TOP_RIGHT, 'danger');
      ref.close();
    } else {
      this.selectedMaterials.push(this.selectedMaterial);
      for (let m = 0; m < this.selectedMaterials.length; m++) {
        if (this.selectedMaterials[m] === this.selectedMaterial) {
          this.selectedMaterials[m].quantityOut = this.stockForm.value.quantityOut 
        }
      }
      sessionStorage.setItem("materials to be out", JSON.stringify(this.selectedMaterials));
      this.stockForm.reset();
      ref.close();
      this.materials.splice(this.materials.indexOf(this.selectedMaterial), 1);
      this.selectedMaterial = null;
    }
  }
  
  updateMaterialWithQuantity(ref) {
    if (this.selectedMaterial.quantityStock < this.stockForm.value.quantityOut) {
      this.showToast('Quantity to be out of stock must be less than quantity in stock', 
        this.positions.TOP_RIGHT, 'danger');
      ref.close();
    } else if (this.stockForm.value.quantityOut <= 0) {
      this.showToast('Quantity Out must be Positive', 
        this.positions.TOP_RIGHT, 'danger');
      ref.close();
    } else {
      this.selectedMaterials.splice(this.selectedMaterials.indexOf(this.selectedMaterial), 1);
      this.selectedMaterials.push(this.selectedMaterial);
      for (let m = 0; m < this.selectedMaterials.length; m++) {
        if (this.selectedMaterials[m] === this.selectedMaterial) {
          this.selectedMaterials[m].quantityOut = this.stockForm.value.quantityOut 
        }
      }
      sessionStorage.setItem("materials to be out", JSON.stringify(this.selectedMaterials));
      this.stockForm.reset();
      ref.close();
      this.materials.splice(this.materials.indexOf(this.selectedMaterial), 1);
      this.selectedMaterial = null;
      this.hiddenUpdate = true;
      this.hiddenConfirm = false;
    }
  }
  
  cancelSelection(material) {
    this.selectedMaterials.splice(this.selectedMaterials.indexOf(this.selectedMaterial), 1);
    this.materials.push(material);
    if (this.selectedMaterials.length === 0) {
      sessionStorage.removeItem("materials to be out");
    } else {
      sessionStorage.setItem("materials to be out", JSON.stringify(this.selectedMaterials));
    }
  }
  
  editSelection(material) {
    this.quantityOut = material.quantityOut;
    this.materials.push(material);
    this.selectedMaterial = material;
    this.hiddenUpdate = false;
    this.hiddenConfirm = true;
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "STOCKEXIT"+result;
  }

  static getRandomNumberSM(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "SM"+result;
  }
  
  createStockExits(ref) {
    for (let m = 0; m < this.selectedMaterials.length; m++) {
      this.stockExit = {
        material: this.selectedMaterials[m],
        quantityOut: this.selectedMaterials[m].quantityOut,
        stockExitRef: CreateStockExitComponent.getRandomNumber(100000, 999999)
      };
      this.stockMvmnt = {
        smLabel: 'Product ' + this.selectedMaterials[m].materialName + ' Exit the Stock',
        quantitySM: this.selectedMaterials[m].quantityOut,
        stateSM: 'Out',
        smCode: CreateStockExitComponent.getRandomNumberSM(100000, 999999)
      };
      this.stockExitService.addNewStockExit(this.stockExit).subscribe(() => {
        this.materialService.updateMaterialStock(this.selectedMaterials[m], this.selectedMaterials[m].materialId)
        .subscribe(() => {
        this.smService.addNewSM(this.stockMvmnt, this.selectedMaterials[m].materialId).subscribe(() => {
          this.showToast('Stock Exits Created Successfully', 
        this.positions.TOP_RIGHT, 'success');
          ref.close();
          this.router.navigateByUrl('/pim/stock/out');
        }, errorSM => {
          return errorSM;
        })
      }, errorM => {
          return errorM;
        })
      }, errorSE => {
        return errorSE
      })      
    }
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.materialService.getAllMaterials().subscribe(materials => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].stockState === true && materials[m].materialState === true
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.materials.push(materials[m]);
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }
}
