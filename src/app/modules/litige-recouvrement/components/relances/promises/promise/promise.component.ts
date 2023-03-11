import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Promise } from '../../../../models/Promise';
import { Relance } from '../../../../models/Relance';
import { RelanceService } from '../../../../services/relance.service';

@Component({
  selector: 'ngx-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {
  @Input() relance: Relance = new Relance();
  createProjectCharterform: FormGroup;
  rest:number=0 ; 
  flippedState: boolean = false;



  constructor(
    private re:RelanceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
this.rest=this.relance?.invoice?.total;
let date =null;
(this.relance?.promise!==null)&&(this.rest-=this?.relance?.promise?.amount,date =this?.relance?.promise?.datedepaiement)

    const formcontrols = {
      amount: new FormControl(this.relance?.promise?.amount,),
      datedepaiement: new FormControl(date,),


    

    };
    this.createProjectCharterform = this.fb.group(formcontrols);
 }




create() {
  const data = this.createProjectCharterform.value;

this.updateRelancee(data)

}
flippe(): void {
  this.flippedState = !this.flippedState;
}
updateRelancee(promise:Promise){
  
  this.relance.promise=promise;
  console.log(this.relance.promise);
  this.re.updateRelance(this.relance.id,this.relance).subscribe({
    next:(res)=>{
      console.log(res)
      this.rest=this.relance.invoice.total-this.relance.promise.amount ;
    },
    error:(err)=>{console.log(err)},
   
  
  
  
  });
  
      
    }

  }

 


