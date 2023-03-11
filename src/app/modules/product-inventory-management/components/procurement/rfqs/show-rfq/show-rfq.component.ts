import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {Material} from "../../../../models/material/material";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {Supplier} from "../../../../models/supplier/supplier";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-show-rfq',
  templateUrl: './show-rfq.component.html',
  styleUrls: ['./show-rfq.component.scss']
})
export class ShowRfqComponent implements OnInit {

  existedRFQ: RequestForQuotation = new RequestForQuotation();
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  rfqCreationDate;
  quotationDeadline;
  completedState1 = true;
  completedState2 = true;
  materials: Material[] = [];
  suppliers: Supplier[] = [];
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;
  quotationDL: Date;
  currentDate: Date;
  differenceDates;
  existedPP;
  progressStatus="warning";

  constructor(private prService: PurchaseRequisitionService, private rfqService: RequestForQuotationService, 
              private location: Location, private toastrService: NbToastrService, 
              private router: Router, private dialogService: NbDialogService,
              private ppService: PurchaseProcessService) {
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      this.rfqService.deleteRFQ(this.existedRFQ.rfqId).subscribe(() => {
      sessionStorage.removeItem('request for quotation');
    }, error => {
      return error.error;
    })
  }
  
  goToQuotation(): void {
    this.router.navigateByUrl('/pim/procurement/quotation/maintain');
    sessionStorage.setItem("request for quotation", JSON.stringify(this.existedRFQ));
  }
  
  goToPreviousRoute(): void {
    this.router.navigateByUrl('/pim/procurement/rfq/create');
      this.rfqService.deleteRFQ(this.existedRFQ.rfqId).subscribe(() => {
      sessionStorage.removeItem('request for quotation');
    }, error => {
      return error.error;
    })
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    this.rfqService.deleteRFQ(this.existedRFQ.rfqId).subscribe(() => {
      this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
        this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
          sessionStorage.removeItem('materials');
          sessionStorage.removeItem('purchase requisition');
          sessionStorage.removeItem('request for quotation');
          sessionStorage.removeItem('purchaseProcess');
          this.showToast("Purchase Cancelled" , this.positions.TOP_RIGHT, 'danger');
          this.router.navigateByUrl('/pim/procurement/materials');
        }, errorPP => {
          return errorPP.error;
        })
    }, error => {
      return error.error;
    })
    }, err => {
      return err.error;
    })
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.rfqService.getOneRFQ(this.router.url
      .replace('/pim/procurement/rfq/', '')).subscribe((rfq) => {
        this.existedRFQ = rfq;
        this.materials = this.existedRFQ.pr.material;
        this.suppliers = this.existedRFQ.suppliers;
        this.rfqCreationDate = moment(this.existedRFQ.rfqCreationDate).format('DD MMM YYYY');
        this.quotationDeadline = moment(this.existedRFQ.quotationDeadline).format('DD MMM YYYY');
        this.quotationDL = new Date(this.quotationDeadline);
        this.currentDate = new Date();
        if (this.quotationDL.getTime() < this.currentDate.getTime()) {
          this.showToast('Quotation Deadline is OVER!' , this.positions.TOP_RIGHT, 'danger');
        }
        
        if (this.quotationDL.getTime() === this.currentDate.getTime()) {
          this.showToast('Quotation Deadline is TODAY!' , this.positions.TOP_RIGHT, 'info');
        }
        
        this.differenceDates = Math.floor((Date.UTC(this.quotationDL.getFullYear(), this.quotationDL.getMonth(), this.quotationDL.getDate()) - Date.UTC(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
        
        if (this.differenceDates > 0) {
          this.showToast(`Quotation Deadline: ${this.differenceDates} Days Left!` 
          , this.positions.TOP_RIGHT, 'info');
        }
    });
    this.existedPR = JSON.parse(sessionStorage.getItem("purchase requisition"));
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
  }

}
