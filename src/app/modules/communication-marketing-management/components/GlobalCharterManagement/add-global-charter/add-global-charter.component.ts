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
import { GlobalCharter} from './../../../models/global-charter';
import {GlobalCharterService} from './../../../services/global-charter.service'; 
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';






import {Component, Input, OnInit, TemplateRef} from '@angular/core';


@Component({
  selector: 'ngx-add-global-charter',
  templateUrl: './add-global-charter.component.html',
  styleUrls: ['./add-global-charter.component.scss']
})
export class AddGlobalCharterComponent implements OnInit {

 

  globalCharter: GlobalCharter = new GlobalCharter();
  globalCharterGroup: FormGroup;
idUri ;
index = 1;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
existedGlobalCharter: GlobalCharter;
countries : any [] = [];


titleFirebase = 'fire-base-angular';
selectedFile: File = null;
fb;
fb2;
downloadURL: Observable<string>;

PersonaForm : FormGroup ;
selectedItem: string= "";
constructor(private router: Router, private globalCharterService: GlobalCharterService, private storage: AngularFireStorage,
            private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
            private windowService: NbWindowService) {
  this.globalCharterGroup = new FormGroup({
    
    title: new FormControl(''),
  
    module : new FormControl(''),
    description : new FormControl('') ,
    file : new FormControl('') ,
    logo : new FormControl('') ,
    typo : new FormControl(''),
    couleurs : new FormControl('') ,
    icon : new FormControl(''),
    template : new FormControl(''),

 });




}

   
get template() {
  return this.globalCharterGroup.get('template');
}


   
get title() {
  return this.globalCharterGroup.get('title');
}


get module() {
  return this.globalCharterGroup.get('module');
}
  



get description() {
  return this.globalCharterGroup.get('description');
}

get file () {
  return this.globalCharterGroup.get('file');
}

get logo() {
  return this.globalCharterGroup.get('logo');
}

get typo() {
  return this.globalCharterGroup.get('typo');
}

get couleurs() {
  return this.globalCharterGroup.get('couleurs');
}

get icon() {
  return this.globalCharterGroup.get('icon');
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









  








addGlobalCharterFunction() {

  //this.globalCharter.logo = this.fb2;
  this.globalCharter.logo = this.fb;
  this.globalCharter.template = this.fb;
  this.globalCharter.templateName = this.filename;

  this.globalCharterService.addGlobalCharter(this.globalCharter).subscribe(result => {
            this.showToast("success", "Add ! ", " Charter  Added !!");
            this.router.navigateByUrl('/communicationMarketing/GlobalCharter').then(() => {
              this.router.navigate(['/communicationMarketing/GlobalCharter']);
            }); },
    (err) => {
                  this.showToast("danger", "Add ! ", err.error.message);
             },
  );
}


ngOnInit(): void {
  this.countries = GoogleCountries;

}


image ='';
type ='';
filename ='';
onFileSelected(event) {
  const n = Date.now();
  const file = event.target.files[0];


  console.log(this.type)
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

          this.globalCharter.logo = this.fb;
        });
      })
    )
    .subscribe(url => {
      if (url) {

      }
    });
}



onTemplateSelected(event) {
  const n = Date.now();
  const file = event.target.files[0];
  this.type =  event.target.files[0].type ;
  this.filename =  event.target.files[0].name ;
  console.log(this.filename)
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
            this.fb2 = url;
          }

          this.globalCharter.template = this.fb2;
        });
      })
    )
    .subscribe(url => {
      if (url) {

      }
    });
}


}





