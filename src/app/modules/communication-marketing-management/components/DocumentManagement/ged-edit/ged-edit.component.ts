import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Ged } from '../../../models/ged';
import { GedService } from '../../../services/ged.service';

@Component({
  selector: 'ngx-ged-edit',
  templateUrl: './ged-edit.component.html',
  styleUrls: ['./ged-edit.component.scss']
})
export class GedEditComponent implements OnInit {


  ged : Ged = new Ged();
  GedGroup: FormGroup;
  existedGed: Ged;


  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  
  downloadURL: Observable<string>;

  GedToUpdate;


  constructor(private router: Router, private  gedService: GedService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.GedGroup = new FormGroup({
      idGED: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      content: new FormControl(''),
     

    });
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



  get content() {
    return this.content.get('content');
  }




  idG   ;
  //Initialization 
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      
      this.idG = result.get('idGED');
    }
    
    
    );

    this.gedService.getGedById(this.idG).subscribe(data => {
     // console.log('data result',data)
      
     this.ged = data;


      error => console.log(error);
    });
  }

 


//Edit  GED 

  editGedFunction() {

    this.gedService.updateGED(this.ged).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Document   Added !!');

        this.router.navigateByUrl('/communicationMarketing/comMarketing');
      },
      (err) => {


      },
    );
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

}
