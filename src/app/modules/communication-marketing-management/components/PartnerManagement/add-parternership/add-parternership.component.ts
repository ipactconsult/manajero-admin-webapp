import { Component, Input, OnInit } from '@angular/core';
import { ParternershipService } from '../../../services/parternership.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Parternership } from '../../../models/parternership';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';




@Component({
  selector: 'ngx-add-parternership',
  templateUrl: './add-parternership.component.html',
  styleUrls: ['./add-parternership.component.scss']
})
export class AddParternershipComponent implements OnInit {
/*

  pageSize = 10;
  parternership: Parternership = new Parternership();
  ParternershipGroup: FormGroup = new FormGroup({});;
  contactGroup: FormGroup = new FormGroup({});; 
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  fb = '';
  downloadURL: Observable<string>;
  countries : any [] = [];
  loading = false;


  constructor(private router: Router, private  parternershipService : ParternershipService,
              private toastrService: NbToastrService,private storage: AngularFireStorage,
              private windowService: NbWindowService) {
    this.ParternershipGroup = new FormGroup({
      parternershipName: new FormControl(''),
      parternershipLogo: new FormControl(''),
      parternershipDomain: new FormControl(''),
      parternershipWebSiteLink: new FormControl(''),
      parternershipLinkedin: new FormControl(''),
      parternershipEmail: new FormControl(''),
      parternershipPhone: new FormControl(''),
      parternershipAdresse: new FormControl(''),
        country: new FormControl(''),
        description: new FormControl(''),

     



    });
  }





  
  get parternershipName() {
    return this.ParternershipGroup.get('parternershipName');
  }


    get parternershipLogo() {
    return this.ParternershipGroup.get('parternershipLogo');
  }

  get parternershipDomain() {
    return this.ParternershipGroup.get('parternershipDomain');
  }

  get parternershipWebSiteLink() {
    return this.ParternershipGroup.get('parternershipWebSiteLink');
  }

  get parternershipEmail() {
    return this.ParternershipGroup.get('contactGroup').get('parternershipEmail');
  }

  get parternershipAdresse() {
    return this.ParternershipGroup.get('parternershipAdresse');
  }

  get parternershipLinkedin() {
    return this.ParternershipGroup.get('parternershipLinkedin');
  }

  get parternershipPhone() {
    return this.ParternershipGroup.get('parternershipPhone');
  }

  get description() {
    return this.ParternershipGroup.get('description');
  }

  get country() {
    return this.ParternershipGroup.get('country');
  }

  onPublicationFormSubmit() {

    this.ParternershipGroup.markAsDirty();
  }


  oncontactFormSubmit() {
    this.ParternershipGroup.markAsDirty();
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
    this.parternership.parternershipLogo = this.fb;


    this.parternershipService.addParternership(this.parternership).subscribe(result => {
   

        this.showToast('success', 'Add ! ', 'Partner Added !!');
        this.router.navigateByUrl('/communicationMarketing/Parternership').then(() => {
          this.router.navigate(['/communicationMarketing/Parternership']);
        });

      },
      (err) => {
        this.showToast("danger", "Add ! ", err.error.message);


      },
    );
  }
 

  onFileSelected(event) {
    this.loading = true;
    this.onFile(event);
    setTimeout(() => this.loading = false, 3000);
  }


  onFile(event) {
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

           this.parternership.parternershipLogo = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }

  ngOnInit(): void {
 
          this.countries = GoogleCountries;
  
    }
  */


    linearMode = true;

    toggleLinearMode() {
      this.linearMode = !this.linearMode;
    }
    prefixPhoneSupp: String = '';
  
    cell1TelInput: any = {
      initialCountry: 'tn',
      autoPlaceholder: 'polite',
      nationalMode: true,
    };
    hasErr: boolean;
    @Input() c: Parternership;
    pageSize = 10;
    parternership: Parternership = new Parternership();
    ParternershipGroup: FormGroup = new FormGroup({});
    selectedGender;
    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    titleFirebase = 'fire-base-angular';
    selectedFile: File = null;
    fb = '';
    contact_form: FormGroup = new FormGroup({});
  
    countries : any [] = [];
  
    downloadURL: Observable<string>;
   
    createAvocat: FormGroup;
  
  
    constructor(private router: Router, private parternershipService: ParternershipService,
      private toastrService: NbToastrService, private storage: AngularFireStorage,
      private windowService: NbWindowService,) {
  
      this.ParternershipGroup = new FormGroup({
        parternershipName: new FormControl('', [Validators.pattern("^[a-zA-Z ]*")]),
        parternershipLogo: new FormControl('' , [Validators.required]),
        parternershipDomain: new FormControl('' , [Validators.pattern("^[a-zA-Z ]*")]),
        parternershipEmail: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        parternershipAdresse: new FormControl(''  , [Validators.required]),
        country: new FormControl('' , [Validators.required]),
        contact_form: new FormGroup({
         
        
          parternershipPhone: new FormControl('' , [Validators.pattern("^[0-9]*$")] ),
       
          description: new FormControl(''),
          parternershipWebSiteLink: new FormControl(''),
          parternershipLinkedin: new FormControl(''),
       
        }),
  
  
  
      });
    }
  
 
  
    get parternershipName() {
      return this.ParternershipGroup.get('parternershipName');
    }
  
  
      get parternershipLogo() {
      return this.ParternershipGroup.get('parternershipLogo');
    }
  
    get parternershipDomain() {
      return this.ParternershipGroup.get('parternershipDomain');
    }
  
    get parternershipWebSiteLink() {
      return this.ParternershipGroup.get('parternershipWebSiteLink');
    }
  
    get parternershipEmail() {
      return this.ParternershipGroup.get('parternershipEmail');
    }
  
    get parternershipAdresse() {
      return this.ParternershipGroup.get('parternershipAdresse');
    }
  
    get parternershipLinkedin() {
      return this.ParternershipGroup.get('parternershipLinkedin');
    }
  
    get parternershipPhone() {
      return this.ParternershipGroup.get('parternershipPhone');
    }
  
    get description() {
      return this.ParternershipGroup.get('description');
    }
  
    get country() {
      return this.ParternershipGroup.get('country');
    }
  
  
  
  // Steeper
    onPatnerFormSubmit() {
      this.ParternershipGroup.markAsDirty();
    }
  
  // Steeper
    onContactFormSubmit() {
      console.log("test")
      this.contact_form.markAsDirty();
    }
  
  
  
  
  
 // Intilisation 
    ngOnInit(): void {
    
      this.countries = GoogleCountries;

  
    }
  
  
  // upload file 
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
  
              this.parternership.parternershipLogo = this.fb;
            });
          })
        )
        .subscribe(url => {
          if (url) {
  
          }
        });
    }
  // Add  Partner
    addPatnerFunction() {
      this.parternership.parternershipLogo = this.fb;
      console.log(this.parternership);
      this.parternershipService.addParternership(this.parternership).subscribe(result => {
        console.log(result)
        this.showToast('success', 'Add ! ', 'Partner Added !!');
        this.router.navigateByUrl('/communicationMarketing/Parternership').then(() => {
          this.router.navigate(['/communicationMarketing/Parternership']);
        });
      },
        (err) => {
          console.log(err)
          this.showToast('danger', 'Erreur ! ', err);
        },
      );
    }
  // Notification Toast
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
