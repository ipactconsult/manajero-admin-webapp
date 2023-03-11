import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbComponentStatus, NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {PurchaseRequisition} from "../../../models/purchaseRequisition/purchase-requisition";
import {ExportService} from "../../../../../shared/exports/export.service";
import {PurchaseRequisitionService} from "../../../services/purchaseRequisition/purchase-requisition.service";
import {Router} from "@angular/router";
import moment from 'moment';

@Component({
  selector: 'ngx-archived-prs-list',
  templateUrl: './archived-prs-list.component.html',
  styleUrls: ['./archived-prs-list.component.scss']
})
export class ArchivedPrsListComponent implements OnInit {

  myDate = new Date().toDateString();

  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Purchase Requisitions Data',
    templateString: `<header>Purchase Rquisitions \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  }
  current : number = 1;
  moment: any = moment;
  config : NbToastrConfig;
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  searchPR : string;
  pageSize: number = 3;
  count;
  prs: PurchaseRequisition[] = [];
  positions = NbGlobalPhysicalPosition;
  exportExcelMsg: String;
  exportExcelStatus: String;
  exportPDFMsg: String;
  exportPDFStatus: String;
  
  constructor(private exportService: ExportService, private prService: PurchaseRequisitionService,
              private windowService: NbWindowService, private router: Router, 
              private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getArchivedPurchaseRequisitions();
  }

  getArchivedPurchaseRequisitions() {
    this.prService.getAllPR().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === true) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
        if (this.prs.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
      this.exportPDFMsg = 'Export is not possible';
      this.exportPDFStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
      this.exportPDFMsg = 'Click here to export data to PDF';
      this.exportPDFStatus = 'primary';
    }
        }, (err) => {
        return err;
      },
    );
  }
  
  getArchivedPurchaseRequisitionsASC() {
    this.prService.getAllPR_ASC().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === true) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
  getArchivedPurchaseRequisitionsDESC() {
    this.prService.getAllPR_DESC().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === true) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
  filterByPR_Status(e) {
    this.prService.getAllPR().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        
        this.prs = data.filter(
          (d =>
              d.purchaseRequisitionStatus === e
          )
        );
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === true) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
      }, (err) => {
        return err;
      });
  }
  
  getPR_By_Status(e) {
    this.filterByPR_Status(e);
  }
  
  onRestoreConfirm(purchaseRequisition: PurchaseRequisition, ref) {
    this.prService.restorePR(purchaseRequisition.purchaseRequisitionId).subscribe(
      () => {
        this.showToast('Purchase Requisition Restored!' , this.positions.TOP_RIGHT, 'success');
        this.prs.splice(this.prs.indexOf(purchaseRequisition), 1);
        ref.close();
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.prs, 'Archived Purchase Requisitions');
  }

}
