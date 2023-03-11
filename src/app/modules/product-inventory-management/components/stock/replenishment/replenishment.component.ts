import {Component, OnInit, TemplateRef} from '@angular/core';
import {ReplenishmentProcessService} from "../../../services/replenishmentProcess/replenishment-process.service";
import {ReplenishmentProcess} from "../../../models/replenishmentProcess/replenishment-process";
import {Router} from "@angular/router";
import {PurchaseRequisitionService} from "../../../services/purchaseRequisition/purchase-requisition.service";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from 'moment';

@Component({
  selector: 'ngx-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.scss']
})
export class ReplenishmentComponent implements OnInit {
  
  rps: ReplenishmentProcess[] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  userConnected;
  rp;

  constructor(private rpService: ReplenishmentProcessService, private toastrService: NbToastrService,
              private router: Router, private prService: PurchaseRequisitionService,
              private dialogService: NbDialogService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  continuePurchase(rp, material): void {
    sessionStorage.setItem("replenishmentProcess", JSON.stringify(rp));
    this.router.navigateByUrl("/pim/replenishment/"+material.materialId);
  }

  endProcessRP(rp): void {
    this.rpService.deleteRP(rp.rpId).subscribe(() => {
      this.prService.deletePR(rp.pr.purchaseRequisitionId).subscribe(() => {
        if (sessionStorage.getItem("replenishmentProcess")) {
          sessionStorage.removeItem("replenishmentProcess");
        }
        this.showToast("Replenishment Ended!" , this.positions.TOP_RIGHT, 'danger');
        this.showToast("Redirecting to materials in stock!" , this.positions.TOP_RIGHT, 'info');
        this.router.navigateByUrl('/pim/stock/in-stock');
      }, errorPR => {
        this.showToast(errorPR.error , this.positions.TOP_RIGHT, 'danger');
      })
    }, errorRP => {
      this.showToast(errorRP.error , this.positions.TOP_RIGHT, 'danger');
    })
  }
  
  abandonRP(rp, ref): void {
    this.rpService.deleteRP(rp.rpId).subscribe(() => {
      this.prService.deletePR(rp.pr.purchaseRequisitionId).subscribe(() => {
        if (sessionStorage.getItem("replenishmentProcess")) {
          sessionStorage.removeItem("replenishmentProcess");
        }
        this.showToast("Replenishment Abandoned!" , this.positions.TOP_RIGHT, 'danger');
        ref.close();
        this.rps.splice(this.rps.indexOf(rp), 1);
      }, errorPR => {
        this.showToast(errorPR.error , this.positions.TOP_RIGHT, 'danger');
      })
    }, errorRP => {
      this.showToast(errorRP.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.rpService.getAllRPs().subscribe(rps => {
      for (let r = 0; r < rps.length; r++) {
        if (rps[r].pr?.addedBy?.company === this.userConnected.company) {
          this.rps.push(rps[r]);
        }
        this.prService.getOnePR(rps[r].pr?.purchaseRequisitionId).subscribe(pr => {
          if (pr.purchaseRequisitionStatus === 'Approved' || pr.purchaseRequisitionStatus === 'Rejected') {
            this.rp = {
              pr: pr
            };
            this.rpService.editPRState(this.rp, rps[r].rpId).subscribe(rpEdited => {
              this.rps.splice(this.rps.indexOf(rps[r]), 1);
              this.rps.push(rpEdited);
            })
          }
        })
      }
    })
  }

}
