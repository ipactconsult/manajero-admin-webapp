import { Component, OnInit } from '@angular/core';
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-details-pr',
  templateUrl: './details-pr.component.html',
  styleUrls: ['./details-pr.component.scss']
})
export class DetailsPrComponent implements OnInit {
  
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private prService: PurchaseRequisitionService, private location: Location, 
              private router: Router, private toastrService: NbToastrService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.prService.getOnePR(this.router.url
      .replace('/pim/procurement/purchase-requisition/details/', '')).subscribe((pr) => {
      this.existedPR = pr;
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
    if (this.existedPR.purchaseRequisitionState === false) {
      this.location.back();
      this.showToast("Oops! Redirecting Backwards!" , this.positions.TOP_RIGHT, 'info');
    }
  }

}
