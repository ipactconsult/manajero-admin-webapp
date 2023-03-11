import {Component, OnInit} from '@angular/core';
import {VisitService} from '../../../services/visits/visit.service';
import {Router} from '@angular/router';
import {Visit} from '../../../models/visit';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {ExportService} from '../../../../../shared/exports/export.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {CustomerService} from '../../../services/customers/customer.service';
import {Customer} from '../../../models/Customer';


@Component({
  selector: 'ngx-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],

})
export class VisitsComponent implements OnInit {
  
  //declare countries list
    countries: any [] = [];
  
    //getting customers per page 
  pageSize: number = 9;

  //current number page for pagination
  current: number = 1;
  //initializing data visits list
  dataVisits = [];
    
  //declaration of properties list
    properties;
  
  //declaration for filter string variable
  search: string;

  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  
//declaration of employees list variable
  list: Employee[] = [];
  dataCustomers: Customer[]=[];

  constructor(private vs: VisitService,
              private toastrService: NbToastrService,
              private router: Router,
              private exportService: ExportService,
               private es: EmployeeService,
              private cs: CustomerService) {
  }

  ngOnInit(): void {
    
   //countries data
  this.countries = GoogleCountries;
    //getting all visits data
    this.getAllVisit();

  //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
    
        //properties data
        this.vs.findAllProperties().subscribe(
      (data) => {
        this.properties = data;

      }, error => console.log(error)
    );
      
        //customers data
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

  //getting all visits data
  getAllVisit() {
    this.vs.getAllVisitsNonArchived()
      .subscribe(
        (data: any[]) => {
          this.dataVisits = data;
        }
      );
  }

  //filter visits data by status
  getVisitsByStatus(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = [];
        this.dataVisits = data.filter(
          (v =>
              v.status === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
       //filter visits by employee
  getVisitsByEmployee(e) {
    this.filterByEmployee(e);
  }

  filterByEmployee(e) {
    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = [];

        this.dataVisits = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }
    //filter visits by employee
  getVisitsByCustomer(e) {
    this.filterByCustomer(e);
  }

  filterByCustomer(e) {
    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = [];

        this.dataVisits = data.filter(
          (d =>
           
              d?.customer?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
   //filter Customers by status
  getVisitsByProperty(e) {
    this.filterByEmployee(e);
  }

  filterByProperty(e) {
    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = [];

        this.dataVisits = data.filter(
          (d =>
              //@ts-ignore
              d?.property?.propertyId === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  
  //Filter by country
  getVisitsByAddress(e,x) {
        this.filtreVisitsByCountry(e,x);
  }
  
   filtreVisitsByCountry(e,x) {
    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = []
      
        this.dataVisits = data.filter(
          (c =>       
            // @ts-ignore    
              x == 'City' ? c?.property?.propertyCity === e : c?.property?.propertyCountry === e             
          )
          
        )
      }, (err) => {
        return err;
      })
  }
  
   //sort data prospect descending name
    getVisitsTitleAsc() {
        this.vs.getVisitAscName().subscribe(
            (data: Visit[]) => {
                this.dataVisits = data;

            }, (err) => {
                console.log(err);
            },
        );
    }
  
   //sort data visits descending name
    getVisitsTitleDesc() {
        this.vs.getVisitDescName().subscribe(
            (data: Visit[]) => {
                this.dataVisits = data;

            }, (err) => {
                console.log(err);
            },
        );
    }
  
       //sort data prospect descending created At date
    getVisitsCreatedDesc() {
        this.vs.getVisitDescCreatedAt().subscribe(
            (data: Visit[]) => {
                this.dataVisits = data;

            }, (err) => {
                console.log(err);
            },
        );
    }  
       //sort data prospect descending created At date
    getVisitsCreatedAsc() {
        this.vs.getVisitAscCreatedAt().subscribe(
            (data: Visit[]) => {
                this.dataVisits = data;

            }, (err) => {
                console.log(err);
            },
        );
    }
    
  //archive visit function
  onArchiveConfirm(visit: Visit, id: string) {
    this.vs.archiveVisit(visit, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Visit Archived !!');
        this.getAllVisit();
        this.router.navigate(['/crm/visits']).then(() => {
          this.getAllVisit();
        });
      });
  }

  //export visits data as excel file
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataVisits, 'dataVisits');
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
