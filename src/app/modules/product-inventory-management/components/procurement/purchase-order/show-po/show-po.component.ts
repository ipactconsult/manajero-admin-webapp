import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PurchaseOrderService} from "../../../../services/purchaseOrder/purchase-order.service";
import {PurchaseOrder} from "../../../../models/purchaseOrder/purchase-order";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from "moment";
import {Location} from "@angular/common";

@Component({
  selector: 'ngx-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.scss']
})
export class ShowPoComponent implements OnInit {
  
  existedPO: PurchaseOrder = new PurchaseOrder();
  positions = NbGlobalPhysicalPosition;
  completedState5 = true;
  completedState4 = true;
  completedState3 = true;
  completedState2 = true;
  completedState1 = true;
  moment: any = moment;
  poCreationDate;

  constructor(private poService: PurchaseOrderService, private toastrService: NbToastrService,
              private location: Location, private router: Router) { }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  goToGoodsReceipt(): void {
    this.router.navigateByUrl('/pim/procurement/goods-receipt/'+this.existedPO.poId);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.poService.getOnePO(this.router.url.replace('/pim/procurement/purchase-order/', ''))
      .subscribe(po => {
        this.existedPO = po;
        console.log(this.existedPO);
        this.poCreationDate = moment(this.existedPO.poCreationDate).format('DD MMM YYYY');
        if (this.existedPO.poStatus === 'Pending') {
          this.showToast('Purchase Requisition is REVIEWED by the Accounting Team.' , 
            this.positions.TOP_RIGHT, 'info');
        }
        if (this.existedPO.poStatus === 'Approved') {
          this.showToast('Purchase Requisition is APPROVED by the Accounting Team.' , 
            this.positions.TOP_RIGHT, 'success');
        }
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

}
