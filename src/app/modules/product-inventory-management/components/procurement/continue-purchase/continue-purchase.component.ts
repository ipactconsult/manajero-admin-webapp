import { Component, OnInit } from '@angular/core';
import {PurchaseProcessService} from "../../../services/purchaseProcess/purchase-process.service";
import {Router} from "@angular/router";
import {PurchaseProcess} from "../../../models/purchaseProcess/purchase-process";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {PurchaseRequisitionService} from "../../../services/purchaseRequisition/purchase-requisition.service";

@Component({
  selector: 'ngx-continue-purchase',
  templateUrl: './continue-purchase.component.html',
  styleUrls: ['./continue-purchase.component.scss']
})
export class ContinuePurchaseComponent implements OnInit {
  
  purchaseProcess: PurchaseProcess = new PurchaseProcess();
  positions = NbGlobalPhysicalPosition;
  hiddenEndProcessBtn = true;
  hiddenContinueProcessBtn = false;
  stocked = 0;

  constructor(private ppService: PurchaseProcessService, private router: Router,
              private toastrService: NbToastrService, private prService: PurchaseRequisitionService) { }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  continuePurchase(): void {
    if (!this.purchaseProcess.pr) {
      sessionStorage.setItem("materials", JSON.stringify(this.purchaseProcess.materials));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      this.router.navigateByUrl('/pim/procurement/purchase-requisition/create');
    }
    if (this.purchaseProcess.pr && this.purchaseProcess.pr.purchaseRequisitionStatus === 'Pending') {
      sessionStorage.setItem("materials", JSON.stringify(this.purchaseProcess.materials));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      sessionStorage.setItem("purchase requisition", JSON.stringify(this.purchaseProcess.pr));
      this.router.navigateByUrl('/pim/procurement/purchase-requisition/'+this.purchaseProcess.pr.purchaseRequisitionId);
    }
    if (this.purchaseProcess.pr && this.purchaseProcess.pr.purchaseRequisitionStatus === 'Approved') {
      sessionStorage.setItem("materials", JSON.stringify(this.purchaseProcess.materials));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      sessionStorage.setItem("purchase requisition", JSON.stringify(this.purchaseProcess.pr));
      this.router.navigateByUrl('/pim/procurement/rfq/create');
    }
    if (this.purchaseProcess.rfq) {
      sessionStorage.setItem("materials", JSON.stringify(this.purchaseProcess.materials));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      sessionStorage.setItem("purchase requisition", JSON.stringify(this.purchaseProcess.pr));
      sessionStorage.setItem("request for quotation", JSON.stringify(this.purchaseProcess.rfq));
      this.router.navigateByUrl('/pim/procurement/rfq/'+this.purchaseProcess.rfq.rfqId);
    }
    if (this.purchaseProcess.quotations) {
      sessionStorage.setItem("materials", JSON.stringify(this.purchaseProcess.materials));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      sessionStorage.setItem("purchase requisition", JSON.stringify(this.purchaseProcess.pr));
      sessionStorage.setItem("request for quotation", JSON.stringify(this.purchaseProcess.rfq));
      sessionStorage.setItem("quotations", JSON.stringify(this.purchaseProcess.quotations));
      this.router.navigateByUrl('/pim/procurement/decide-vendor/rfq/'+this.purchaseProcess.rfq.rfqId);
    }
    if (this.purchaseProcess.supplier) {
      sessionStorage.setItem("materials", JSON.stringify(this.purchaseProcess.materials));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      sessionStorage.setItem("purchase requisition", JSON.stringify(this.purchaseProcess.pr));
      sessionStorage.setItem("request for quotation", JSON.stringify(this.purchaseProcess.rfq));
      sessionStorage.setItem("quotations", JSON.stringify(this.purchaseProcess.quotations));
      sessionStorage.setItem("selectedSupplier", JSON.stringify(this.purchaseProcess.supplier));
      this.router.navigateByUrl('/pim/procurement/purchase-order/create');
    }
    if (this.purchaseProcess.po && this.purchaseProcess.po.poReceiptState === false) {
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      this.router.navigateByUrl('/pim/procurement/purchase-orders');
    }
    if (this.purchaseProcess.po && this.purchaseProcess.po.poReceiptState === true) {
      sessionStorage.setItem("purchaseProcess", JSON.stringify(this.purchaseProcess));
      this.router.navigateByUrl('/pim/received-materials');
    }
  }
  
