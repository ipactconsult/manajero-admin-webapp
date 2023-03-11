import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Contract } from '../../../models/Contract';
import { ContractService } from '../../../services/contractServices/contract.service';

@Component({
  selector: 'ngx-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.scss']
})
export class EditContractComponent implements OnInit {

  contract : Contract = new Contract();
  id : string ;
  contract_form : FormGroup = new FormGroup({});

  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  config : NbToastrConfig;
  title = 'Update Contract';
  content = 'Operation achieved';
  _duration = 2000;
  
  constructor(private cs : ContractService,
              private toastrService: NbToastrService,
              private route : ActivatedRoute) { 

                this.contract_form = new FormGroup({
                  contractType : new FormControl(''),
                  hiringDate : new FormControl(''),
                  endDate : new FormControl(''),
                  noticePeriod : new FormControl(''),
                  status : new FormControl(''),
                  officialSignature : new FormControl(''),
                  durationOfTrialPeriod : new FormControl(''),
                  startTime : new FormControl(''),
                  duration : new FormControl(''),
                  nbOfHoursWorkedPerDay : new FormControl(''),
                  nbOfWeeklyWorkingHours : new FormControl(''),
                  hourlyWorkRate : new FormControl(''),
                  dailyCost : new FormControl(''),
                  hourlyDistribution : new FormControl(''),
                  companyName : new FormControl(''),
                  companyAddress : new FormControl(''),
                  workAddress : new FormControl(''),
                  job : new FormControl(''),
                  bonusCoef : new FormControl(''),
                  grossHourlyWage : new FormControl(''),
                  minimumMonthlySalary : new FormControl(''),
                  grossAnnualSalary : new FormControl(''),
                  overallMonthlyCost : new FormControl(''),
                })

  }

  ngOnInit(): void {
      this.contract = new Contract();
      this.id = this.route.snapshot.params["id"];
      this.cs.getContract(this.id).subscribe(
        (data)=>{this.contract=data;},
        (err)=>{console.log(err);}
      )
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

  updateContract()
  {
    this.cs.updateContract(this.contract, this.id).subscribe(
      (res)=> {
        this.showToast('success','SUCESS','Updated Successfuly');
        console.log(JSON.stringify(res));
      },(err)=>{
        this.showToast('danger','DANGER','Could Not Update Contract');
        
      }
    )
  }

}
