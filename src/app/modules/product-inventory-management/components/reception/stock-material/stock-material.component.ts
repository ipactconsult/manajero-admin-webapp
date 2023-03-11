import { Warehouse } from './../../../models/warehouse/warehouse';
import { WarehouseService } from './../../../services/warehouse/warehouse.service';
import { StockMovementService } from './../../../services/stockMovement/stock-movement.service';
import { StockEntryService } from './../../../services/stockEntry/stock-entry.service';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {PurchaseProcessService} from "../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-stock-material',
  templateUrl: './stock-material.component.html',
  styleUrls: ['./stock-material.component.scss']
})
export class StockMaterialComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  stockForm: FormGroup;
  existedMaterial: Material = new Material();
  warehouses: Warehouse[] = [];
  materialId: String;
  existedPP;
  stockMovement;
  stockEntry;
  warehouseId;
  purchaseProcess;
  material;
  hideInputSellingPrice = true;
  sellingPriceVal;
  sellState;

  constructor(private stockEntryService: StockEntryService, private materialService: MaterialService,
              private dialogService: NbDialogService, private toastrService: NbToastrService, 
              private formBuilder: FormBuilder, private router: Router, 
              private location: Location, private ppService: PurchaseProcessService,
              private smService: StockMovementService, private warehouseService: WarehouseService) {
    this.stockForm = formBuilder.group({
      warehouse: ['', Validators.required],
      sellState: ['', Validators.required],
      sellingPrice: ['', Validators.required]
    })
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }

  changeSellingPrice(sellingPrice): void {
    if (sellingPrice.target.value <= 0) {
      this.showToast('Selling Price must be Positive!', 
      this.positions.TOP_RIGHT, 'danger');
    }
    if (sellingPrice.target.value > 0 && sellingPrice.target.value < this.existedMaterial.materialPrice) {
      this.showToast('Selling Price must be Greater or Equal to the Purchase Price!', 
      this.positions.TOP_RIGHT, 'danger');
    }
  }

  selectMaterialForSale(materialForSale): void {
    if (materialForSale === "Yes") {
      this.sellState = true;
      this.hideInputSellingPrice = false;
      this.sellingPriceVal = '';
    } else {
      this.sellState = false;
      this.sellingPriceVal = 0;
      this.hideInputSellingPrice = true;
    }
  }

  selectWarehouse(warehouseId): void {
    this.warehouseId = warehouseId;
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "STOCKENTRY"+result;
  }

  static getRandomNumberSM(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "SM"+result;
  }
  
  stockMaterial(material: Material): void {
    this.stockMovement = {
        smLabel: 'New Product '+material.materialName+' Stocked to Warehouse',
        quantitySM: material.materialQuantity,
        stateSM: 'In',
        smCode: StockMaterialComponent.getRandomNumberSM(100000, 999999)
      };
        this.stockEntry = {
        material: material,
        quantityIn: material.materialQuantity, 
        stockEntryRef: StockMaterialComponent.getRandomNumber(100000, 999999)
      };
      this.material = {
        sellState: this.sellState,
        sellingPrice: this.sellingPriceVal
      };
      this.materialService.stockMaterial(this.material, material.materialId, this.warehouseId).subscribe(() => {
            this.stockForm.reset();
            this.router.navigateByUrl("/pim/received-materials");
       this.stockEntryService.addNewStockEntry(this.stockEntry).subscribe(() => {
        this.smService.addNewSM(this.stockMovement, material.materialId).subscribe(() => {
          this.materialService.unreplenishMaterial(material.materialId).subscribe(() => {
            this.ppService.seventhEditPP(this.existedPP.purchaseProcessId, material.materialId).subscribe(purchaseProcess => {
              this.ppService.finalEditPPNoService(this.existedPP.purchaseProcessId).subscribe(pp => {
                sessionStorage.setItem("purchaseProcess", JSON.stringify(pp));
              });
            }, errorPP => {
              this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
            })
          }, errorM => {
            this.showToast(errorM.error , this.positions.TOP_RIGHT, 'danger');
          });
      }, errorSM => {
          this.showToast(errorSM.error , this.positions.TOP_RIGHT, 'danger');
        })
      }, errorEntry => {
        this.showToast(errorEntry.error , this.positions.TOP_RIGHT, 'danger');
      })
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.materialId = this.router.url.replace('/pim/material/stock/', '');
    this.materialService.getOneMaterial(this.materialId)
      .subscribe((material) => {
        this.existedMaterial = material;
      }, error => {
        return error.error;
      });
    this.warehouseService.getAllWarehouses().subscribe(warehouses => {
      this.warehouses = warehouses;
    }, errorW => {
      return errorW.error;
    })
  }

}
