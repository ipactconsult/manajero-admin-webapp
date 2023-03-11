import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../services/orders/order.service';
import {Order} from '../../../models/Order';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from '../../../../auth/service/token/token.service';
import {DealsService} from '../../../services/deals/deals.service';
import {Deals} from '../../../models/Deals';
import {Material} from '../../../../product-inventory-management/models/material/material';
import Currencies from "./currencies.json"
@Component({
  selector: 'ngx-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  //declare group for order form
  extra_form: FormGroup = new FormGroup({});
  rentalForm: FormGroup = new FormGroup({});
  contractInfo: FormGroup = new FormGroup({});
  order: Order = new Order();
  orderGroup: FormGroup = new FormGroup({});
  selectedStatus: any;
  selectedPaymentMethod: any;
  //initialization of data customers 
  dataDeals: Deals [] = [];
  //initialization of data products 
  dataProducts: Material [] = [];
  //selected deal variable for menu option
  selectedDeal;
  //selected product variable for menu option
  selectedProduct;
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  user: any;
  currencies;
  options = [
    { value: 'Particular', label: 'Particular' },
    { value: 'Company', label: 'Company' },
    
  ];

  constructor(private orderService: OrderService,
              private toaster: NbToastrService,
              private router: Router,
              private ds: DealsService,
              private tokenStorageService: TokenStorageService) { //initialisation for visit group form with form controls
    this.orderGroup = new FormGroup({
      orderName: new FormControl(''),
      orderDate: new FormControl(''),
    
      otherInfosOrder: new FormControl(''),
     
      
      extra_form: new FormGroup({
        quantity: new FormControl(''),
        orderPaid: new FormControl(''),
        orderType: new FormControl(''),
        purchaseOrder: new FormControl(''),
        particular: new FormControl(''),
        deals: new FormControl(''),
        product: new FormControl(''),
        currency: new FormControl(''),
        
      }),
     
       rentalForm: new FormGroup({
              paymentMethod: new FormControl(''),
              paymentStatus: new FormControl(''),
              subTotal: new FormControl(''),
              notes: new FormControl(''),
              invoice: new FormControl(''),
    }),
    });
  }

  get invoice() {
    return this.orderGroup.get('invoice');
  }
  get notes() {
    return this.orderGroup.get('notes');
  }
  get subTotal() {
    return this.orderGroup.get('subTotal');
  }
  get paymentStatus() {
    return this.orderGroup.get('paymentStatus');
  }
  get paymentMethod() {
    return this.orderGroup.get('paymentMethod');
  }
  get currency() {
    return this.orderGroup.get('currency');
  }
  get orderPaid() {
    return this.orderGroup.get('orderPaid');
  }
  get particular() {
    return this.orderGroup.get('particular');
  }
  get purchaseOrder() {
    return this.orderGroup.get('purchaseOrder');
  }
  get quantity() {
    return this.orderGroup.get('quantity');
  }
  get orderType() {
    return this.orderGroup.get('orderType');
  }

  get otherInfosOrder() {
    return this.orderGroup.get('otherInfosOrder');
  }

  get deals() {
    return this.orderGroup.get('deals');
  }

  get orderDate() {
    return this.orderGroup.get('orderDate');
  }

 
  get orderName() {
    return this.orderGroup.get('orderName');
  }

  get product() {
    return this.orderGroup.get('product');
  }

  ngOnInit(): void {
    //deals data
    this.ds.getDealNotArchived().subscribe(
      (data: Deals[]) => {
        this.dataDeals = data;

      }
    );

    this.currencies=Currencies;
    //products data
    this.orderService.findAllProducts().subscribe(
      (data: Material[]) => {
        this.dataProducts = data;

      }
    );
    this.user = this.tokenStorageService.getUser();


  }

//select deal 
  onMenuItemSelectedDeal(selectedOne) {
    this.selectedDeal = selectedOne;
  }

//select product 
  onMenuItemSelectedProduct(selectedOne) {
    this.selectedProduct = selectedOne;
  }

  
//select paymenth method 
  onMenuItemSelectedPaymentMethod(selectedOne) {
    this.selectedPaymentMethod = selectedOne;
  }

  //extra form submit
  onOrderFormSubmit() {
    this.orderGroup.markAsDirty();
  }

  

  //Add order function
  addOrderFunction() {
    this.order.deals = <Deals>{id: this.selectedDeal};
    this.order.user = this.user.email;
    
    this.orderService.addOrder(this.order, this.selectedProduct).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Order Added Successfully!!');
        this.router.navigateByUrl('/crm/orders');

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
