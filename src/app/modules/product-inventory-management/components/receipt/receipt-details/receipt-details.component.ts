import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from 'moment';
import {Receipt} from "../../../models/receipt/receipt";
import {ReceiptService} from "../../../services/receipt/receipt.service";

@Component({
  selector: 'ngx-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.scss']
})
export class ReceiptDetailsComponent implements OnInit {

  existedReceipt: Receipt = new Receipt();
  receiptCreationDate;
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private receiptService: ReceiptService, private toastrService: NbToastrService,
              private dialogService: NbDialogService, private location: Location, 
              private router: Router) {
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.receiptService.getOneReceipt(this.router.url
      .replace('/pim/receipt/', '')).subscribe((receipt) => {
        this.existedReceipt = receipt;
        this.receiptCreationDate = moment(this.existedReceipt.receiptCreationDate)
          .format('DD MMM YYYY')
    })
  }

}
