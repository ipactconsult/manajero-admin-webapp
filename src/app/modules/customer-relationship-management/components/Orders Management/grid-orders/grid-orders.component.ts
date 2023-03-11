import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Order} from '../../../models/Order';
import {Customer} from '../../../models/Customer';
import {Material} from '../../../../product-inventory-management/models/material/material';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {OrderService} from '../../../services/orders/order.service';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';
import {CustomerService} from '../../../services/customers/customer.service';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';

@Component({
  selector: 'ngx-grid-orders',
  templateUrl: './grid-orders.component.html',
  styleUrls: ['./grid-orders.component.scss']
})
export class GridOrdersComponent implements OnInit {
 current: number=1;
  pageSize: number = 9;
  search;
  dataOrders: Order[] = [];
  dataCustomers: Customer[] = [];
  dataProducts: Material[];
 //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //declaration of employees list variable
  list: Employee[] = [];
   @Output() dataChanged = new EventEmitter<Order>();
  constructor(private orderService: OrderService,
              private toaster: NbToastrService,
              private router: Router, 
               private es: EmployeeService,
              private toastrService: NbToastrService,
              private exportService: ExportService,
              private cs: CustomerService) {
  }

  ngOnInit(): void {
       //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
    
     this.cs.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (cut => cut.status === 'Client' || cut.status === 'Lead')
        );

      }, (err) => {
        return err;
      }
    );
    this.getAllOrders();
     //products data
    this.orderService.findAllProducts().subscribe(
      (data: Material[]) => {
        this.dataProducts = data;

      }
    );
  }
  
  

  filterByEmployee(e) {
    this.orderService.getAllOrders().subscribe((data: Order[]) => {
      this.dataCustomers = [];

      this.dataOrders = data.filter(
        (d =>
            //@ts-ignore
            d?.customer?.id === e
        )
      );
    }, (err) => {
      return err;
    });
  }

   validateOrder( id: string,order: Order) {
   
    this.orderService.validateOrder(id,order).subscribe({
      next: (result: any) => {
        
        this.showToast('success', 'Add ! ', 'Order Validated Successfully!!');
   this.router.navigate(['/crm/orders']).then(() => {
          this.getAllOrders();
        });
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
        
        this.showToast('success', 'Add ! ', 'Order In Progress Successfully!!');
   this.router.navigate(['/crm/orders']).then(() => {
          this.getAllOrders();
        });
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
   this.router.navigate(['/crm/orders']).then(() => {
          this.getAllOrders();
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
         this.dataChanged.emit();
         
      },
    });
  }
  
  filterByOrderStatus(e) {
    this.orderService.getAllOrders().subscribe((data: Order[]) => {
      this.dataOrders = data.filter(
        (d =>
            d.status === e
        )
      );
    }, (err) => {
      return err;
    });
  }
  filterByProduct(e) {
    this.orderService.getAllOrders().subscribe((data: Order[]) => {
      this.dataOrders = data.filter(
          (d =>
              d?.product?.materialId === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
   filterByCustomer(e) {
    this.orderService.getAllOrders().subscribe((data: Order[]) => {
      this.dataOrders = data.filter(
          (d =>
           
              d?.deals?.visit?.customer?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }

  
   //archive order function
  onArchiveConfirm(order: Order, id: string) {
    this.orderService.archiveOrders(order, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Order Archived !!');
        this.getAllOrders();
        this.router.navigate(['/crm/orders']).then(() => {
          this.getAllOrders();
        });
      });
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((data: Order[]) => {
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
