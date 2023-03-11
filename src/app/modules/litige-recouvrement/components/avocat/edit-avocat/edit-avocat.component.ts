import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Avocat } from '../../../models/Avocat';
import { AvocatService } from '../../../services/avocat/avocat.service';

@Component({
  selector: 'ngx-edit-avocat',
  templateUrl: './edit-avocat.component.html',
  styleUrls: ['./edit-avocat.component.scss']
})
export class EditAvocatComponent implements OnInit {

  countries: any [] = [];
  avocat: Avocat = new Avocat();
  avocatGroup: FormGroup;
  idUri = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  selectedGender;

  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  employeeToStore: any;
  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  options = [
    {key: 1, value: 'Real estate law'},
    {key: 2, value: 'Criminal law of business affairs'},
    {key: 3, value: 'Right of persons'},
  ];

  constructor(private router: Router, private cs: AvocatService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute
              ,) {
    this.avocatGroup = new FormGroup({
      nom: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      prenom: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      imageUrl: new FormControl(''),
      specialite: new FormControl(''),
      adresse: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      dateOfBirth: new FormControl(''),
      description: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
        gmail: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        secondEmail: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        numtelephone: new FormControl('', [Validators.pattern("^[0-9]*$")] ),
        secondPhone: new FormControl('', [Validators.pattern("^[0-9]*$")] ),
  })
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
    
    get dateOfBirth() {
    return this.avocatGroup.get('dateOfBirth');
    }
    
    
    get gmail() {
    return this.avocatGroup.get('gamil');
    }
    
    get description() {
    return this.avocatGroup.get('description');
    }
    
    get numtelephone() {
    return this.avocatGroup.get('numtelephone');
    }
    
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });
    this.cs.getAvocatById(this.idUri).subscribe(data => {
      this.avocat = data;
       // @ts-ignore
      error => console.log(error);
    });



    
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
            console.log('fb', this.fb);
            this.avocat.imageUrl = this.fb;

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  updateAvocatFunction() {

    this.cs.updateAvocat(this.avocat,this.idUri).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Lawyer Updated !!');
        this.router.navigateByUrl('/litige/detailavocat/' + this.idUri, {skipLocationChange: true});
      },
      (err) => {
            this.showToast('danger', 'Update ! ', err.toString());


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
