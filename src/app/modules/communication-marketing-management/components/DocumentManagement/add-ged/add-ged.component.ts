import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { Ged } from '../../../models/ged';
import {GedService}  from './../../../services/ged.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'ngx-add-ged',
  templateUrl: './add-ged.component.html',
  styleUrls: ['./add-ged.component.scss']
})
export class AddGedComponent implements OnInit {

 
 
  //@Input() p: Ged;
  pageSize = 10;
  Ged: Ged = new Ged();
  GedGroup: FormGroup;
  newGed = null;
  uuidFile = '';
  Logo = '';


  GedForm: FormGroup;
  hiddenProdForm: Boolean = false;
  disableLastPrev: Boolean = false;



  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  
  constructor(private router: Router, private GedService: GedService,
              private toastrService: NbToastrService,
              private windowService: NbWindowService  , private http: HttpClient  ,
               private storage: AngularFireStorage 
              
              ) {
    this.GedGroup = new FormGroup({

     title: new FormControl('' , [Validators.required]),
     description: new FormControl(''),
     dateCreation: new FormControl(''),
     content: new FormControl('' ),
     contentType: new FormControl('', [Validators.required]),
     fileGed: new FormControl(''),
      });
  }
  
  ngOnInit(): void {
  }
  
  
  get idGED() {
    return this.idGED.get('idGED');
  }

  get title() {
    return this.title.get('title');
  }

  get description() {
    return this.description.get('description');
  }

  get dateCreation() {
    return this.dateCreation.get('dateCreation');
  }

  get content() {
    return this.content.get('https://firebasestorage.googleapis.com/v0/b/communicationmarketing-83ad7.appspot.com/o/GEDs%2F1649598591699?alt=media&token=345092a6-2991-4fc1-81c8-87ab573f82cf');
  }

  get contentType() {
    return this.contentType.get('contentType');
  }


 /* get fileGed () {
    return this.contentType.get('fileGed');
  }*/

  set content(image) {
    this.Ged.content = image;
  }
  

  // Notification
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

 //Add   Document
  addGed() {
    this.Ged.content=this.image;
    this.Ged.contentType = this.type ;
    this.Ged.fileName = this.filename;

    this.GedService.addGED(this.Ged).subscribe(result => {
     
              this.showToast("success", "Add ! ", " Document Added !!");
               window.location.reload();
           },
      (err) => {
},
    );

 }





  
  OnChangeUpload(event): void {
    // tslint:disable-next-line:no-console
    console.log(event);
  }

  downloadURL: Observable<string>;
  selectedFile: File = null;
  image ='';
  type ='';
  filename ='';


  //upload File
  onFileSelected(event)
  {
    const n = Date.now();
    const file = event.target.files[0];
    console.log(event.target.files[0].name)
    this.type =  event.target.files[0].type ;
    this.filename =  event.target.files[0].name ;
    const filePath = `/GEDs/${event.target.files[0].name}_${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/GEDs/${event.target.files[0].name}_${n}`, file);
    
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              
            this.image=url;
              
            }
            console.log('url',url);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url',url);
          
        }
      });



  }










}
