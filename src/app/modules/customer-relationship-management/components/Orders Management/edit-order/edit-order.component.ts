import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Order} from '../../../models/Order';
import {Deals} from '../../../models/Deals';
import {Material} from '../../../../product-inventory-management/models/material/material';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {OrderService} from '../../../services/orders/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DealsService} from '../../../services/deals/deals.service';
import {TokenStorageService} from '../../../../auth/service/token/token.service';
import Currencies from '../add-order/currencies.json';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  idUri: string="";
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
                private activatedroute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) { //initialisation for visit group form with form controls
    this.orderGroup = new FormGroup({
      orderName: new FormControl(''),
      orderDate: new FormControl(''),
    
      otherInfosOrder: new FormControl(''),
     
      
        quantity: new FormControl(''),
        orderPaid: new FormControl(''),
        orderType: new FormControl(''),
        purchaseOrder: new FormControl(''),
        particular: new FormControl(''),
        deals: new FormControl(''),
        product: new FormControl(''),
        currency: new FormControl(''),

     

              paymentMethod: new FormControl(''),
              paymentStatus: new FormControl(''),
              subTotal: new FormControl(''),
              notes: new FormControl(''),
              invoice: new FormControl(''),

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
    
      this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.orderService.getOrderById(this.idUri).subscribe(data => {
      this.order = data;

      error => console.log(error);
    });

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
  

  //Add order function
  updateOrderFunction() {
    this.order.deals = <Deals>{id: this.selectedDeal};
    this.order.user = this.user.email;
    
    this.orderService.updateOrder(this.idUri, this.order).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Order updated Successfully!!');
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
