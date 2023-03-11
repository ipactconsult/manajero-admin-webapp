import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import { EventMarketing} from './../../../models/event-marketing';
import {EventMarketingService} from './../../../services/event-marketing.service'; 
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
@Component({
  selector: 'ngx-add-edit-marketing',
  templateUrl: './add-edit-marketing.component.html',
  styleUrls: ['./add-edit-marketing.component.scss']
})
export class AddEditMarketingComponent implements OnInit {


eventMarketing: EventMarketing = new EventMarketing();
EventMarketingGroup: FormGroup;
idUri ;
index = 1;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
existedEventMarketing: EventMarketing;
countries : any [] = [];


titleFirebase = 'fire-base-angular';
selectedFile: File = null;
fb;
downloadURL: Observable<string>;

PersonaForm : FormGroup ;
selectedItem: string= "";
constructor(private router: Router, private eventMarketingService: EventMarketingService, private storage: AngularFireStorage,
            private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
            private windowService: NbWindowService) {
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
    nombre : new FormControl(''  , [Validators.pattern("^[0-9]*$")]) ,
 });


 this.PersonaForm =   new FormGroup({
  listPersona : new FormControl(''),

});



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


 




ngOnInit(): void {
  
  this.countries = GoogleCountries;

  this.activatedroute.paramMap.subscribe(result => {
    this.idUri = result.get('id');
  });

  this.eventMarketingService.getEventById(this.idUri).subscribe(data => {
    this.eventMarketing = data;
    
    error => console.log(error);


  });
}



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
          console.log('fb', this.fb);
          this.eventMarketing.image = this.fb;
         
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log('url', url);
      }
    });
}

updateEventFunction() {
  this.eventMarketingService.updateEvent(this.eventMarketing).subscribe(result => {
      this.showToast('success', 'Update ! ', 'Event Updated !!');

      this.router.navigateByUrl('/communicationMarketing/DetailsEvent/'+this.idUri, {skipLocationChange:true});
    },
    (err) => {


    },
  );
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

getSelectedPersona(event) {

  this.selectedItem=event ;
  console.log(this.selectedItem);

}




}
