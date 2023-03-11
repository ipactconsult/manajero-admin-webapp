import { Component, OnInit } from '@angular/core';
import {Contract} from '../../../models/Contract';
import {Router} from '@angular/router';
import {ContractService} from '../../../services/contracts/contract.service';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from '@nebular/theme';
import {ExportService} from '../../../../../shared/exports/export.service';
import {Customer} from '../../../models/Customer';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {CustomerService} from '../../../services/customers/customer.service';
import {VisitService} from '../../../services/visits/visit.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-list-contracts',
  templateUrl: './list-contracts.component.html',
  styleUrls: ['./list-contracts.component.scss']
})
export class ListContractsComponent implements OnInit {

 //declare countries list
    countries: any [] = [];
    //declaration of properties list
    properties;
  //pageSize for data items in page
  pageSize: number=9;
  
    //initializing data visits list
  dataVisits = [];
  
  //getting data contracts
  dataContracts: Contract[] = [];
  //filter variable search
  search: string = '';
  //current 1 nubmer for pagination
  current: number = 1;
  //customers list init
    dataCustomers: Customer[]=[];
//toast configuration
  index = 1;
   config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
//declaration of employees list variable
  list: Employee[] = [];
  constructor(private router: Router, private cs: ContractService,private es: EmployeeService, private cS: CustomerService,
              private toastrService: NbToastrService, private vs: VisitService,private exportService: ExportService) {
  }

  ngOnInit(): void {
    
       //countries data
  this.countries = GoogleCountries;
    //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
    
    //getting all visits data

    this.vs.getAllVisitsNonArchived()
      .subscribe(
        (data: any[]) => {
          this.dataVisits = data;
        }
      );
  
    
         //properties data
        this.vs.findAllProperties().subscribe(
      (data) => {
        this.properties = data;

      }, error => console.log(error)
    );
      
        //customers data
         this.cS.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (cut => cut.status === 'Client' || cut.status === 'Lead')
        );

      }, (err) => {
        return err;
      }
    );
    
    this.getAllContracts();
  }

  //get all contracts data
  getAllContracts() {
    this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = data;

      }, (err) => {
        return err;
      }
    );
  }

//filter Contract by status
  getContractsByType(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = [];
        this.dataContracts = data.filter(
          (d =>
              d.contractType === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  
   //Filter by country
  getContractsByAddress(e,x) {
        this.filtreContractsByCountry(e,x);
  }
  
   filtreContractsByCountry(e,x) {
   this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = [];
        this.dataContracts = data.filter(
          (c =>       
            // @ts-ignore    
              x == 'City' ? c?.deal?.visit?.property?.propertyCity === e : c?.deal?.visit?.property?.propertyCountry === e             
          )
          
        )
      }, (err) => {
        return err;
      })
  }
  
  filterByEmployee(e) {
   this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = [];
        this.dataContracts = data.filter(
          (d =>
              //@ts-ignore
              d?.deal?.visit?.employee?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  
  filterByProperty(e) {
    this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = [];
        this.dataContracts = data.filter(
          (d =>
              //@ts-ignore
              d?.deal?.visit?.property?.propertyId === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  //filter visits by employee
  getContractsByCustomer(e) {
    this.filterByCustomer(e);
  }

  filterByCustomer(e) {
    this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = [];
       /* this.dataContracts = data.filter(
          (d =>
           
              d?.order?.deals?.visit?.customer?.id === e
          )
        );*/
      }, (err) => {
        return err;
      });
  }
   
  
  filterByVisit(e) {
    this.cs.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        this.dataContracts = [];
       /* this.dataContracts = data.filter(
          (d =>
           
              d?.order?.deals?.visit?.id === e
          )
        );*/
      }, (err) => {
        return err;
      });
  }
  
  //export data as excel file
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataContracts, 'dataContracts');
  }

  //archive contract function
  onArchiveConfirm(contract: Contract, id: string) {
    this.cs.archiveContract(contract, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Contract Archived !!');
        this.getAllContracts();
        this.router.navigate(['/crm/contracts']).then(() => {
          this.getAllContracts();
        });
      });
  }

  //show toast notification
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
