import { Component, OnInit } from '@angular/core';
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";

@Component({
  selector: 'ngx-details-rfq',
  templateUrl: './details-rfq.component.html',
  styleUrls: ['./details-rfq.component.scss']
})
export class DetailsRfqComponent implements OnInit {
  
  existedRFQ: RequestForQuotation = new RequestForQuotation();
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private rfqService: RequestForQuotationService, private location: Location,
              private router: Router, private toastrService: NbToastrService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.rfqService.getOneRFQ(this.router.url
      .replace('/pim/procurement/rfq/details/', '')).subscribe((rfq) => {
      this.existedRFQ = rfq;
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
    if (this.existedRFQ.rfqState === false) {
      this.location.back();
      this.showToast("Oops! Redirecting Backwards!" , this.positions.TOP_RIGHT, 'info');
    }
  }

}
