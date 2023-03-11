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
import {PersonaService} from './../../../services/persona.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import { Persona } from '../../../models/persona';



@Component({
  selector: 'ngx-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.scss']
})
export class EditPersonaComponent implements OnInit {

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


  constructor(private router: Router, private personaservice: PersonaService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.PersonaGroup = new FormGroup({
      
      nom: new FormControl('') ,
      prenom: new FormControl('') ,
     
      gender: new FormControl(''),
      dateofBirth : new FormControl('') ,
      situation: new FormControl('') ,
      job: new FormControl(''),
  
      age: new FormControl(''),
     
      numberOfChildren : new FormControl('') ,
      nationality : new FormControl('') ,
   
     
      image: new FormControl('') ,
      email: new FormControl('') ,
      phone: new FormControl('') ,
      localisation: new FormControl(''),
      adresse : new FormControl(''),
      personality: new FormControl('')  ,
      frustrations: new FormControl('')  ,
      bio: new FormControl('')  ,
      goals: new FormControl('') ,
      
      interset: new FormControl(''),
      languages: new FormControl('')  ,
      technologie: new FormControl('') ,
    
      softSkills: new FormControl('') ,
    
      hardSkills: new FormControl('') ,
    
      //motivation: new FormControl(''),
    
      description: new FormControl('')  ,



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


  ngOnInit(): void {
    this.countries = GoogleCountries;

    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.personaservice.getPersonaById(this.idUri).subscribe(data => {
      this.persona = data;
      error => console.log(error);
    });
  }

 
  updatePersona() {
    if (this.fb) {
      this.persona.image = this.fb;
    }
    

    this.personaservice.updatePersona(this.persona).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Persona Updated !!');

        this.router.navigateByUrl('/communicationMarketing/DetailsPersona/'+this.idUri);
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




}
