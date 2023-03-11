import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../../services/orders/order.service';
import {Order} from '../../../models/Order';
import {ActivatedRoute} from '@angular/router';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss']
})
export class TrackingOrderComponent implements OnInit {
  idUri: string = '';
  order: Order = new Order();
  value: number = 0;
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
       @Output() dataChanged = new EventEmitter<Order>();
  constructor(private orderService: OrderService,       
              private toaster: NbToastrService,
              private activatedroute: ActivatedRoute) {
  }

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100);
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.orderService.getOrderById(this.idUri).subscribe(data => {
      this.order = data;
      this.getStatusValue();
      error => console.log(error);
    });
  }
 validateOrder( id: string,order: Order) {
   
    this.orderService.validateOrder(id,order).subscribe({
      next: (result: any) => {
        
        this.showToast('success', 'Add ! ', 'Order Validated Successfully!!');
   this.order = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
         this.dataChanged.emit();
         
      },
    });
  }
   inProgressOrder( id: string,order: Order) {
   
    this.orderService.progressOrder(id,order).subscribe({
      next: (result: any) => {
         this.order = result;
        this.showToast('success', 'Add ! ', 'Order In Progress Successfully!!');
 
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
         this.dataChanged.emit();
         
      },
    });
  }
   saleOrder( id: string,order: Order) {
   
    this.orderService.saleOrder(id,order).subscribe({
      next: (result: any) => {
        
        this.showToast('success', 'Add ! ', 'Order Passed to sale Successfully!!');
    this.order = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
         this.dataChanged.emit();
         
      },
    });
  }
  getStatusValue() {
    if (this.order.status === 'Pending') {
      return this.value = 10;
    } else if (this.order.status === 'InProgress') {
      return this.value = 25;
    } else if (this.order.status === 'Done') {
      return this.value = 40;
    } else if (this.order.status === 'SALE') {
      return this.value = 60;
    }
    else if (this.order.status === 'DISPATCHED') {
      return this.value =84;
    }
    else if (this.order.status === 'DELIVERED') {
      return this.value = 100;
    }
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
