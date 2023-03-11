import { Component, Input, OnInit } from '@angular/core';
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
import { Persona} from './../../../models/persona';
import {PersonaService} from './../../../services/persona.service'; 
import Swal from 'sweetalert2';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import {Directive} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
@Component({
  selector: 'ngx-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss']
})
export class AddPersonaComponent implements OnInit {
/*


  persona: Persona = new Persona();
  PersonaGroup: FormGroup;
  idUri ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  existedPersona: Persona;
  countries : any [] = [];
  
  
  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  
  constructor(private router: Router, private personaService: PersonaService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.PersonaGroup = new FormGroup({
      
      age: new FormControl(''),
      localisation: new FormControl(''),
      motivation: new FormControl(''),
      interset: new FormControl(''),
      gender: new FormControl(''),
      job: new FormControl(''),
      situation: new FormControl('') ,
      technologie: new FormControl('') ,
      goals: new FormControl('') ,
      softSkills: new FormControl('') ,
      hardSkills: new FormControl('') ,

      description: new FormControl('')  ,
      title: new FormControl('') ,
      nom: new FormControl('') ,
      prenom: new FormControl('') ,
      image: new FormControl('') ,
      email: new FormControl('') 


  
    });
  }
  
  get nom() {
    return this.PersonaGroup.get('nom');
  }

  get prenom() {
    return this.PersonaGroup.get('prenom');
  }
  get image() {
    return this.PersonaGroup.get('image');
  }
  get email() {
    return this.PersonaGroup.get('email');
  }
  
  get age() {
    return this.PersonaGroup.get('age');
  }
  get localisation() {
    return this.PersonaGroup.get('localisation');
  }

  get motivation() {
    return this.PersonaGroup.get('motivation');
  }

  get interset () {
    return this.PersonaGroup.get('interset');
  }

  get gender() {
    return this.PersonaGroup.get('gender');
  }

  get job() {
    return this.PersonaGroup.get('job');
  }

  get situation() {
    return this.PersonaGroup.get('situation');
  }

  get technologie() {
    return this.PersonaGroup.get('technologie');
  }

  get title() {
    return this.PersonaGroup.get('title');
  }


  get goals() {
    return this.PersonaGroup.get('goals');
  }
   
 
  get softSkills() {
    return this.PersonaGroup.get('softSkills');
  }
   
  get hardSkills() {
    return this.PersonaGroup.get('hardSkills');
  }
  
  
  
  
  ngOnInit(): void {
    this.countries = GoogleCountries;

  
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
  

  addPersonaFunction() {
    this.persona.image = this.fb;


    this.personaService.addPersona(this.persona).subscribe(result => {
   

        this.showToast('success', 'Add ! ', 'Persona Added !!');
        this.router.navigateByUrl('/communicationMarketing/Persona').then(() => {
          this.router.navigate(['/communicationMarketing/Persona']);
        });

      },
      (err) => {
        this.showToast("danger", "Add ! ", err.error.message);


      },
    );
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
          this.persona.image = this.fb;
         
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log('url', url);
      }
    });
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
@Input() c: Persona;
pageSize = 10;
persona: Persona = new Persona();
PersonaGroup : FormGroup = new FormGroup({});
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
Skills_form: FormGroup = new FormGroup({});
description_form: FormGroup = new FormGroup({});

countries : any [] = [];

downloadURL: Observable<string>;
selectedItem: string= "";

PersonaForm : FormGroup ;
personaId: String;
constructor(private router: Router, private personaService: PersonaService,
  private toastrService: NbToastrService, private storage: AngularFireStorage,
  private windowService: NbWindowService,) {

  this.PersonaGroup = new FormGroup({
    nom: new FormControl('' ,  [Validators.pattern("^[a-zA-Z ]*")]) ,
    prenom: new FormControl('' ,  [Validators.pattern("^[a-zA-Z ]*")]) ,
   
    gender: new FormControl('' ,   [Validators.required]),
    dateofBirth : new FormControl(''  , [Validators.required]) ,
    situation: new FormControl(''  , [Validators.required]) ,
    job: new FormControl('' , [Validators.pattern("^[a-zA-Z ]*")]),

    age: new FormControl('' ,  [Validators.pattern("^[0-9]*$")]),
   
    numberOfChildren : new FormControl('' , [Validators.pattern("^[0-9]*$")]) ,
    nationality : new FormControl('' ,   [Validators.pattern("^[a-zA-Z ]*")]) ,
 
   
    image: new FormControl(''  , [Validators.required]) ,
  
    contact_form: new FormGroup({

      email: new FormControl('') ,
      phone: new FormControl('') ,
      localisation: new FormControl(''),
      adresse : new FormControl(''),
     
     }),

 description_form: new FormGroup({
  personality: new FormControl('')  ,
  frustrations: new FormControl('')  ,
  bio: new FormControl('')  ,
  goals: new FormControl('') ,
  
  interset: new FormControl(''),
 
 }),

 Skills_form: new FormGroup({

 

  languages: new FormControl('')  ,
  technologie: new FormControl('') ,

  softSkills: new FormControl('') ,

  hardSkills: new FormControl('') ,

  //motivation: new FormControl(''),

  description: new FormControl('')  ,

}),



});


 this.PersonaForm =   new FormGroup({
  personaId : new FormControl(''),

});


}

get nationality() {
  return this.PersonaGroup.get('nationality');
}




get description() {
  return this.PersonaGroup.get('description');
}


get bio() {
  return this.PersonaGroup.get('bio');
}



get frustrations() {
  return this.PersonaGroup.get('frustrations');
}



get personality() {
  return this.PersonaGroup.get('personality');
}


get languages() {
  return this.PersonaGroup.get('languages');
}


get numberOfChildren() {
  return this.PersonaGroup.get('numberOfChildren');
}


get dateofBirth() {
  return this.PersonaGroup.get('dateofBirth');
}

get nom() {
  return this.PersonaGroup.get('nom');
}

get prenom() {
  return this.PersonaGroup.get('prenom');
}
get image() {
  return this.PersonaGroup.get('image');
}
get email() {
  return this.PersonaGroup.get('email');
}

get age() {
  return this.PersonaGroup.get('age');
}
get localisation() {
  return this.PersonaGroup.get('localisation');
}

get motivation() {
  return this.PersonaGroup.get('motivation');
}

get interset () {
  return this.PersonaGroup.get('interset');
}

get gender() {
  return this.PersonaGroup.get('gender');
}

get job() {
  return this.PersonaGroup.get('job');
}

get situation() {
  return this.PersonaGroup.get('situation');
}

get technologie() {
  return this.PersonaGroup.get('technologie');
}

get title() {
  return this.PersonaGroup.get('title');
}


get goals() {
  return this.PersonaGroup.get('goals');
}
 

get softSkills() {
  return this.PersonaGroup.get('softSkills');
}
 
get hardSkills() {
  return this.PersonaGroup.get('hardSkills');
}





onContactFormSubmit() {
  console.log("test")
  this.contact_form.markAsDirty();
}


onSkillsFormSubmit() {
  console.log("Skills")
  this.Skills_form.markAsDirty();
}


onDescriptionFormSubmit() {
  console.log("test")
  this.description_form.markAsDirty();
}






ngOnInit(): void {

  this.countries = GoogleCountries;


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

          this.persona.image = this.fb;
        });
      })
    )
    .subscribe(url => {
      if (url) {

      }
    });
}

addPatnerFunction() {
  this.persona.image = this.fb;
  console.log(this.persona);
  this.personaService.addPersona(this.persona).subscribe(result => {
    console.log(result)
    this.showToast('success', 'Add ! ', 'Partner Added !!');
    this.router.navigateByUrl('/communicationMarketing/Persona');
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



getSelectedPersona(event) {

  this.selectedItem=event ;
  console.log(this.selectedItem);

}



  

}
