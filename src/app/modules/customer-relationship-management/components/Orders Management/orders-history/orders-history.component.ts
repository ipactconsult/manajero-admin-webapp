import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Order} from '../../../models/Order';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {OrderService} from '../../../services/orders/order.service';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';

@Component({
  selector: 'ngx-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
 current: number = 1;
  pageSize: number = 9;
  search;
  dataOrders: Order[] = [];

  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  @Output() dataChanged = new EventEmitter<Order>();

  constructor(private orderService: OrderService,
              private router: Router,
              private toastrService: NbToastrService,
              private exportService: ExportService,
            ) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }



  //restore order function
  onRestoreConfirm(order: Order, id: string) {
    this.orderService.cancelArchiveOrders(order,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Order Restored !!');
        this.getAllOrders();
        this.router.navigate(['/crm/orders']).then(() => {
          this.getAllOrders();
        });
      });
  }

  getAllOrders() {
    this.orderService.getOrdersArchived().subscribe((data: Order[]) => {
      this.dataOrders = data;
    }, (err) => {
      console.log(err);
    });
  }


  //export data to excel
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataOrders, 'dataOrders');
  }

  //toast alert notification
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
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
