import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Order} from '../../../models/Order';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {OrderService} from '../../../services/orders/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DealsService} from '../../../services/deals/deals.service';
import {TokenStorageService} from '../../../../auth/service/token/token.service';
import Currencies from '../../Orders Management/add-order/currencies.json';
import {HttpErrorResponse} from '@angular/common/http';
import {DeliveryService} from '../../../services/deliveries/delivery.service';
import {Delivery} from '../../../models/Delivery';

@Component({
  selector: 'ngx-deliver-order',
  templateUrl: './deliver-order.component.html',
  styleUrls: ['./deliver-order.component.scss']
})
export class DeliverOrderComponent implements OnInit {

  //Delivery instanciation
  delivery:  Delivery = new Delivery();
  //declare group for order form
  extra_form: FormGroup = new FormGroup({});
  shipForm: FormGroup = new FormGroup({});
  order: Order = new Order();
  deliveryGroup: FormGroup = new FormGroup({});
  selectedStatus: any;
  selectedPaymentMethod: any;
  selectedCurrency: any;
  //initialization of data customers 
  dataOrders: Order [] = [];

  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  user: any;
  currencies;
  idUri: string;

  constructor(private orderService: OrderService,
              private deliveryService: DeliveryService,
              private toaster: NbToastrService,
              private router: Router,
                 private activatedroute: ActivatedRoute,
              private ds: DealsService,
              private tokenStorageService: TokenStorageService) { //initialisation for visit group form with form controls
    this.deliveryGroup = new FormGroup({
      billingAddress: new FormControl(''),
      phone: new FormControl(''),
      shipDate: new FormControl(''),
      notesShipping: new FormControl(''),


      extra_form: new FormGroup({
        shipMode: new FormControl(''),
        shipInfos: new FormControl(''),
        shippingPrice: new FormControl(''),
        currency  : new FormControl(''),

      }),

    
    });
  }
  
//select paymenth method 
  onMenuItemSelectedPaymentMethod(selectedOne) {
    this.selectedPaymentMethod = selectedOne;
  }  
//select paymenth method 
  onMenuItemSelectedCurrency(selectedOne) {
    this.selectedCurrency = selectedOne;
  }

  get currency() {
    return this.deliveryGroup.get('currency');
  }
  get shippingPrice() {
    return this.deliveryGroup.get('shippingPrice');
  }
  get shipInfos() {
    return this.deliveryGroup.get('shipInfos');
  }
  get shipMode() {
    return this.deliveryGroup.get('shipMode');
  }
  get notesShipping() {
    return this.deliveryGroup.get('notesShipping');
  }
  get shipDate() {
    return this.deliveryGroup.get('shipDate');
  }
  get phone() {
    return this.deliveryGroup.get('phone');
  }
 get billingAddress() {
    return this.deliveryGroup.get('billingAddress');
  }

 
  //extra form submit
  onOrderFormSubmit() {
    this.deliveryGroup.markAsDirty();
  }

  

  ngOnInit(): void {
    
    this.currencies = Currencies;
    //products data
       this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.orderService.getOrderById(this.idUri).subscribe(data => {
      this.order = data;

      error => console.log(error);
    });

    this.user = this.tokenStorageService.getUser();
    
  }

  //Add order function
  addDeliveryFunction() {

    this.deliveryService.addDelivery(this.delivery, this.idUri).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Order will be delivered Successfully!!');
      this.router.navigate(['/crm/tracking-order/', this.idUri]);
        
      },
      (err: HttpErrorResponse) => {
        this.showToast('danger', 'Add ! ', err.message);

      });
  }


//show toast
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toaster.show(
      body,
      `${titleContent}`,
      config);
  }
}