import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Publication } from '../../../models/publication';
import {PublicationService} from "./../../../services/publication.service";
import { Persona } from '../../../models/persona';
import { PersonaService } from '../../../services/persona.service';
import { GraphicalCharterService } from '../../../services/graphical-charter.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphicalCharter } from '../../../models/graphical-charter';

@Component({
  selector: 'ngx-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {
/*
  pageSize = 10;
  publication: Publication = new Publication();
  PublicationGroup: FormGroup;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  fb = '';
  downloadURL: Observable<string>;

  constructor(private router: Router, private  publicationService : PublicationService,
              private toastrService: NbToastrService,private storage: AngularFireStorage,
              private windowService: NbWindowService) {
    this.PublicationGroup = new FormGroup({
      title: new FormControl(''),
      description : new FormControl(''),
      hastag: new FormControl(''),
      content: new FormControl(''),
      briefingType: new FormControl(''),
      tags: new FormControl(''),
      socialMedia: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      type: new FormControl(''),



    });
  }

  ngOnInit(): void {

  }



  
  get title() {
    return this.PublicationGroup.get('title');
  }


    get description() {
    return this.PublicationGroup.get('description');
  }

  get hastag() {
    return this.PublicationGroup.get('hastag');
  }

  get content() {
    return this.PublicationGroup.get('content');
  }

  get briefingType() {
    return this.PublicationGroup.get('briefingType');
  }

  get tags() {
    return this.PublicationGroup.get('tags');
  }

  get socialMedia() {
    return this.PublicationGroup.get('socialMedia');
  }

  get dateDebut() {
    return this.PublicationGroup.get('dateDebut');
  }

  get dateFin() {
    return this.PublicationGroup.get('dateFin');
  }
  get type() {
    return this.PublicationGroup.get('type');
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
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }


  addPartnerFunction() {
    this.publication.content = this.fb;


    this.publicationService.addPublication(this.publication).subscribe(result => {
        this.showToast("success", "Add ! ", " Publication  Added !!");
        window.location.reload();
      },
      (err) => {
        this.showToast("danger", "Add ! ", err.error.message);


      },
    );
  }
 


  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `Publication/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Publication/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }

           this.publication.content = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }
*/



selectedFile: File = null;
__fireBase;
downloadURL: Observable<string>;

cell1TelInput: any = {
  initialCountry: 'tn',
  autoPlaceholder: 'polite',
  nationalMode : true,
};
hasErr: boolean;
prefixPhoneSupp: String = '';
countries : any [] = [];
publication : Publication = new Publication();
publicationForm : FormGroup ;
PersonaForm : FormGroup ;
chartForm : FormGroup ;

config : NbToastrConfig;

duration = 2000;
status : NbComponentStatus = 'primary';
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
fb = '';


selectedItem: string= "";
selectedItem2: string= "";


loading = false;

listPersona : Persona[] = [];
pe: string;

listChart: GraphicalCharter[] = [];
c: string;

per : Persona = new Persona();
chart : GraphicalCharter = new GraphicalCharter();

newPunlication = null;
personaId: String;
chartId: String;


personaToGet: Persona = null;
chartToGet: GraphicalCharter = null;
hiddenProdForm: Boolean = false;
disableLastPrev: Boolean = false;






selectedPersonaName = '';
selectedPersona;
personas: Persona[] = [];
selectedPersonas: Persona[] = [];





constructor(private router:Router, private sanitizer: DomSanitizer,private storage: AngularFireStorage,
            private publicationService: PublicationService, private toastrService: NbToastrService 
            , private  personaSerice : PersonaService  ,
             private  graphicalCharterService : GraphicalCharterService , 
             private  personaService : PersonaService ,  private dialogService: NbDialogService) {
  


 
  this.publicationForm = new FormGroup({
   
    title: new FormControl('' , [Validators.pattern("^[a-zA-Z ]*")]),
    description : new FormControl(''),
    hastag: new FormControl(''),
    content: new FormControl(''),
    briefingType: new FormControl(''),
    tags: new FormControl(''),
    socialMedia: new FormControl(''),
    dateDebut: new FormControl(''),
    dateFin: new FormControl(''),
    type: new FormControl('') ,
    per : new FormControl('') ,
    chart : new FormControl('') 
 });




}






getSelectedPersona(event) {

   this.selectedItem=event ;
   console.log(this.selectedItem);

 }




 getSelectedChart(event) {

  this.selectedItem2=event ;
  console.log(this.selectedItem2);

}


ngOnInit(): void {
  this.loadPublication();

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


get title() {
  return this.publicationForm.get('title');
}


  get description() {
  return this.publicationForm.get('description');
}

get hastag() {
  return this.publicationForm.get('hastag');
}

get content() {
  return this.publicationForm.get('content');
}

get briefingType() {
  return this.publicationForm.get('briefingType');
}

get tags() {
  return this.publicationForm.get('tags');
}

get socialMedia() {
  return this.publicationForm.get('socialMedia');
}

get dateDebut() {
  return this.publicationForm.get('dateDebut');
}

get dateFin() {
  return this.publicationForm.get('dateFin');
}
get type() {
  return this.publicationForm.get('type');
}



loadPublication(){
  this.personaSerice.findAll().subscribe(
    (data: Persona[]) => {
      this.listPersona = data;
     //this.selectedItem= data[0].motivation ;
    } ,
     (err) => {
      console.log(err);
    },
  );



  this.graphicalCharterService.findAll().subscribe(
    (data: GraphicalCharter[]) => {
      this.listChart = data;
    } ,
     (err) => {
      console.log(err);
    },
  );

}

private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
  };
  const titleContent = title ? `. ${title}` : '';
  this.toastrService.show(
    body, `Publication ${titleContent}`,
    config);
}

storePublication(){
  this.per.id=this.selectedItem ;
 // this.publication.persona=this.per;

  this.chart.id=this.selectedItem2
  this.publication.graphicalCharter =this.chart;
  this.publication.content = this.fb;
  this.publication.personas = this.selectedPersonas ;


  this.publicationService.addPublication(this.publication).subscribe(
    (res) => {

      this.showToast('success','SUCESS','Created Successfuly');
      this.router.navigateByUrl("/communicationMarketing/Publication")
    }, (err) => {

      this.showToast('danger','FAILURE','Could not create Publication');
    }
  )
}






open22Supp(dialog: TemplateRef<any>) {
  this.dialogService.open(dialog);
}

cancelProcess2(dialogCancel: TemplateRef<any>) {
  this.dialogService.open(dialogCancel);
}


  // Cancel Select   persona
  cancelSelectionPersona(persona) {
    this.selectedPersonas.splice(this.selectedPersonas.indexOf(persona), 1);
    this.personas.push(persona);
  }



// Select Partner
selectPersona(selectedPersna): void {

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

          this.publication.content = this.fb;
        });
      })
    )
    .subscribe(url => {
      if (url) {

      }
    });
}


 





}
