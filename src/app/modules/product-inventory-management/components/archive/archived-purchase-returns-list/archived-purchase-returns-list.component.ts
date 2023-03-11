import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import moment from 'moment';
import {PurchaseReturn} from "../../../models/purchaseReturn/purchase-return";
import {Material} from "../../../models/material/material";
import {Supplier} from "../../../models/supplier/supplier";
import {PurchaseReturnService} from "../../../services/purchaseReturn/purchase-return.service";
import {MaterialService} from "../../../services/material/material.service";
import {Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier/supplier.service";
import {ExportService} from "../../../../../shared/exports/export.service";

@Component({
  selector: 'ngx-archived-purchase-returns-list',
  templateUrl: './archived-purchase-returns-list.component.html',
  styleUrls: ['./archived-purchase-returns-list.component.scss']
})
export class ArchivedPurchaseReturnsListComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
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
  dataPurchaseReturns: PurchaseReturn[] = [];
  moment: any = moment;
  pageSize: number = 3;
  positions = NbGlobalPhysicalPosition;
  materials: Material [] = [];
  suppliers: Supplier [] = [];
  exportExcelStatus: String;
  exportExcelMsg: String;

  constructor(private purchaseReturnService: PurchaseReturnService, private materialService: MaterialService,
              private dialogService: NbDialogService, private router: Router, 
              private windowService: NbWindowService, private toastrService: NbToastrService, 
              private supplierService: SupplierService, private exportService: ExportService) { }
  
  getAllArchivedPurchaseReturns() {
    this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].purchaseReturnState === false) {
            this.dataPurchaseReturns.push(data[s]);
          }
        }
        if (this.dataPurchaseReturns.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
    }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedPurchaseReturnsASC() {
    this.purchaseReturnService.getAllPurchaseReturnsASC().subscribe(
      (data: PurchaseReturn[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].purchaseReturnState === false) {
            this.dataPurchaseReturns.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedPurchaseReturnsDESC() {
    this.purchaseReturnService.getAllPurchaseReturnsDESC().subscribe(
      (data: PurchaseReturn[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].purchaseReturnState === false) {
            this.dataPurchaseReturns.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getArchivedPurchaseReturnsByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        this.dataPurchaseReturns = data.filter(
          (d =>
              d.material.materialName === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  getArchivedPurchaseReturnsBySupplier(e) {
    this.filterBySupplier(e);
  }
  
  filterBySupplier(e) {
    this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        this.dataPurchaseReturns = data.filter(
          (d =>
              `${d.material.supplier.supplierFirstName} ${d.material.supplier.supplierLastName}` === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onRestoreConfirm(purchaseReturn: PurchaseReturn, ref) {
    this.purchaseReturnService.restorePurchaseReturn(purchaseReturn.purchaseReturnId).subscribe(
      () => {
        this.showToast('Purchase Return Restored!',
        this.positions.TOP_RIGHT, 'info');
        this.dataPurchaseReturns.splice(this.dataPurchaseReturns.indexOf(purchaseReturn), 1);
        ref.close();
      }, errorArchive => {
        return errorArchive.error;
      });
  }
  
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataPurchaseReturns, 'Archived Purchase Returns');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.getAllArchivedPurchaseReturns();
    this.getAllMaterials();
    this.getAllSuppliers();
  }

}
