import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {Customer} from '../../../models/Customer';
import {CustomerService} from '../../../services/customers/customer.service';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {ClaimsService} from '../../../services/claims/claims.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Claim} from '../../../models/Claim';
import {TokenStorageService} from '../../../../auth/service/token/token.service';

@Component({
  selector: 'ngx-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})
export class AddClaimComponent implements OnInit {

  //declare group for visit form

  extra_form: FormGroup = new FormGroup({});
  claimGroup: FormGroup = new FormGroup({});
  correction_form: FormGroup = new FormGroup({});
  type_form: FormGroup = new FormGroup({});
   currentRate = 0;
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

  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  user: any;

  constructor(private cs: CustomerService, private es: EmployeeService,
                            private tokenStorageService: TokenStorageService,
              private toastrService: NbToastrService, private router: Router,
              private claimService: ClaimsService) {
    //initialisation for visit group form with form controls
    this.claimGroup = new FormGroup({
   
      claimTitle: new FormControl(''),
      claimDate: new FormControl(''),
      descriptionClaim: new FormControl(''),
   
      otherInfos: new FormControl(''),

      type_form: new FormGroup({
        urgencyType: new FormControl(''),
        claimType: new FormControl(''),
        claimMotif: new FormControl(''),
      }),

      correction_form: new FormGroup({
        evaluationClaim: new FormControl(''),
        responseClaim: new FormControl(''),
      }),

      extra_form: new FormGroup({
        customer: new FormControl(''),
        employee: new FormControl(''),
      }),

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
    //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
    this.user = this.tokenStorageService.getUser();

  }

//select customer 
  onMenuItemSelectedCustomer(selectedOne) {
    this.selectedCustomer = selectedOne;
  }

//select employee
  onMenuItemSelectedEmployee(selectedOne) {
    this.selectedEmployee = selectedOne;
  }

  //extra form submit
  onCorrectionFormSubmit() {
    this.correction_form.markAsDirty();
  }

  //extra form submit
  onClaimFormSubmit() {
    this.claimGroup.markAsDirty();
  }

  //extra form submit
  onTypeFormSubmit() {
    this.type_form.markAsDirty();
  }

//Add claim function
  addClaimFunction() {
    this.claim.customer = <Customer>{id: this.selectedCustomer};
    this.employeeToStore = this.selectedEmployee;
    this.claim.employee = this.employeeToStore;

    this.claimService.addClaim(this.claim, this.selectedEmployee).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Claim Added Successfully!!');
        this.router.navigateByUrl('/crm/claims');

      },
      (err: HttpErrorResponse) => {
        this.showToast('danger', 'Add ! ', err.message);

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
