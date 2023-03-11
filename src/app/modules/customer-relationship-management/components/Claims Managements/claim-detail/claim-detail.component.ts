import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Claim} from '../../../models/Claim';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {Customer} from '../../../models/Customer';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {CustomerService} from '../../../services/customers/customer.service';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClaimsService} from '../../../services/claims/claims.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-respond-claim',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {

  //declare group for claim form 
  claimGroup: FormGroup = new FormGroup({});

  //declare claim instance
  claim: Claim = new Claim();
  //declaration of employees list
  list: Employee[] = [];
  //select employee variable for menu option
  selectedEmployee: string = '';

  //employee to store variable 
  employeeToStore: any;

  //initialization of data customers 
  dataCustomers: Customer [] = [];

  //selected customer variable for menu option
  selectedCustomer;
  //selected status variable for menu option
  selectedStatus;

  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  idUri: string;

  constructor(private cs: CustomerService, private es: EmployeeService,
              private toastrService: NbToastrService, private router: Router, private activatedroute: ActivatedRoute,
              private claimService: ClaimsService) {
    //initialisation for visit group form with form controls
    this.claimGroup = new FormGroup({
      claimCode: new FormControl(''),
      claimTitle: new FormControl(''),
      claimDate: new FormControl(''),
      descriptionClaim: new FormControl(''),
      status: new FormControl(''),
      otherInfos: new FormControl(''),

      urgencyType: new FormControl(''),
      claimType: new FormControl(''),
      claimMotif: new FormControl(''),


      evaluationClaim: new FormControl(''),
      responseClaim: new FormControl(''),


      customer: new FormControl(''),
      employee: new FormControl(''),


    });
  }

  get responseClaim() {
    return this.claimGroup.get('responseClaim');
  }

  get evaluationClaim() {
    return this.claimGroup.get('evaluationClaim');
  }

  get claimMotif() {
    return this.claimGroup.get('claimMotif');
  }

  get urgencyType() {
    return this.claimGroup.get('urgencyType');
  }

  get otherInfos() {
    return this.claimGroup.get('otherInfos');
  }


  get claimCode() {
    return this.claimGroup.get('claimCode');
  }

  get status() {
    return this.claimGroup.get('descriptionClaim');
  }

  get descriptionClaim() {
    return this.claimGroup.get('descriptionClaim');
  }

  get claimType() {
    return this.claimGroup.get('claimType');
  }

  get employee() {
    return this.claimGroup.get('employee');
  }

  get customer() {
    return this.claimGroup.get('customer');
  }

  get claimTitle() {
    return this.claimGroup.get('claimTitle');
  }

  get claimDate() {
    return this.claimGroup.get('claimDate');
  }

  ngOnInit(): void {
    //customers data
    this.cs.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data;

      }
    );

    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');

    });

    this.claimService.getClaimById(this.idUri).subscribe(data => {
      this.claim = data;
      this.selectedCustomer = data?.customer?.id;
      this.selectedEmployee = data?.employee?.id;
      error => {
        this.showToast('danger', 'Get Contract ! ', error.toString());
      };
    });

    //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );

  }

//select customer 
  onMenuItemSelectedCustomer(selectedOne) {
    this.selectedCustomer = selectedOne;
  }

//select employee
  onMenuItemSelectedEmployee(selectedOne) {
    this.selectedEmployee = selectedOne;
  }

//select status
  onMenuStatusSelected(selectedOne) {
    this.selectedStatus = selectedOne;
  }


  //extra form submit
  onClaimFormSubmit() {
    this.claimGroup.markAsDirty();
  }


//Add claim function
  updateClaimFunction() {
    this.claim.customer = <Customer>{id: this.selectedCustomer};
    this.employeeToStore = this.selectedEmployee;
    this.claim.employee = this.employeeToStore;

    this.claimService.updateClaim(this.claim, this.selectedEmployee).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Claim Updated Successfully!!');
        this.router.navigateByUrl('/crm/claims');

      },
      (err: HttpErrorResponse) => {
        this.showToast('danger', 'Update ! ', err.message);

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
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
