import { Component, OnInit } from '@angular/core';
import {PurchaseProcessService} from "../../../services/purchaseProcess/purchase-process.service";
import {PurchaseProcess} from "../../../models/purchaseProcess/purchase-process";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {PurchaseRequisitionService} from "../../../services/purchaseRequisition/purchase-requisition.service";
import {PurchaseOrderService} from "../../../services/purchaseOrder/purchase-order.service";

@Component({
  selector: 'ngx-all-purchases',
  templateUrl: './all-purchases.component.html',
  styleUrls: ['./all-purchases.component.scss']
})
export class AllPurchasesComponent implements OnInit {
  
  purchaseProcesses: PurchaseProcess[] = [];
  positions = NbGlobalPhysicalPosition;
  purchaseProcess: PurchaseProcess = new PurchaseProcess();
  search: string = '';
  current: number = 1;
  pageSize: number = 6;
  userConnected;
  pp;
  po;
  ppToEditPo;

  constructor(private ppService: PurchaseProcessService, private toastrService: NbToastrService,
              private prService: PurchaseRequisitionService, private router: Router,
              private poService: PurchaseOrderService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  continuePurchase(purchaseProcess): void {
    this.purchaseProcess = purchaseProcess;
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
            this.router.navigateByUrl('/pim/procurement/materials');
          }, errorPR => {
            this.showToast(errorPR.error , this.positions.TOP_RIGHT, 'danger');
          })
      }, errorPP => {
        this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.ppService.getAllPPs().subscribe(pps => {
      for (let p = 0; p < pps.length; p++) {
        if (pps[p].addedBy?.company === this.userConnected.company) {
          this.purchaseProcesses.push(pps[p]);
        }
        for (let pp = 0; pp < this.purchaseProcesses.length; pp++) {
          if (this.purchaseProcesses[pp].pr?.purchaseRequisitionStatus === 'Pending') {
            this.prService.getOnePR(this.purchaseProcesses[pp].pr?.purchaseRequisitionId).subscribe(pr => {
              if (pr.purchaseRequisitionStatus === 'Approved' || pr.purchaseRequisitionStatus === 'Rejected') {
                this.ppService.editPP_PR(this.purchaseProcesses[pp].purchaseProcessId, this.purchaseProcesses[pp]).subscribe(ppEdited => {
                  this.purchaseProcesses[pp].pr = pr;
                })
              }
            }); 
          }
          if (this.purchaseProcesses[pp].po?.poStatus === 'Pending') {
            this.poService.getOnePO(this.purchaseProcesses[pp].po?.poId).subscribe(po => {
              if (po !== null && (po.poStatus === 'Approved' || po.poStatus === 'Rejected')) {
                this.ppService.sixthEditPP(this.purchaseProcesses[pp].purchaseProcessId, this.purchaseProcesses[pp]).subscribe(ppEditedPO => {
                  this.purchaseProcesses[pp].po = po;
                })
              }
            }) 
          }
        }
      }
    }, errorPP => {
      this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
    });
  }

}
