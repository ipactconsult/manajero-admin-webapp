import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-process-steps',
  templateUrl: './process-steps.component.html',
  styleUrls: ['./process-steps.component.scss']
})
export class ProcessStepsComponent implements OnInit {
  @Input() processStep:string="";
  currentState:string="";
  step1=false;
  constructor() { }

  ngOnInit(): void {
    this.currentState=this?.processStep ;
console.log(this.currentState
  );
  this.step1=true;


  }
 

}
