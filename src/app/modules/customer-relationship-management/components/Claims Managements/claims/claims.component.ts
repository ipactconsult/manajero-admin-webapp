import {Component, OnInit} from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';
import {ClaimsService} from '../../../services/claims/claims.service';
import {Claim} from '../../../models/Claim';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {Customer} from '../../../models/Customer';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {CustomerService} from '../../../services/customers/customer.service';

@Component({
  selector: 'ngx-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  //current number page for pagination
  current: number = 1;
  //declare countries list
  countries: any [] = [];
  //customers list init
  dataCustomers: Customer[] = [];

  //declaration of employees list variable
  list: Employee[] = [];
  //getting customers per page 
  pageSize: number = 9;
  //declaration for filter string variable
  search: string;
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  dataClaims: Claim[] = [];

  constructor(private toastrService: NbToastrService,
              private router: Router, private es: EmployeeService, private cS: CustomerService,
              private exportService: ExportService, private claimsService: ClaimsService) {
  }

  ngOnInit(): void {

    //countries data
    this.countries = GoogleCountries;
    //getting all visits data
    this.getAllClaims();
    //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
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
  }


  //claims data desc title
  descClaimsTitle() {
    this.claimsService.getClaimDescTitle().subscribe(
      (data: Claim[]) => {
        this.dataClaims = data;

      }, (err) => {
        return err;
      }
    );
  }

  //claims data asc title
  ascTitleClaims() {
    this.claimsService.getClaimAscTitle().subscribe(
      (data: Claim[]) => {
        this.dataClaims = data;

      }, (err) => {
        return err;
      }
    );
  }

  //claims data desc created at
  descCreatedAtClaims() {
    this.claimsService.getClaimDescCreatedAt().subscribe(
      (data: Claim[]) => {
        this.dataClaims = data;

      }, (err) => {
        return err;
      }
    );
  }

  //claims data desc created at
  ascCreatedAtClaims() {
    this.claimsService.getClaimAscCreatedAt().subscribe(
      (data: Claim[]) => {
        this.dataClaims = data;

      }, (err) => {
        return err;
      }
    );
  }

  //getting all visits data
  getAllClaims() {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data;
        }
      );
  }

  //archive contract function
  onArchiveConfirm(claim: Claim, id: string) {
    this.claimsService.archiveClaim(claim, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Claim Archived !!');
        this.getAllClaims();
        this.router.navigate(['/crm/claims']).then(() => {
          this.getAllClaims();
        });
      });
  }

//filter claims by status
  getContractsByType(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data.filter(
            (d =>
                d.status === e
            )
          );
        }, (err) => {
          return err;
        });
  }

  //filter claims by urgency
  filterByUrgency(e) {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data.filter(
            (d =>
                d.urgencyType === e
            )
          );
        }, (err) => {
          return err;
        });
  }

  //filter claims by urgency
  filterByClaimType(e) {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data.filter(
            (d =>
                d.claimType === e
            )
          );
        }, (err) => {
          return err;
        });
  }

  //filter claims by urgency
  filterByEvaluation(e) {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data.filter(
            (d =>
                d.evaluationClaim === e
            )
          );
        }, (err) => {
          return err;
        });
  }

  //filter claims by employee
  filterByEmployee(e) {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data.filter(
            (d =>
                //@ts-ignore
                d?.employee?.id === e
            )
          );
        }, (err) => {
          return err;
        });
  }

  //filter claim by customer
  filterByCustomer(e) {
    this.claimsService.getAllClaimsNonArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data.filter(
            (d =>

                d?.customer?.id === e
            )
          );
        }, (err) => {
          return err;
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

 //export visits data as excel file
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataClaims, 'dataClaims');
  }
}
