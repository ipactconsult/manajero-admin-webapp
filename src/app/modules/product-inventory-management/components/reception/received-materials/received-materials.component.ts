import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Material} from "../../../models/material/material";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Category} from "../../../models/category/category";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {MaterialService} from "../../../services/material/material.service";
import {CategoryService} from "../../../services/category/category.service";
import {StockMovementService} from "../../../services/stockMovement/stock-movement.service";
import {Router} from "@angular/router";
import {WarehouseService} from "../../../services/warehouse/warehouse.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {StockEntryService} from "../../../services/stockEntry/stock-entry.service";
import {PurchaseProcessService} from "../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-received-materials',
  templateUrl: './received-materials.component.html',
  styleUrls: ['./received-materials.component.scss']
})
export class ReceivedMaterialsComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  material: Material = new Material();
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  pageSize: number = 3;
  dataMaterials: Material[] = [];
  dataCategories: Category[] = [];
  warehouses: Warehouse[] = [];
  positions = NbGlobalPhysicalPosition;
  warehouseId;
  stockMovement;
  stockEntry;
  existedPP;
  userConnected;

  constructor(private materialService: MaterialService, private dialogService: NbDialogService,
              private categoryService: CategoryService, private smService: StockMovementService,
              private router: Router, private warehouseService: WarehouseService,
              private windowService: NbWindowService, private toastrService: NbToastrService,
              private exportService: ExportService, private stockEntryService: StockEntryService,
              private ppService: PurchaseProcessService) {

  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[])=> {
        for (let w = 0; w < data.length; w++) {
          if (data[w].warehouseState === true
            && data[w].addedBy?.company === this.userConnected.company) {
            this.warehouses.push(data[w]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[])=> {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true && data[m].materialType !== 'Service') {
            if (data[m].receiptState === true
              && data[m].addedBy?.company === this.userConnected.company) {
              this.dataMaterials.push(data[m]);
            }
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllMaterialsASC() {
    this.materialService.getAllMaterialsASC().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true && data[m].materialType !== 'Service') {
            if (data[m].receiptState === true
              && data[m].addedBy?.company === this.userConnected.company) {
              this.dataMaterials.push(data[m]);
            }
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllMaterialsDESC() {
    this.materialService.getAllMaterialsDESC().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true && data[m].materialType !== 'Service') {
            if (data[m].receiptState === true
              && data[m].addedBy?.company === this.userConnected.company) {
              this.dataMaterials.push(data[m]);
            }
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  openConfirm(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  goToCreatePurchaseReturn(material: Material) {
    this.router.navigateByUrl(`/pim/purchase-return/create/${material.materialId}`);
  }

  goToStockMaterial(material: Material) {
    this.router.navigateByUrl(`/pim/material/stock/${material.materialId}`);
  }

  getMaterialsByMaterialType(e) {
    this.filterByMaterialType(e);
  }

  filterByMaterialType(e) {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        this.dataMaterials = data.filter(
          (d =>
              d.materialType === e &&
              d.materialState === true &&
              d.receiptState === true &&
              d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getMaterialsByCategory(e) {
    this.filterByCategory(e);
  }

  filterByCategory(e) {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        this.dataMaterials = data.filter(
          (d =>
              d.materialCategory === e &&
              d.materialState === true &&
              d.receiptState === true &&
              d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataMaterials, 'Received Materials');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
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

  stockMaterialW(material: Material, warehouse: Warehouse, ref): void {
    this.stockMovement = {
      smLabel: 'Product '+material.materialName+' Stocked to Warehouse '+warehouse.warehouseLocation,
      quantitySM: material.materialQuantity,
      stateSM: 'In',
      smCode: ReceivedMaterialsComponent.getRandomNumberSM(100000, 999999)
    };
    this.stockEntry = {
      material: material,
      quantityIn: material.materialQuantity,
      stockEntryRef: ReceivedMaterialsComponent.getRandomNumber(100000, 999999)
    };
    this.materialService.stockMaterialW(material.materialId).subscribe(() => {
      this.stockEntryService.addNewStockEntry(this.stockEntry).subscribe(() => {
        this.smService.addNewSM(this.stockMovement, material.materialId).subscribe(() => {
          this.materialService.unreplenishMaterial(material.materialId).subscribe(() => {
            this.showToast('Material Stocked Successfully to Warehouse '+warehouse.warehouseLocation,
              this.positions.TOP_RIGHT, 'success');
            ref.close();
            this.dataMaterials.splice(this.dataMaterials.indexOf(material), 1);
          });
        });
      }, errorM => {
        this.showToast(errorM.error , this.positions.TOP_RIGHT, 'danger');
      })
    }, errorSM => {
      this.showToast(errorSM.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.userConnected = JSON.parse(sessionStorage.getItem("auth-user"));
    this.getAllMaterials();
    this.getAllCategories();
    this.getAllWarehouses();
  }

}
