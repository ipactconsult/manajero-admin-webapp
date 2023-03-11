import { Component, OnInit } from '@angular/core';
import {PurchaseOrder} from "../../../../models/purchaseOrder/purchase-order";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {PurchaseOrderService} from "../../../../services/purchaseOrder/purchase-order.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {MaterialService} from "../../../../services/material/material.service";
import {Material} from "../../../../models/material/material";

@Component({
  selector: 'ngx-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.scss']
})
export class GoodsReceiptComponent implements OnInit {

  existedPO: PurchaseOrder = new PurchaseOrder();
  positions = NbGlobalPhysicalPosition;
  completedState6 = true;
  completedState5 = true;
  completedState4 = true;
  completedState3 = true;
  completedState2 = true;
  completedState1 = true;
  moment: any = moment;
  poCreationDate;
  currentDate: Date = new Date();
  differenceDates;
  deliveryDateMat;
  deliveryDM;
  receiptOkayMat = 0;

  constructor(private poService: PurchaseOrderService, private toastrService: NbToastrService,
              private materialService: MaterialService, private location: Location, 
              private router: Router) { }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  goToMaterialsList(): void {
    this.router.navigateByUrl('/pim/procurement/material/list');
  }
  
  confirmReceipt(material): void {
    this.deliveryDateMat = moment(material.materialDeliveryDate).format('DD MMM YYYY');
    this.deliveryDM = new Date(this.deliveryDateMat);
    this.differenceDates = Math.floor((Date.UTC(this.deliveryDM.getFullYear(), this.deliveryDM.getMonth(), 
      this.deliveryDM.getDate()) - Date.UTC(this.currentDate.getFullYear(), this.currentDate.getMonth(), 
      this.currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
    if (this.differenceDates > 0) {
          this.showToast(`You need to wait at least until the delivery date to confirm receipt of this material.`,
            this.positions.TOP_RIGHT, 'danger');
    } else {
      this.showToast(`Material Receipt Confirmed.`,
            this.positions.TOP_RIGHT, 'info');
      this.existedPO.materials.splice(material, 1);
      this.receiptOkayMat = this.receiptOkayMat + 1;
      /*material.quantityStock = material.materialQuantity;
      material.materialQuantity = null;
      material.supplier = this.existedPO.selectedSupplier;
      material.stockAlert = 5;*/
      /*this.materialService.updateMaterial(material, material.materialId).subscribe(() => {
        
      }, error => {
        this.showToast(`${error.error}`,
            this.positions.TOP_RIGHT, 'danger');
      })*/
    }
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.poService.getOnePO(this.router.url.replace('/pim/procurement/goods-receipt/', ''))
      .subscribe(purchaseOrder => {
        this.existedPO = purchaseOrder;
        this.poCreationDate = moment(this.existedPO.poCreationDate).format('DD MMM YYYY');
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

}
