import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../models/Customer';
import {
  NbComponentStatus,

  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService
} from '@nebular/theme';
import {CustomerService} from '../../../services/customers/customer.service';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import Cities from '../../../../../shared/cities.json';


@Component({
  selector: 'ngx-prospects-management',
  templateUrl: './prospects-management.component.html',
  styleUrls: ['./prospects-management.component.scss']
})
export class ProspectsManagementComponent implements OnInit {

    //declare countries list
    countries: any [] = [];
    //items per page
    pageSize: number = 4;

    
    cities;
    //current nb for page pagination
    current: number = 1;
    //search for filter module
    search: string = '';

    //toaster config begin
    config: NbToastrConfig;
    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';
    //toaster config end

    //customers data list instanciation
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
        this.getAllProspects();
        this.countries = GoogleCountries;
        this.cities= Cities;
              //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
    }


    //Get all prospects data function
    getAllProspects() {
        this.cs.findProspects().subscribe(
            (data: Customer[]) => {
                this.dataCustomers = data;

            }
        );
    }

    //filter by country function
    getEmpsByTitle(e, x) {
        this.filtre(e, x);
    }

    filtre(e, x) {
        this.cs.findAllCustomerAsc().subscribe(
            (data: Customer[]) => {
                this.dataCustomers = [];
                this.dataCustomers = data.filter(
                    (customer => {
                        x == 'Title' ? customer.title === e : customer.country === e;
                        customer.status === 'Prospect'
                        ;
                    })
                );
            }, (err) => {
                return err;
            });
    }


    //sort data prospect descending name
    getProspectsDesc() {
        this.cs.findProspectsNameDesc().subscribe(
            (data: Customer[]) => {
                this.dataCustomers = data;

            }, (err) => {
                console.log(err);
            },
        );
    }

    //sort data prospect descending created At date
    getProspectsCreatedDesc() {
        this.cs.findProspectsCreatedAtDesc().subscribe(
            (data: Customer[]) => {
                this.dataCustomers = data;

            }, (err) => {
                console.log(err);
            },
        );
    }

    //sort data prospect ascending name
    getProspectsAsc() {
        this.cs.findProspectsNameAsc().subscribe(
            (data: Customer[]) => {
                this.dataCustomers = data;
            }, (err) => {
                console.log(err);
            },
        );
    }
//Filter by country
  getProspectsByAddress(e,x) {
        this.filtreProspectsByCountry(e,x);
  }
  
   filtreProspectsByCountry(e,x) {
    this.cs.findProspects().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = []
        console.log(e);
        this.dataCustomers = data.filter(
          (c =>               
              x == 'City' ? c.city === e : c.country === e             
          )
          
        )
      }, (err) => {
        return err;
      })
  }
  
  
     //filter Customers by status
  getCustomersByEmployee(e) {
    this.filterByEmployee(e);
  }

  filterByEmployee(e) {
    this.cs.findProspects().subscribe(
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
  
 /* //filter by city
    
    getProspectsByCity(e,x) {
        this.filtreProspectsByCountry(e,x);
  }
  
   filtreProspectsByCity(e,x) {
    this.cs.findProspects().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = []
        console.log(e);
        this.dataCustomers = data.filter(
          (c =>               
              x == 'City' ? c.city === e : c.country === e             
          )
          
        )
      }, (err) => {
        return err;
      })
  }
  */

//archive customers function
  onArchiveConfirm(customer: Customer, id: string) {
    this.cs.archiveCustomer(customer, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Prospect Archived !!');
        this.getAllProspects();
        this.router.navigate(['/crm/prospects']).then(() => {
          this.getAllProspects();
        });
      });
  }

//export data prospects as excel file
    exportAsXLSX(): void {
        this.exportService.exportAsExcelFile(this.dataCustomers, 'dataCustomers');
    }


    //toast notification for alert
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
