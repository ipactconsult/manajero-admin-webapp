import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbComponentStatus, NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {ExportService} from "../../../../../../shared/exports/export.service";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {Router} from "@angular/router";
import moment from 'moment';

@Component({
  selector: 'ngx-prs',
  templateUrl: './prs.component.html',
  styleUrls: ['./prs.component.scss']
})
export class PrsComponent implements OnInit {

  myDate = new Date().toDateString();
  current : number = 1;
  config : NbToastrConfig;
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  searchPR : string;
  positions = NbGlobalPhysicalPosition;
  prs: PurchaseRequisition[] = [];
  moment: any = moment;
  pageSize: number = 6;
  userConnected;
  constructor(private exportService: ExportService, private prService: PurchaseRequisitionService, 
              private windowService: NbWindowService, private router: Router, 
              private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getPRS();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }
  
  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Purchase Requisitions Data',
    templateString: `<header>Purchase Rquisitions \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  };

  getPRS() {
    this.prService.getAllPR().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === false || data[p].addedBy?.company !== this.userConnected.company) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
  getPRS_ASC() {
    this.prService.getAllPR_ASC().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === false || data[p].addedBy?.company !== this.userConnected.company) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
  getPRS_DESC() {
    this.prService.getAllPR_DESC().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = data;
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === false || data[p].addedBy?.company !== this.userConnected.company) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }

  getPRSByDate(e) {
    this.filterByDate(e);
  }

  filterByDate(e) {
    this.prService.getAllPR().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = [];
        this.prs = data.filter(
          (d =>
              this.moment(d.purchaseRequisitionCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.purchaseRequisitionState === true && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  filterByStatus(e) {
    this.prService.getAllPR().subscribe(
      (data: PurchaseRequisition[]) => {
        this.prs = [];
        
        this.prs = data.filter(
          (d =>
              d.purchaseRequisitionStatus === e && d.addedBy?.company === this.userConnected.company
          )
        );
        for (let p = 0; p < data.length; p++) {
          if (data[p].purchaseRequisitionState === false) {
            this.prs.splice(data.indexOf(data[p]), 1);
          }
        }
      }, (err) => {
        return err;
      });
  }
  
  getPR_By_Status(e) {
    this.filterByStatus(e);
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onArchiveConfirm(purchaseRequisition: PurchaseRequisition, ref) {
    this.prService.archivePR(purchaseRequisition.purchaseRequisitionId).subscribe(
      () => {
        this.showToast('Purchase Requisition Archived!' , this.positions.TOP_RIGHT, 'info');
        this.prs.splice(this.prs.indexOf(purchaseRequisition), 1);
        ref.close();
      });
  }
  
  deletePR(purchaseRequisition: PurchaseRequisition) {
    this.prService.deletePR(purchaseRequisition.purchaseRequisitionId).subscribe(
      () => {
        this.showToast('Purchase Requisition Deleted!' , this.positions.TOP_RIGHT, 'danger');
        this.prs.splice(this.prs.indexOf(purchaseRequisition), 1);
      });
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.prs, 'Purchase Requisitions');
  }

}
