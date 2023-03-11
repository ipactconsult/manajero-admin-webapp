import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import { Observable } from 'rxjs';
import {GlobalCharter} from './../../../models/global-charter';
import {GlobalCharterService} from './../../../services/global-charter.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-edit-global-charter',
  templateUrl: './edit-global-charter.component.html',
  styleUrls: ['./edit-global-charter.component.scss']
})
export class EditGlobalCharterComponent implements OnInit {


  globalCharter: GlobalCharter = new GlobalCharter();
  globalCharterGroup: FormGroup;
  idUri ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  existedGlobalCharter : GlobalCharter;
  countries : any [] = [];
fb2;
  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  filename ='';
  type ='';
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

get template() {
  return this.globalCharterGroup.get('template');
}



  



  ngOnInit(): void {

    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.globalCharterService.getGlobalCharterById(this.idUri).subscribe(data => {
      this.globalCharter = data;
      error => console.log(error);
    });
  }

 
  updateGlobalCharter() {
    this.globalCharter.logo = this.fb;
    this.globalCharter.template = this.fb;
    this.globalCharter.templateName = this.filename;

    this.globalCharterService.updateGlobalCharter(this.globalCharter).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Global Charter Updated !!');

        this.router.navigate(['/communicationMarketing/GlobalCharter']);
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
