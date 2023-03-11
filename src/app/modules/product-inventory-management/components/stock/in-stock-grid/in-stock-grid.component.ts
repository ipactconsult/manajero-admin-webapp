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
import {MaterialService} from "../../../services/material/material.service";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {WarehouseService} from "../../../services/warehouse/warehouse.service";

@Component({
  selector: 'ngx-in-stock-grid',
  templateUrl: './in-stock-grid.component.html',
  styleUrls: ['./in-stock-grid.component.scss']
})
export class InStockGridComponent implements OnInit {

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
  dataWarehouses: Warehouse[] = [];
  positions = NbGlobalPhysicalPosition;
  materialTransfer;
  warehouse;
  hiddenOldW = false;
  hiddenNew = true;
  alertNumber = 0;
  materialToEditQ;
  userConnected;

  constructor(private materialService: MaterialService, private dialogService: NbDialogService,
              private categoryService: CategoryService, private router: Router,
              private warehouseService: WarehouseService, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.dataWarehouses = [];
        for (let w = 0; w < data.length; w++) {
          if (data[w].warehouseState === true && data[w].addedBy?.company === this.userConnected.company) {
            this.dataWarehouses.push(data[w]);
          }
        }
      }, (err) => {
        return err;
      }
    )
  }

  getAllStockedMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[])=> {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true) {
            if (data[m].stockState === true && data[m].addedBy?.company === this.userConnected.company) {
              if (data[m].materialType !== 'Service') {
                this.dataMaterials.push(data[m]);
              }
            }
          }
        }
        for (let m = 0; m < this.dataMaterials.length; m++) {
          if (this.dataMaterials[m].quantityStock < this.dataMaterials[m].stockAlert) {
            this.alertNumber = this.alertNumber + 1;
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
          if (data[c].categoryState === true && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllStockedMaterialsASC() {
    this.materialService.getAllMaterialsASC().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true) {
            if (data[m].stockState === true && data[m].addedBy?.company === this.userConnected.company) {
              if (data[m].materialType !== 'Service') {
                this.dataMaterials.push(data[m]);
              }
            }
          }
        }
        for (let m = 0; m < this.dataMaterials.length; m++) {
          if (this.dataMaterials[m].quantityStock < this.dataMaterials[m].stockAlert) {
            this.alertNumber = this.alertNumber + 1;
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllStockedMaterialsDESC() {
    this.materialService.getAllMaterialsDESC().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true) {
            if (data[m].stockState === true && data[m].addedBy?.company === this.userConnected.company) {
              if (data[m].materialType !== 'Service') {
                this.dataMaterials.push(data[m]);
              }
            }
          }
        }
        for (let m = 0; m < this.dataMaterials.length; m++) {
          if (this.dataMaterials[m].quantityStock < this.dataMaterials[m].stockAlert) {
            this.alertNumber = this.alertNumber + 1;
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  open2(dialog: TemplateRef<any>, warehouse) {
    this.dialogService.open(dialog);
    for (let w = 0; w < this.dataWarehouses.length; w++) {
      if (this.dataWarehouses[w].warehouseLocation === warehouse.warehouseLocation) {
        this.dataWarehouses.splice(this.dataWarehouses.indexOf(this.dataWarehouses[w]), 1);
      }
    }
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
              d.materialType === e && d.stockState === true
              && d.addedBy?.company === this.userConnected.company
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
              d.materialCategory.categoryName === e && d.stockState === true
              && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  replenishMaterial(material): void {
    this.materialToEditQ = {
      materialQuantity: material.stockMax - material.quantityStock
    };
    this.materialService.updateMaterialQuantity(this.materialToEditQ, material.materialId).subscribe(() => {
      this.router.navigateByUrl(`/pim/replenishment/${material.materialId}`);
    }, errorM => {
      this.showToast(errorM.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  selectWarehouse(selectedWarehouse): void {
    this.warehouse = selectedWarehouse;
  }

  transferMaterialToW(materialId, ref): void {
    this.materialTransfer = {
      warehouse: this.warehouse
    };
    this.materialService.transferMaterialToW(this.materialTransfer, materialId).subscribe(() => {
      this.showToast('Material Transferred Successfully' , this.positions.TOP_RIGHT, 'success');
      this.hiddenOldW = true;
      this.hiddenNew = false;
      ref.close();
    }, errorW => {
      this.showToast(errorW.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataMaterials, 'Stocked Materials');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.getAllStockedMaterials();
    this.getAllCategories();
    this.getAllWarehouses();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
