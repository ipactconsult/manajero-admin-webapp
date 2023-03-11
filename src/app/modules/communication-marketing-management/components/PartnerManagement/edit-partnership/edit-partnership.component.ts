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
import {Parternership} from './../../../models/parternership';
import {ParternershipService} from './../../../services/parternership.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-edit-partnership',
  templateUrl: './edit-partnership.component.html',
  styleUrls: ['./edit-partnership.component.scss']
})
export class EditPartnershipComponent implements OnInit {




  parternership: Parternership = new Parternership();
  parternershipGroup: FormGroup;
  idUri ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  existedParternership: Parternership;
  countries : any [] = [];

  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;


  constructor(private router: Router, private parternershipService: ParternershipService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.parternershipGroup = new FormGroup({
      
      idParternership: new FormControl(''),
      parternershipName: new FormControl(''),
      parternershipLogo: new FormControl(''),
      parternershipDomain: new FormControl(''),
      parternershipWebSiteLink: new FormControl(''),
      parternershipEmail: new FormControl(''),
      parternershipAdresse: new FormControl('') ,
      parternershipLinkedin: new FormControl('') ,
      parternershipPhone: new FormControl('') ,
      country: new FormControl('') ,
      description: new FormControl('') ,



    });
  }
  


  get idParternership() {
    return this.parternershipGroup.get('idParternership');
  }
  get parternershipName() {
    return this.parternershipGroup.get('parternershipName');
  }

  get parternershipLogo() {
    return this.parternershipGroup.get('parternershipLogo');
  }

  get parternershipDomain () {
    return this.parternershipGroup.get('parternershipDomain');
  }

  get parternershipEmail() {
    return this.parternershipGroup.get('parternershipEmail');
  }

  get parternershipWebSiteLink() {
    return this.parternershipGroup.get('parternershipWebSiteLink');
  }

  get parternershipAdresse() {
    return this.parternershipGroup.get('parternershipAdresse');
  }

  get parternershipPhone() {
    return this.parternershipGroup.get('parternershipPhone');
  }


  get parternershipLinkedin() {
    return this.parternershipGroup.get('parternershipLinkedin');
  }
   
  

  get country() {
    return this.parternershipGroup.get('country');
  }
   
  get description() {
    return this.parternershipGroup.get('description');
  }
   

  ngOnInit(): void {
    this.countries = GoogleCountries;

    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.parternershipService.getPartnerById(this.idUri).subscribe(data => {
      this.parternership = data;
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
            this.parternership.parternershipLogo = this.fb;
           
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  updatePartnerFunction() {
    this.parternershipService.updateParternership(this.parternership).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Partner Updated !!');

        this.router.navigateByUrl('/communicationMarketing/DetailsPartnership/'+this.idUri, {skipLocationChange:true});
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







}