  endProcessPR(): void {
    sessionStorage.removeItem("materials");
    sessionStorage.removeItem("purchaseProcess");
    sessionStorage.removeItem("purchase requisition");
    sessionStorage.removeItem("request for quotation");
    sessionStorage.removeItem("quotations");
    sessionStorage.removeItem("selectedSupplier");
    this.ppService.deletePP(this.purchaseProcess.purchaseProcessId)
      .subscribe(() => {
        this.prService.deletePR(this.purchaseProcess.pr.purchaseRequisitionId)
          .subscribe(() => {
            this.purchaseProcess.materials.splice(this.purchaseProcess.materials.indexOf(this.purchaseProcess[0]), 1);
            this.showToast("Purchase Process Ended!" , this.positions.TOP_RIGHT, 'danger');
            this.showToast("Redirecting to materials list!" , this.positions.TOP_RIGHT, 'info');
            this.router.navigateByUrl('/pim/procurement/materials').then(() => {
              window.location.reload();
            });
          }, errorPR => {
            this.showToast(errorPR.error , this.positions.TOP_RIGHT, 'danger');
          })
      }, errorPP => {
        this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

  endProcessDone(): void {
    sessionStorage.removeItem("materials");
    sessionStorage.removeItem("purchaseProcess");
    sessionStorage.removeItem("purchase requisition");
    sessionStorage.removeItem("request for quotation");
    sessionStorage.removeItem("quotations");
    sessionStorage.removeItem("selectedSupplier");
    this.ppService.deletePP(this.purchaseProcess.purchaseProcessId)
      .subscribe(() => {
            this.purchaseProcess.materials.splice(this.purchaseProcess.materials.indexOf(this.purchaseProcess[0]), 1);
            this.showToast("Purchase Process Ended Successfully!" , this.positions.TOP_RIGHT, 'success');
            this.showToast("Redirecting to materials in stock list!" , this.positions.TOP_RIGHT, 'info');
            this.router.navigateByUrl('/pim/stock/in-stock').then(() => {
              window.location.reload();
            });
      }, errorPP => {
        this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

  ngOnInit(): void {
    this.ppService.getOnePP(this.router.url.replace('/pim/procurement/purchase-process/', ''))
      .subscribe(purchaseProcess => {
        if (!purchaseProcess) {
          this.showToast('Oops! Redirecting to materials list!', 
            this.positions.TOP_RIGHT, 'danger');
          this.router.navigateByUrl('/pim/procurement/materials')
            .then(() => {
              window.location.reload();
            });
        }
        this.purchaseProcess = purchaseProcess;
        for (let m = 0; m < this.purchaseProcess.materials.length; m++) {
          if (this.purchaseProcess.materials[m].stockState === true) {
            this.stocked = this.stocked + 1;
            this.hiddenContinueProcessBtn = true;
          }
        }
        if (this.purchaseProcess.pr && this.purchaseProcess.pr.purchaseRequisitionStatus === 'Approved' 
          && this.purchaseProcess.step === 2) {
          this.showToast('Purchase Requisition is APPROVED by the Finance Team.', 
            this.positions.TOP_RIGHT, 'success');
        }
        if (this.purchaseProcess.pr && this.purchaseProcess.pr.purchaseRequisitionStatus === 'Rejected' 
          && this.purchaseProcess.step === 2) {
          this.showToast('Purchase Requisition is REJECTED by the Finance Team.', 
            this.positions.TOP_RIGHT, 'danger');
          this.hiddenEndProcessBtn = false;
          this.hiddenContinueProcessBtn = true;
        }
        if (this.purchaseProcess.po && this.purchaseProcess.po.poStatus === 'Approved' 
          && this.purchaseProcess.po.poReceiptState === false) {
          this.showToast('Purchase Order is Approved by the Finance Team.', 
            this.positions.TOP_RIGHT, 'success');
        }
      }, errorPP => {
        this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

}
