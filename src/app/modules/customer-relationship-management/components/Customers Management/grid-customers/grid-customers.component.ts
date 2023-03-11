import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../models/Customer';

import {CustomerService} from '../../../services/customers/customer.service';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
 
} from '@nebular/theme';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';


import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';


@Component({
  selector: 'ngx-grid-customers',
  templateUrl: './grid-customers.component.html',
  styleUrls: ['./grid-customers.component.scss']
})
export class GridCustomersComponent implements OnInit {
 //declare countries list
  countries: any [] = [];
  
  //current numer =1 for pagination event
  current: number = 1;
  // search filter declaration
  search: string = '';
  
  //instanciate customer
  customer: Customer = new Customer();
  
  //toaster config
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  //getting customers per page 
  pageSize: number = 9;

  //declaration of customers list variable
  dataCustomers: Customer [] = [];
//declaration of employees list variable
  list: Employee[] = [];


  constructor(private cs: CustomerService,
              private router: Router,
              private toastrService: NbToastrService,
              private exportService: ExportService,
              private es: EmployeeService) {
  }


  ngOnInit(): void {
    //initialize customers list
    this.getAllCustomers();
    //initialize countries
    this.countries = GoogleCountries;
    
      //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
  }


  //get all customers
  getAllCustomers() {
    this.cs.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (cut => cut.status === 'Client' || cut.status === 'Lead')
        );

      }, (err) => {
        return err;
      }
    );
  }

//archive customers function
  onArchiveConfirm(customer: Customer, id: string) {
    this.cs.archiveCustomer(customer, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Customer Archived !!');
        this.getAllCustomers();
        this.router.navigate(['/crm/customers']).then(() => {
          this.getAllCustomers();
        });
      });
  }

//get all customers descending
  getCustomersDesc() {
    this.cs.findAllCustomerDesc().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (cut => cut.status === 'Client' || cut.status === 'Lead'));
      }, (err) => {
        console.log(err);
      },
    );
  }

  //get all customers ascending
  getCustomersAsc() {
    this.cs.findAllCustomerAsc().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (cut => cut.status === 'Client' || cut.status === 'Lead'));
      }, (err) => {
        console.log(err);
      },
    );
  }

  //filter Customers by status
  getCustomersByStatus(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.cs.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = [];
        this.dataCustomers = data.filter(
          (d =>
              d.status === e
          )
        );
      }, (err) => {
        return err;
      });
  }

//Filter by country
  getProspectsByAddress(e, x) {
    this.filtreProspectsByCountry(e, x);
  }

  filtreProspectsByCountry(e, x) {
    this.cs.findAllCustomerAsc().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = [];
        console.log(e);
        this.dataCustomers = data.filter(
          (c =>
              x == 'City' ? c.city === e : c.country === e
          )
        );
      }, (err) => {
        return err;
      });
  }

   //filter Customers by status
  getCustomersByEmployee(e) {
    this.filterByEmployee(e);
  }

  filterByEmployee(e) {
    this.cs.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = [];

        this.dataCustomers = data.filter(
          (d =>
              //@ts-ignore
              d?.assignee?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  //Update Status of customer to client
  updateStatus(customer: Customer, id: string) {
    this.cs.updateCustomerAsClient(customer, id).subscribe(
      (res) => {
        this.showToast('success', 'Update', 'Lead Converted to Client!!');
        this.router.navigate(['/crm/customers']).then(() => {
          this.getAllCustomers();
        });
      });
  }

  //export data to excel
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataCustomers, 'dataCustomers');
  }

  //toast notification
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
