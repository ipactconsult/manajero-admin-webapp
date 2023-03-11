import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {Material} from "../../../../models/material/material";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-show-pr',
  templateUrl: './show-pr.component.html',
  styleUrls: ['./show-pr.component.scss']
})
export class ShowPrComponent implements OnInit {

  existedPR: PurchaseRequisition = new PurchaseRequisition();
  PRCreationDate;
  completedState1 = true;
  materials: Material[] = [];
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;
  purchaseProcess;
  existedPP;
  purchaseProcessEdit;
  progressStatus = "danger";

  constructor(private prService: PurchaseRequisitionService, private location: Location,
              private toastrService: NbToastrService, private router: Router,
              private dialogService: NbDialogService, private ppService: PurchaseProcessService) {
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      sessionStorage.removeItem('purchase requisition');
    }, error => {
      return error.error;
    })
  }
  
  goToRFQ(): void {
    this.purchaseProcess = {
      pr: this.existedPR
    };
    this.ppService.editPP_PR(this.existedPP.purchaseProcessId, this.purchaseProcess).subscribe(purchaseProcess => {
      this.router.navigateByUrl('/pim/procurement/rfq/create');
      sessionStorage.setItem("purchase requisition", JSON.stringify(this.existedPR));
      sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
    }, error => {
      return error.error;
    })
  }
  
  goToPreviousRoute(): void {
    this.router.navigateByUrl("/pim/procurement/purchase-requisition/create");
     this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      sessionStorage.removeItem('purchase requisition');
    }, error => {
      return error.error;
    })
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
        sessionStorage.removeItem('materials');
        sessionStorage.removeItem('purchase requisition');
        sessionStorage.removeItem('purchaseProcess');
        this.showToast("Purchase Cancelled" , this.positions.TOP_RIGHT, 'danger');
        this.router.navigateByUrl('/pim/procurement/materials');
      }, errorPP => {
        return errorPP.error;
      })
    }, error => {
      return error.error;
    })
  }
  
  cancelWithoutToast() {
    this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      sessionStorage.removeItem('materials');
      sessionStorage.removeItem('purchase requisition');
      this.router.navigateByUrl('/pim/procurement/materials');
    }, error => {
      return error.error;
    })
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.prService.getOnePR(this.router.url
      .replace('/pim/procurement/purchase-requisition/', '')).subscribe((pr) => {
        this.existedPR = pr;
        this.materials = this.existedPR.material;
        this.PRCreationDate = moment(this.existedPR.purchaseRequisitionCreationDate).format('DD MMM YYYY');
        if (this.existedPR.purchaseRequisitionStatus === 'Pending') {
          this.showToast('Purchase Requisition is REVIEWED by the Finance Team.' , this.positions.TOP_RIGHT, 'info');
        }
        if (this.existedPR.purchaseRequisitionStatus === 'Rejected') {
          this.purchaseProcessEdit = {
            pr: this.existedPR
          }
          this.ppService.editPP_PR(this.existedPP.purchaseProcessId, this.purchaseProcessEdit)
            .subscribe(() => {
            this.showToast('Purchase Requisition is REJECTED by the Finance Team.' , this.positions.TOP_RIGHT, 'danger');
          }, errorPP => {
              this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
            })
        }
        if (this.existedPR.purchaseRequisitionStatus === 'Approved') {
          this.showToast('Purchase Requisition is APPROVED by the Finance Team.' , this.positions.TOP_RIGHT, 'success');
        }
    });
  }

}
