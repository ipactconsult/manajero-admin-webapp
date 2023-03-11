import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import moment from "moment";
import {QuotationService} from "../../../../services/quotation/quotation.service";
import {Quotation} from "../../../../models/quotation/quotation";
import {Material} from "../../../../models/material/material";
import {Supplier} from "../../../../models/supplier/supplier";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-decide-vendor',
  templateUrl: './decide-vendor.component.html',
  styleUrls: ['./decide-vendor.component.scss']
})
export class DecideVendorComponent implements OnInit {
  
  allQuotations: Quotation[] = [];
  quotationsByQN: Quotation[] = [];
  suppliersByQN: Supplier[] = [];
  existedRFQ: RequestForQuotation = new RequestForQuotation();
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  selectedSupplier: Supplier = new Supplier();
  rfqId: String;
  completedState4 = true;
  completedState3 = true;
  completedState2 = true;
  completedState1 = true;
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;
  getSupplierStorage;
  selectedStatus = false;
  existedPP;
  purchaseProcess;
  hideCV = false;
  progressStatus = "info";

  constructor(private prService: PurchaseRequisitionService, private rfqService: RequestForQuotationService,
              private router: Router, private quotationService: QuotationService,
              private location: Location, private dialogService: NbDialogService,
              private toastrService: NbToastrService, private ppService: PurchaseProcessService) {
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      sessionStorage.removeItem('quotations');
    for (let q = 0; q < this.quotationsByQN.length; q++)
      this.quotationService.deleteQuotation(this.quotationsByQN[q].quotationId).subscribe(() => {
      
      }, error => {
        return error.error;
      })
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    for (let q = 0; q < this.quotationsByQN.length; q++) {
      this.quotationService.deleteQuotation(this.quotationsByQN[q].quotationId).subscribe(() => {
        
      }, errorQ => {
        return errorQ.error;
      })
    }
    this.rfqService.deleteRFQ(this.existedRFQ.rfqId).subscribe(() => {
      this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
        this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
          sessionStorage.removeItem('materials');
          sessionStorage.removeItem('purchase requisition');
          sessionStorage.removeItem('request for quotation');
          sessionStorage.removeItem('quotations');
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
  
  goToPreviousRoute(): void {
    this.router.navigateByUrl("/pim/procurement/quotation/maintain");
    sessionStorage.removeItem('quotations');
    for (let q = 0; q < this.quotationsByQN.length; q++)
      this.quotationService.deleteQuotation(this.quotationsByQN[q].quotationId).subscribe(() => {
      
      }, error => {
        return error.error;
      })
  }
  
  confirmSupplierSelection(ref: any): void {
    this.purchaseProcess = {
      step: 5,
      supplier: this.selectedSupplier
    };
    this.ppService.fourthEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess)
      .subscribe(purchaseProcess => {
        sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
        sessionStorage.setItem('selectedSupplier', JSON.stringify(this.selectedSupplier));
        this.showToast(`Supplier ${this.selectedSupplier.supplierFirstName} ${this.selectedSupplier.supplierLastName} 
        Selected Successfully.` , this.positions.TOP_RIGHT, 'success');
        ref.close();
        this.router.navigateByUrl('/pim/procurement/purchase-order/create');
      }, errorPP => {
        return errorPP.error;
      })
  }
  
  selectSupplier(selectedSupplier): void {
      this.selectedSupplier = selectedSupplier;
      this.selectedStatus = true;
      this.hideCV = true;
    this.showToast(`Supplier ${this.selectedSupplier.supplierFirstName} ${this.selectedSupplier.supplierLastName} 
        Chosen.` , this.positions.TOP_RIGHT, 'success');
  }
  
  cancelSupplierSelection(): void {
    this.selectedSupplier = null;
    this.selectedStatus = false;
    this.hideCV = false;
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.existedRFQ = JSON.parse(sessionStorage.getItem("request for quotation"));
    this.existedPR = JSON.parse(sessionStorage.getItem("purchase requisition"));
    if (sessionStorage.getItem('selectedSupplier') !== null) {
      this.getSupplierStorage = JSON.parse(sessionStorage.getItem('selectedSupplier'));
    }
    this.rfqId = this.router.url.replace('/pim/procurement/decide-vendor/rfq/', '');
    this.quotationService.getAllQuotations().subscribe(quotations => {
      this.allQuotations = quotations;
      for (let q = 0; q < this.allQuotations.length; q++) {
        if (this.allQuotations[q].rfq.rfqId === this.rfqId) {
          this.quotationsByQN.push(this.allQuotations[q]);
        }
      }
      for (let qn = 0; qn < this.quotationsByQN.length; qn++) {
        this.suppliersByQN.push(this.quotationsByQN[qn].supplier);
      }
    })
  }

}
