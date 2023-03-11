import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {PurchaseOrder} from "../../../models/purchaseOrder/purchase-order";
import {Supplier} from "../../../models/supplier/supplier";
import {PurchaseOrderService} from "../../../services/purchaseOrder/purchase-order.service";
import {MaterialService} from "../../../services/material/material.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import {PurchaseProcessService} from "../../../services/purchaseProcess/purchase-process.service";
import {SupplierService} from "../../../services/supplier/supplier.service";
import moment from "moment";

@Component({
  selector: 'ngx-archived-purchase-orders-list',
  templateUrl: './archived-purchase-orders-list.component.html',
  styleUrls: ['./archived-purchase-orders-list.component.scss']
})
export class ArchivedPurchaseOrdersListComponent implements OnInit {

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
  dataPOs: PurchaseOrder[] = [];
  suppliers: Supplier[] = [];
  moment: any = moment;
  pageSize: number = 6;
  positions = NbGlobalPhysicalPosition;
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  existedPP;
  purchaseProcess;

  constructor(private poService: PurchaseOrderService, private materialService: MaterialService,
              private dialogService: NbDialogService, private router: Router,
              private windowService: NbWindowService, private toastrService: NbToastrService,
              private exportService: ExportService, private ppService: PurchaseProcessService,
              private supplierService: SupplierService) { }

  getAllArchivedPOs() {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].poState === false) {
            this.dataPOs.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllArchivedPOsASCByCode() {
    this.poService.getAllPOsASCByCode().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].poState === false) {
            this.dataPOs.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllArchivedPOsDESCByCode() {
    this.poService.getAllPOsDESCByCode().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].poState === false) {
            this.dataPOs.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getArchivedPOsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        this.dataPOs = data.filter(
          (d =>
              this.moment(d.poCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.poState === false
          )
        );
      }, (err) => {
        return err;
      });
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

  getArchivedPOsBySupplier(e) {
    this.filterBySupplier(e);
  }

  filterBySupplier(e) {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        this.dataPOs = data.filter(
          (d =>
              `${d.selectedSupplier?.supplierFirstName} ${d.selectedSupplier?.supplierLastName}` === e &&
              d.poState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onRestoreConfirm(po: PurchaseOrder, ref) {
    this.poService.restorePO(po.poId).subscribe(
      () => {
        this.showToast('Purchase Order Restored!' ,
          this.positions.TOP_RIGHT, 'info');
        this.dataPOs.splice(this.dataPOs.indexOf(po), 1);
        ref.close();
      }, errorArchive => {
        return errorArchive.error;
      });
  }

  getArchivedPOsByStatus(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        this.dataPOs = data.filter(
          (d =>
              d.poStatus === e &&
              d.poState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataPOs, 'Archived Purchase Orders');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.getAllArchivedPOs();
    this.getAllSuppliers();
  }

}
