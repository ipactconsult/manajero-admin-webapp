import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Avocat } from '../../../models/Avocat';
import { AvocatService } from '../../../services/avocat/avocat.service';

@Component({
  selector: 'ngx-create-avocat',
  templateUrl: './create-avocat.component.html',
  styleUrls: ['./create-avocat.component.scss']
})
export class CreateAvocatComponent implements OnInit {

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
  @Input() c: Avocat;
  pageSize = 10;
  avocat: Avocat = new Avocat();
  avocatGroup: FormGroup = new FormGroup({});
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



  downloadURL: Observable<string>;
  options = [
    { key: 1, value: 'Real estate law' },
    { key: 2, value: 'Criminal law of business affairs' },
    { key: 3, value: 'Right of persons' },
  ];
  createAvocat: FormGroup;


  constructor(private router: Router, private cs: AvocatService,
    private toastrService: NbToastrService, private storage: AngularFireStorage,
    private windowService: NbWindowService,) {

    this.avocatGroup = new FormGroup({
      nom: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      prenom: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      imageUrl: new FormControl(''),
      specialite: new FormControl(''),
      adresse: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      dateofBirth: new FormControl(''),
      description: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      disponabilite: new FormControl(''),
      contact_form: new FormGroup({
        gmail: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        secondEmail: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        numtelephone: new FormControl('', [Validators.pattern("^[0-9]*$")] ),
        secondPhone: new FormControl('', [Validators.pattern("^[0-9]*$")] ),
      }),



    });
  }

  get nom() {
    return this.avocatGroup.get('nom');
  }

  get prenom() {
    return this.avocatGroup.get('prenom');
  }

  get imageUrl() {
    return this.avocatGroup.get('imageUrl');
  }

  get specialite() {
    return this.avocatGroup.get('specialite');
  }

  get adresse() {
    return this.avocatGroup.get('adresse');
  }

  get dateofBirth() {
    return this.avocatGroup.get('dateofBirth');
  }

  get description() {
    return this.avocatGroup.get('description');
  }

  get numtelephone() {
    return this.avocatGroup.get('numtelephone');
  }
  get gmail() {
    return this.avocatGroup.get('gmail');
  }
  get secondEmail() {
    return this.avocatGroup.get('secondEmail');
  }
  get secondPhone() {
    return this.avocatGroup.get('secondPhone');
  }
 
  
  get disponabilite() {
    return this.avocatGroup.get('disponabilite');
  }





  onAvocatFormSubmit() {
    this.avocatGroup.markAsDirty();
  }


  onContactFormSubmit() {
    console.log("test")
    this.contact_form.markAsDirty();
  }






  ngOnInit(): void {
    //employees data


  }



  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `avocats/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`avocats/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }

            this.avocat.imageUrl = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }

  addAvocatFunction() {
    this.avocat.imageUrl = this.fb;
    console.log(this.avocat);
    this.cs.addAvocat(this.avocat).subscribe(result => {
      console.log(result)
      this.showToast('success', 'Add ! ', 'Lawyer Added !!');
      this.router.navigateByUrl('/litige/listavocats').then(() => {
        this.router.navigate(['/litige/listavocats']);
      });
    },
      (err) => {
        console.log(err)
        this.showToast('danger', 'Erreur ! ', err);
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
