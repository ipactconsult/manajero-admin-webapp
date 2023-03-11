import { Component, OnInit } from '@angular/core';
import { ActivityStatus } from '../../../../models/ActivityStatus';

@Component({
  selector: 'ngx-activities-stepper',
  templateUrl: './activities-stepper.component.html',
  styleUrls: ['./activities-stepper.component.scss']
})
export class ActivitiesStepperComponent implements OnInit {
  initialStatus:ActivityStatus[] = [];
  enbale: boolean=false;
  enbaleActivityForm: boolean=false;

  constructor() { }

  ngOnInit(): void {
    this.initialStatus=[]
  }
refresh(status:ActivityStatus[]): void {
  this.initialStatus = status;
  this.initialStatus.length> 0&&(this.enbale=true);
}
enableActivityForm()
{
  this.enbaleActivityForm=true;
}

}
