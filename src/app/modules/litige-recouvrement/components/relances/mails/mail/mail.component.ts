import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Relance } from '../../../../models/Relance';
import { MailService } from '../../../../services/mail.service';
import { DatePipe } from "@angular/common";
import { RelanceService } from '../../../../services/relance.service';
import { Mail } from '../../../../models/Mail';



@Component({
  selector: 'ngx-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  createProjectCharterform: FormGroup;
  config: NbToastrConfig;
  flippedState: boolean = false;
 @Input() relance: Relance = new Relance();
sendEmail:Mail
  
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
   defaultmsg :string ="";

  constructor(private router: Router,
    private cs: MailService,
    private pipe:DatePipe,
    private re:RelanceService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
   
    ) { }

  ngOnInit(): void {
    this.defaultmsg=  "Madame, Monsieur,"+ "\n" + " "+ "\n" +
    "Sauf erreur ou omission de notre part, à ce jour, nous n’avons toujours pas reçu le règlement de notre facture n° "+this?.relance?.invoice?.code + " du " + this.pipe.transform(this?.relance?.invoice?.createdAt, 'yyyy-MM-dd ')+ " d’un montant de "+ this.relance.invoice.total +" dinars"+ "\n" +
  
      "L’échéance étant dépassée, nous sommes soucieux qu’un problème ait pu retarder votre paiement. Si tel était le cas, n’hésitez pas à nous contacter."+ "\n" +
  
       "Cependant, s’il s’agit d’un simple oubli, nous vous demandons de bien vouloir régulariser cette situation par retour de courrier."+ "\n" +
  
      "Dans le cas où votre règlement aurait été adressé entre temps, nous vous prions de ne pas tenir compte de la présente."+ "\n" +
  
      "Restant à votre disposition pour tout renseignement complémentaire."+ "\n" +
  
     " Nous vous remerciant par avance et vous prions d'agréer, (Madame, Monsieur), l’expression de nos salutations distinguées."
    const formcontrols = {
      maile: new FormControl(this.defaultmsg,),
      objet: new FormControl("Invoice(s) awaiting payment", ),
      emetteur: new FormControl(this.relance?.invoice?.clientEmail),

    };
    this.createProjectCharterform = this.fb.group(formcontrols);
   
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }


  create() {
    const data = this.createProjectCharterform.value;
    this.cs.addMail(data).subscribe({
      next:(res)=>{
        this.sendEmail=res;




      },
      error:(err)=>{console.log(err)},
      complete:()=>{this.updateRelance(data);

      }



    });
  }
  flippe(): void {
    this.flippedState = !this.flippedState;
  }

  updateRelance(email:Mail){
    
this.relance.email.push(email);
console.log(this.relance.email);
this.re.updateRelance(this.relance.id,this.relance).subscribe({
  next:(res)=>{
    console.log(res)




  },
  error:(err)=>{console.log(err)},
 



});

    
  }
}
