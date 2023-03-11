import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Contract } from '../../../models/Contract';
import { ContractService} from '../../../services/contractServices/contract.service';

@Component({
  selector: 'ngx-assign-contract',
  templateUrl: './assign-contract.component.html',
  styleUrls: ['./assign-contract.component.scss']
})
export class AssignContractComponent implements OnInit {

  contract : Contract = new Contract();
  id : string ;
  contract_form : FormGroup = new FormGroup({});

  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  config : NbToastrConfig;
  title = 'Create and Assign Contract';
  content = 'Operation achieved';
  _duration = 2000;

  user : any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private cs : ContractService,
              private toastrService: NbToastrService,
              private route : ActivatedRoute) { 
    this.contract_form = new FormGroup({
      contractType : new FormControl('',[Validators.required]),
      hiringDate : new FormControl(''),
      endDate : new FormControl(''),
      noticePeriod : new FormControl('',[Validators.pattern("^[1-9][0-9]*$")]),
      status : new FormControl('',[Validators.required]),
      officialSignature : new FormControl(''),
      durationOfTrialPeriod : new FormControl(''),
      startTime : new FormControl(''),
      duration : new FormControl('',[Validators.pattern("^[1-9][0-9]*$")]),
      nbOfHoursWorkedPerDay : new FormControl('',[Validators.pattern("^[1-9][0-9]*$")]),
      nbOfWeeklyWorkingHours : new FormControl('',[Validators.pattern("^[1-9][0-9]*$")]),
      hourlyWorkRate : new FormControl('',[Validators.pattern("^[0-9]*$")]),
      dailyCost : new FormControl('',[Validators.pattern("^[0-9]*$")]),
      hourlyDistribution : new FormControl(''),
      companyName : new FormControl(''),
      companyAddress : new FormControl(''),
      workAddress : new FormControl(''),
      job : new FormControl(''),
      bonusCoef : new FormControl('',[Validators.pattern("^[0-9].*$")]),
      grossHourlyWage : new FormControl('',[Validators.pattern("^[1-9][0-9].*$")]),
      minimumMonthlySalary : new FormControl('',[Validators.pattern("^[0-9].*$")]),
      grossAnnualSalary : new FormControl('',[Validators.pattern("^[1-9][0-9].*$")]),
      overallMonthlyCost : new FormControl('',[Validators.pattern("^[1-9][0-9].*$")]),
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      this.id = result.get('id');
    });

    this.user = this.tokenStorageService.getUser();

  }

  get contractType() {return this.contract_form.get('contractType');}
  get hiringDate() {return this.contract_form.get('hiringDate');}
  get endDate() {return this.contract_form.get('endDate');}
  get noticePeriod() {return this.contract_form.get('noticePeriod');}
  get status() {return this.contract_form.get('status');}
  get officialSignature() {return this.contract_form.get('officialSignature');}
  get durationOfTrialPeriod() {return this.contract_form.get('durationOfTrialPeriod');}
  get startTime() {return this.contract_form.get('startTime');}
  get duration() {return this.contract_form.get('duration');}
  get nbOfHoursWorkedPerDay() {return this.contract_form.get('nbOfHoursWorkedPerDay');}
  get nbOfWeeklyWorkingHours() {return this.contract_form.get('nbOfWeeklyWorkingHours');}
  get hourlyWorkRate() {return this.contract_form.get('hourlyWorkRate');}
  get dailyCost() {return this.contract_form.get('dailyCost');}
  get hourlyDistribution() {return this.contract_form.get('hourlyDistribution');}
  get companyName() {return this.contract_form.get('companyName');}
  get companyAddress() {return this.contract_form.get('companyAddress');}
  get workAddress() {return this.contract_form.get('workAddress');}
  get job() {return this.contract_form.get('job');}
  get bonusCoef() {return this.contract_form.get('bonusCoef');}
  get grossHourlyWage() {return this.contract_form.get('grossHourlyWage');}
  get minimumMonthlySalary() {return this.contract_form.get('minimumMonthlySalary');}
  get grossAnnualSalary() {return this.contract_form.get('grossAnnualSalary');}
  get overallMonthlyCost() {return this.contract_form.get('overallMonthlyCost');}


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this._duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Contract ${titleContent}`,
      config);
  }

  storeContract()
  {
    this.contract.user =  this.user.email;
    this.cs.assignContract(this.contract, this.id).subscribe(
      (res)=> {
        this.showToast('success','SUCESS','Created Successfuly');
        console.log(JSON.stringify(res));
      },(err)=>{
        this.showToast('success','SUCESS','Created Successfuly');
        console.log(JSON.stringify(err));
      }
    )
  }
  

}
