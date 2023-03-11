import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from 'moment';
import {PurchaseReturn} from "../../../models/purchaseReturn/purchase-return";
import {PurchaseReturnService} from "../../../services/purchaseReturn/purchase-return.service";

@Component({
  selector: 'ngx-detail-purchase-return',
  templateUrl: './detail-purchase-return.component.html',
  styleUrls: ['./detail-purchase-return.component.scss']
})
export class DetailPurchaseReturnComponent implements OnInit {

  existedPurchaseReturn: PurchaseReturn = new PurchaseReturn();
  purchaseReturnCreationDate;
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;
  warehouses: Warehouse[] = [];
  material;
  sm;

  constructor(private purchaseReturnService: PurchaseReturnService, private toastrService: NbToastrService,
              private dialogService: NbDialogService, private location: Location, 
              private router: Router) {
  }
  
  open2PurchaseReturn(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.purchaseReturnService.getOnePurchaseReturn(this.router.url
      .replace('/pim/purchase-return/details/', '')).subscribe((purchaseReturn) => {
        this.existedPurchaseReturn = purchaseReturn;
        this.purchaseReturnCreationDate = moment(this.existedPurchaseReturn.purchaseReturnDate)
          .format('DD MMM YYYY hh:mm A')
    })
  }

}
