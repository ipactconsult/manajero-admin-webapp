import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Claim} from '../../../models/Claim';
import {Customer} from '../../../models/Customer';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {CustomerService} from '../../../services/customers/customer.service';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClaimsService} from '../../../services/claims/claims.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Employee} from '../../../../humain-capital-management/models/Employee';

@Component({
  selector: 'ngx-respond-claim',
  templateUrl: './respond-claim.component.html',
  styleUrls: ['./respond-claim.component.scss']
})
export class RespondClaimComponent implements OnInit {

 
 //declare group for claim form 
  claimGroup: FormGroup = new FormGroup({});

  //declare claim instance
  claim: Claim = new Claim();

  //select employee variable for menu option
  selectedEmployee: string = '';

  //employee to store variable 
  employeeToStore: any;


  //selected customer variable for menu option
  selectedCustomer;

   currentRate = 0;
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  idUri: string;
  selectedStatus: any;
  list: Employee[];

  constructor(private cs: CustomerService, private es: EmployeeService,
              private toastrService: NbToastrService, private router: Router,    private activatedroute: ActivatedRoute,
              private claimService: ClaimsService) {
    //initialisation for visit group form with form controls
    this.claimGroup = new FormGroup({
        
        evaluationClaim: new FormControl(''),
        responseClaim: new FormControl(''),
       
    });
  }

  get responseClaim() {
    return this.claimGroup.get('responseClaim');
  }

  get evaluationClaim() {
    return this.claimGroup.get('evaluationClaim');
  }

  get status() {
    return this.claimGroup.get('descriptionClaim');
  }
  
  ngOnInit(): void {
      this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');

    });

       //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );

    this.claimService.getClaimById(this.idUri).subscribe(data => {
      this.claim = data;
      this.selectedCustomer = data?.customer?.id;
      this.selectedEmployee = data?.employee?.id;
      error => {
        this.showToast('danger', 'Something wents wrong ! ', error.toString());
      };
    });
    
  }

//select status
  onMenuStatusSelected(selectedOne) {
    this.selectedStatus = selectedOne;
  }

  
//Add claim function
 updateClaimFunction() {
    this.claim.customer = <Customer>{id: this.selectedCustomer};

    this.claimService.updateClaim(this.claim, this.selectedEmployee).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Respond Successfully!!');
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
