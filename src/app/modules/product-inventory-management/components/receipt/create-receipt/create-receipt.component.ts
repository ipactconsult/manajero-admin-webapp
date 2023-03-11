import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import moment from 'moment';
import {PurchaseOrder} from "../../../models/purchaseOrder/purchase-order";
import {ReceiptService} from "../../../services/receipt/receipt.service";
import {PurchaseOrderService} from "../../../services/purchaseOrder/purchase-order.service";

@Component({
  selector: 'ngx-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  selectedPurchaseOrder = null;
  receiptForm: FormGroup;
  newReceipt;
  purchaseOrders: PurchaseOrder[] = [];
  moment: any = moment;
  dateToday;
  disabledSelect: boolean = false;
  currentRate = 0;
  ratingValue;
  userConnected;

  constructor(private receiptService: ReceiptService, private poService: PurchaseOrderService,
              private dialogService: NbDialogService, private toastrService: NbToastrService, 
              private formBuilder: FormBuilder, private router: Router, private location: Location) {
    this.receiptForm = formBuilder.group({
      notes: [''],
      purchaseOrder: ['', Validators.required]
    });
  }
  
  getRating(currentRate): void {
    this.ratingValue = currentRate;
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  selectPurchaseOrder(selectedPurchaseOrder): void {
    this.selectedPurchaseOrder = selectedPurchaseOrder;
    this.disabledSelect = true;
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "R"+result;
  }
  
  createNewReceipt(): void {
    this.newReceipt = {
      notes: this.receiptForm.value.notes,
      purchaseOrder: this.receiptForm.value.purchaseOrder,
      receiptRef: CreateReceiptComponent.getRandomNumber(100000, 999999)
    };
    this.receiptService.addNewReceipt(this.newReceipt, this.ratingValue).subscribe(
      () => {
        this.poService.changeReceiptSupplier(this.newReceipt.purchaseOrder.poId).subscribe(() => {
          this.receiptForm.reset();
          this.showToast('Receipt Created Successfully' , this.positions.TOP_RIGHT, 'success');
          this.router.navigateByUrl('/pim/receipts');
        })
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      }
    )
  }
  
  cancelSelection() {
    this.selectedPurchaseOrder = null;
    this.disabledSelect = false;
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.poService.getAllPOs().subscribe(purchaseOrders => {
      for (let p = 0; p < purchaseOrders.length; p++) {
        if (purchaseOrders[p].receiptSupplier === false 
          && purchaseOrders[p].poStatus === 'Approved'
          && purchaseOrders[p].poReceiptState === true
          && purchaseOrders[p].addedBy?.company === this.userConnected.company
          && purchaseOrders[p].addedBy?.email === this.userConnected.email) {
          this.purchaseOrders.push(purchaseOrders[p]);
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
    this.dateToday = new Date();
  }

}
