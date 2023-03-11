import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Relance } from '../../../models/Relance';
import { SMS } from '../../../models/SMS';
import { RelanceService } from '../../../services/relance.service';

@Component({
  selector: 'ngx-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  createProjectCharterform: FormGroup;

  sendSms:SMS ;

  @Input() relance: Relance = new Relance();
  flippedState: boolean = false;

  defaultmsg :string ="";

  constructor(private router: Router,
    private re: RelanceService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.defaultmsg=
    "Nous vous avons adressé une facture n° "+this?.relance?.invoice?.code +"\n" +
    "Or, à ce jour, nous n’avons toujours pas reçu le paiement de cette somme."+"\n" +
    "Nous vous demandons donc de bien vouloir procéder au règlement de ces "+this?.relance?.invoice?.total +" le plus tot possible"+"\n" 

    const formcontrols = {
      rapportsms: new FormControl(this.defaultmsg,),
      

    };
    this.createProjectCharterform = this.fb.group(formcontrols);
  }




  create() {
    const data = this.createProjectCharterform.value;
    this.re.sendSMS(data,this.relance.id).subscribe({
      next:(res)=>{
        this.sendSms=res;




      },
      error:(err)=>{console.log(err)},
      complete:()=>{this.updateRelance(data);

      }



    });
  }
  flippe(): void {
    this.flippedState = !this.flippedState;
  }
  updateRelance(sms:SMS){
    
this.relance.sms.push(sms);
console.log(this.relance.sms);
this.re.updateRelance(this.relance.id,this.relance).subscribe({
  next:(res)=>{
    console.log(res)




  },
  error:(err)=>{console.log(err)},
 



});

    
  }


}
