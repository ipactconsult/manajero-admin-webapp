import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import { Observable } from 'rxjs';
import {Publication} from './../../../models/publication';
import {PublicationService} from './../../../services/publication.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PersonaService } from 'app/modules/communication-marketing-management/services/persona.service';
import { Persona } from 'app/modules/communication-marketing-management/models/persona';

@Component({
  selector: 'ngx-edit-product-personas',
  templateUrl: './edit-product-personas.component.html',
  styleUrls: ['./edit-product-personas.component.scss']
})
export class EditProductPersonasComponent implements OnInit {

 product:any ; 
 productId:any;

  publication: Publication = new Publication();
  productGroup: FormGroup;
  idUri='' ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  existedPublication : Publication;


  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  

selectedPersonaName = '';
selectedPersona;
personas: Persona[] = [];
selectedPersonas: Persona[] = [];

 

  constructor(private router: Router, private personaService: PersonaService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService ,   private dialogService: NbDialogService) {
    this.productGroup = new FormGroup({
      /*
      title: new FormControl('' , [Validators.pattern("^[a-zA-Z ]*")]),
      description: new FormControl(''),
      hastag: new FormControl(''),
      content: new FormControl(''),
      briefingType: new FormControl(''),
      tags: new FormControl(''),
      socialMedia: new FormControl('') ,
      dateDebut: new FormControl('') ,
      dateFin: new FormControl('') ,
      type: new FormControl('') ,*/


    });
  }
  
/*

  get title() {
    return this.publicationGroup.get('title');
  }
  get description() {
    return this.publicationGroup.get('description');
  }

  get hastag() {
    return this.publicationGroup.get('hastag');
  }

  get content () {
    return this.publicationGroup.get('content');
  }

  get briefingType() {
    return this.publicationGroup.get('briefingType');
  }

  get tags() {
    return this.publicationGroup.get('tags');
  }

  get socialMedia() {
    return this.publicationGroup.get('socialMedia');
  }

  get dateDebut() {
    return this.publicationGroup.get('dateDebut');
  }


  get dateFin() {
    return this.publicationGroup.get('dateFin');
  }
   
  get type() {
    return this.publicationGroup.get('type');
  }
   */

// Initialisation
  ngOnInit(): void {
    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

   /* this.publicationService.getPublicationById(this.idUri).subscribe(data => {
      this.publication = data;
      error => console.log(error);
    });*/

    this.personaService.getPersonas().subscribe(
      (data: Persona[]) => {
        this.personas = data;
       //this.selectedItem= data[0].motivation ;
      } ,
       (err) => {
        console.log(err);
      },
    );

 this.productId = this.router.url.replace('/communicationMarketing/EditProductPersonas/','');


  
  }

  

// upload File 
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
            console.log('fb', this.fb);
            this.publication.content = this.fb;
           
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  //Update Publica  tion
  updateFunction() {
    this.product = { personnas: this.selectedPersonas}
    this.personaService.updateProduct(this.product , this.productId ).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Persona Affected !!');

      //  this.router.navigateByUrl('/CommunicationMarketing/DetailsPartnership/'+this.idUri, {skipLocationChange:true});
      },
      (err) => {
        this.showToast('danger','FAILURE','Could not create Publication');



      },
    );
  }
//Toast Notification 
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
  selectedItem: string= "";

  getSelectedPersona(event) {

    this.selectedItem=event ;
    console.log(this.selectedItem);
 
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

  


}
