import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CallRapport } from '../../../../models/CallRapport';
import { Relance } from '../../../../models/Relance';
import { RelanceService } from '../../../../services/relance.service';

@Component({
  selector: 'ngx-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @Input() relance: Relance = new Relance();
  createProjectCharterform: FormGroup;
  flippedState: boolean = false;


  constructor(
    private re:RelanceService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    const formcontrols = {
      rapport: new FormControl("",),
    

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
  updateRelancee(call:CallRapport){
    
    this.relance.call.push(call);
    console.log(this.relance.call);
    this.re.updateRelance(this.relance.id,this.relance).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{console.log(err)},
     
    
    
    
    });
    
        
      }

}
