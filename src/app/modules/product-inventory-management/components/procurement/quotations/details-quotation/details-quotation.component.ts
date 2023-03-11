import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {Quotation} from "../../../../models/quotation/quotation";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {QuotationService} from "../../../../services/quotation/quotation.service";

@Component({
  selector: 'ngx-details-quotation',
  templateUrl: './details-quotation.component.html',
  styleUrls: ['./details-quotation.component.scss']
})
export class DetailsQuotationComponent implements OnInit {
  
  existedQuotation: Quotation = new Quotation();
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private quotationService: QuotationService, private location: Location,
              private router: Router, private toastrService: NbToastrService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.quotationService.getOneQuotation(this.router.url
      .replace('/pim/procurement/quotation/details/', '')).subscribe((quotation) => {
      this.existedQuotation = quotation;
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
    if (this.existedQuotation.quotationState === false) {
      this.location.back();
      this.showToast("Oops! Redirecting Backwards!" , this.positions.TOP_RIGHT, 'info');
    }
  }

}
