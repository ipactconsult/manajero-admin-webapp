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
  selector: 'ngx-purchase-returns',
  templateUrl: './purchase-returns.component.html',
  styleUrls: ['./purchase-returns.component.scss']
})
export class PurchaseReturnsComponent implements OnInit {

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
  userConnected;

  constructor(private purchaseReturnService: PurchaseReturnService, private materialService: MaterialService,
              private dialogService: NbDialogService, private router: Router, 
              private windowService: NbWindowService, private toastrService: NbToastrService, 
              private supplierService: SupplierService, private exportService: ExportService) { }
  
  getAllPurchaseReturns() {
    this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseReturnState === true 
           && data[p].material?.addedBy?.company === this.userConnected.company) {
            this.dataPurchaseReturns.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.materials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true 
            && data[m].addedBy?.company === this.userConnected.company) {
            this.materials.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === true
            && data[s].addedBy?.company === this.userConnected.company) {
            this.suppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllPurchaseReturnsASC() {
    this.purchaseReturnService.getAllPurchaseReturnsASC().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseReturnState === true
            && data[p].material?.addedBy?.company === this.userConnected.company) {
            this.dataPurchaseReturns.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllPurchaseReturnsDESC() {
    this.purchaseReturnService.getAllPurchaseReturnsDESC().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseReturnState === true
            && data[p].material?.addedBy?.company === this.userConnected.company) {
            this.dataPurchaseReturns.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getPurchaseReturnsByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        this.dataPurchaseReturns = data.filter(
          (d =>
              d.material.materialName === e &&
              d.purchaseReturnState === true && 
              d.material?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  getPurchaseReturnsBySupplier(e) {
    this.filterBySupplier(e);
  }
  
  filterBySupplier(e) {
    this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
        this.dataPurchaseReturns = [];
        this.dataPurchaseReturns = data.filter(
          (d =>
              `${d.material.supplier.supplierFirstName} ${d.material.supplier.supplierLastName}` === e &&
              d.purchaseReturnState === true && 
              d.material?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onArchiveConfirm(purchaseReturn: PurchaseReturn, ref) {
    this.purchaseReturnService.archivePurchaseReturn(purchaseReturn.purchaseReturnId).subscribe(
      () => {
        this.showToast('Purchase Return Archived!' , 
        this.positions.TOP_RIGHT, 'info');
        this.dataPurchaseReturns.splice(this.dataPurchaseReturns.indexOf(purchaseReturn), 1);
        ref.close();
      }, errorArchive => {
        return errorArchive.error;
      });
  }
  
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataPurchaseReturns, 'Purchase Returns');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.getAllPurchaseReturns();
    this.getAllMaterials();
    this.getAllSuppliers();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
