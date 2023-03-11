import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {AngularFireStorage} from '@angular/fire/storage'
import {Observable} from 'rxjs';
import { finalize } from "rxjs/operators";

import { EventMarketing} from './../../../models/event-marketing'; 
import { EventMarketingService} from './../../../services/event-marketing.service';
import { PersonaService} from './../../../services/persona.service';
import { ParternershipService} from './../../../services/parternership.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import { Persona } from 'app/modules/communication-marketing-management/models/persona';
import { Parternership } from 'app/modules/communication-marketing-management/models/parternership';

@Component({
  selector: 'ngx-add-event-marketing',
  templateUrl: './add-event-marketing.component.html',
  styleUrls: ['./add-event-marketing.component.scss']
})
export class AddEventMarketingComponent implements OnInit {

  
  pageSize = 10;
  EventMarketing: EventMarketing = new EventMarketing();
  EventMarketingGroup: FormGroup;
  PersonaForm: FormGroup;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  fb = '';
  downloadURL: Observable<string>;
  countries : any [] = [];
  
  personaId: String;
  selectedItem: string= "";
  listPersona : Persona[] = [];
  listPartner :  Parternership[] = [];
  per : Persona = new Persona();


  selectedPartnerName = '';
  selectedPartner;
  partners: Parternership[] = [];
  selectedParternerships: Parternership[] = [];


  selectedPersonaName = '';
  selectedPersona;
  personas: Persona[] = [];
  selectedPersonas: Persona[] = [];





  constructor( private dialogService: NbDialogService, private router: Router, private  es : EventMarketingService,private  personaService : PersonaService,
              private toastrService: NbToastrService,private storage: AngularFireStorage,
              private windowService: NbWindowService  ,  private parternershipService  : ParternershipService) {
    this.EventMarketingGroup = new FormGroup({
      title: new FormControl('' , [Validators.pattern("^[a-zA-Z ]*")]),
      description: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      adresse: new FormControl('' , [Validators.required]),
      ville: new FormControl('') ,
      image : new FormControl('', [Validators.required]) ,
      country : new FormControl('', [Validators.required]) ,
      time : new FormControl('', [Validators.required]) ,
      nombre : new FormControl('') ,

   });

   
  }
  
  ngOnInit(): void {
    this.countries = GoogleCountries;


    this.parternershipService.getParternerships().subscribe(
            (data: Parternership[]) => {
    this.partners = data;
   //this.selectedItem= data[0].motivation ;
              } ,
        (err) => {
            console.log(err);
             },
);




this.personaService.getPersonas().subscribe(
  (data: Persona[]) => {
    this.personas = data;
   //this.selectedItem= data[0].motivation ;
  } ,
   (err) => {
    console.log(err);
  },
);


}

  get partnerss() {
    return this.EventMarketingGroup.get('partners');
  }
    
  get nombre() {
    return this.EventMarketingGroup.get('nombre');
  }
  
  
  get time() {
    return this.EventMarketingGroup.get('time');
  }
    

  get title() {
    return this.EventMarketingGroup.get('title');
  }

  get date() {
    return this.EventMarketingGroup.get('date');
  }

  get prix () {
    return this.EventMarketingGroup.get('prix');
  }

  get adresse() {
    return this.EventMarketingGroup.get('adresse');
  }

  get image() {
    return this.EventMarketingGroup.get('image');
  }

  get country() {
    return this.EventMarketingGroup.get('country');
  }
 

  // Notificatio Toast 
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



// Upload File
  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `Parternerships/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Parternerships/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }

            this.EventMarketing.image = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }

  // Load Persona
  loadPersona(){
    this.personaService.findAll().subscribe(
      (data: Persona[]) => {
        this.listPersona = data;
       //this.selectedItem= data[0].motivation ;
      } ,
       (err) => {
        console.log(err);
      },
    );
    }

// Load Partner
    loadPartner(){
      this.parternershipService.getParternerships().subscribe(
        (data: Parternership[]) => {
          this.listPartner = data;
         //this.selectedItem= data[0].motivation ;
        } ,
         (err) => {
          console.log(err);
        },
      );


      }

// Slect Persona 
  getSelectedPersona(event) {

    this.selectedItem=event ;
    console.log(this.selectedItem);
 
  }
 



 // Add new Event 
  addEventFunction() {
   // this.per.id=this.selectedItem ;
    this.EventMarketing.image = this.fb;
    this.EventMarketing.partners = this.selectedParternerships ; 
    this.EventMarketing.personas = this.selectedPersonas ;
        this.es.addEvent(this.EventMarketing).subscribe(result => {
              this.showToast("success", "Add ! ", " Event  Added !!");
              this.router.navigateByUrl('/communicationMarketing/EventMarketing').then(() => {
                this.router.navigate(['/communicationMarketing/EventMarketing']);
              });


            },
      (err) => {
                    this.showToast("danger", "Add ! ", err.error.message);


      },
    );
  }
  

// Select  Multipile 

  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }




  
  open22Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  cancelProcess2(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }




  selectPartnerName(selectPartnerName): void {
    this.selectPartnerName = selectPartnerName;
  }

  // Cancel Select   partenship
  cancelSelection(parternership) {
    this.selectedParternerships.splice(this.selectedParternerships.indexOf(parternership), 1);
    this.partners.push(parternership);
  }


  // Cancel Select   persona
  cancelSelectionPersona(persona) {
    this.selectedPersonas.splice(this.selectedPersonas.indexOf(persona), 1);
    this.partners.push(persona);
  }

// Select Partner
  selectPartner(selectedPartner): void {
   /* if (selectedPartner !== null) {
      this.selectedPartner = selectedPartner;
      this.selectedParternerships.push(this.selectedPartner);
      console.log("selectedParternerships" ,  this.selectedParternerships ) ;
      this.partners.splice(this.partners.indexOf(this.selectedPartner), 1);
    }*/
    for(let i =0 ; i< this.partners.length; i++)
    {

      if( this.partners[i].id === selectedPartner.id )

      {

        this.selectedParternerships.push(this.partners[i])
      }
    }
    console.log("selectedParternerships" ,  this.selectedParternerships ) ;
    console.log("selectedParter" ,   selectedPartner.id ) ;



  }



// Select Partner
selectPersona(selectedPersna): void {
  /* if (selectedPartner !== null) {
     this.selectedPartner = selectedPartner;
     this.selectedParternerships.push(this.selectedPartner);
     console.log("selectedParternerships" ,  this.selectedParternerships ) ;
     this.partners.splice(this.partners.indexOf(this.selectedPartner), 1);
   }*/
   for(let i =0 ; i< this.personas.length; i++)
   {

     if( this.personas[i].id === selectedPersna.id )

     {

       this.selectedPersonas.push(this.personas[i])
     }
   }
   console.log("selectedParternerships" ,  this.selectedPersonas ) ;
   console.log("selectedParter" ,   selectedPersna.id ) ;



 }







}
