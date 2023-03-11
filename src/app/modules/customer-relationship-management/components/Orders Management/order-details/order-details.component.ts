import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../../services/orders/order.service';
import {Order} from '../../../models/Order';
import {ActivatedRoute} from '@angular/router';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  idUri: string = '';
  order: Order = new Order();
     @Output() dataChanged = new EventEmitter<Order>();
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  constructor(private orderService: OrderService,     
              private toaster: NbToastrService,
              private activatedroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.orderService.getOrderById(this.idUri).subscribe(data => {
      this.order = data;

      error => console.log(error);
    });
  }
  
   validateOrder( id: string,order: Order) {
   
    this.orderService.validateOrder(id,order).subscribe({
      next: (result: any) => {
        this.order = result;
        this.showToast('success', 'Add ! ', 'Order Confirmed Successfully!!');

      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
         this.dataChanged.emit(this.order);
         
      },
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
