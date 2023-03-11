import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import {Publication} from './../../../models/publication';
import {PublicationService} from './../../../services/publication.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'ngx-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.scss']
})
export class EditPublicationComponent implements OnInit {

 

  publication: Publication = new Publication();
  publicationGroup: FormGroup;
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
 

  constructor(private router: Router, private publicationService: PublicationService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.publicationGroup = new FormGroup({
      
      title: new FormControl('' , [Validators.pattern("^[a-zA-Z ]*")]),
      description: new FormControl(''),
      hastag: new FormControl(''),
      content: new FormControl(''),
      briefingType: new FormControl(''),
      tags: new FormControl(''),
      socialMedia: new FormControl('') ,
      dateDebut: new FormControl('') ,
      dateFin: new FormControl('') ,
      type: new FormControl('') ,


    });
  }
  


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
   

// Initialisation
  ngOnInit(): void {
    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.publicationService.getPublicationById(this.idUri).subscribe(data => {
      this.publication = data;
      error => console.log(error);
    });
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
    this.publicationService.updatePublication(this.publication).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Publication Updated !!');

        this.router.navigateByUrl('/CommunicationMarketing/DetailsPartnership/'+this.idUri, {skipLocationChange:true});
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



}
