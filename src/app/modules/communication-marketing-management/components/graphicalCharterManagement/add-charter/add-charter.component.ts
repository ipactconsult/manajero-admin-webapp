import { Component, OnInit } from '@angular/core';
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

import {AngularFireStorage} from '@angular/fire/storage';
import { GraphicalCharter } from './../../../models/graphical-charter';
import {GraphicalCharterService} from './../../../services/graphical-charter.service'; 

@Component({
  selector: 'ngx-add-charter',
  templateUrl: './add-charter.component.html',
  styleUrls: ['./add-charter.component.scss']
})
export class AddCharterComponent implements OnInit {

  graphicalCharter: GraphicalCharter = new GraphicalCharter();
  graphicalCharterGroup: FormGroup;
  idUri ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  existedGraphicalCharter :  GraphicalCharter;
  countries : any [] = [];
  

  
  constructor(private router: Router, private graphicalCharterService: GraphicalCharterService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.graphicalCharterGroup = new FormGroup({
      
    
    
      color: new FormControl(''),
      texType: new FormControl(''),
      description: new FormControl(''),
      reference: new FormControl(''),
      formaText: new FormControl(''),
      title: new FormControl(''),

  
  
    });
  }
  
  
     

  get title() {
    return this.graphicalCharterGroup.get('title');
  }

  get color() {
    return this.graphicalCharterGroup.get('color');
  }
  get texType() {
    return this.graphicalCharterGroup.get('texType');
  }

  get description() {
    return this.graphicalCharterGroup.get('description');
  }

  get reference () {
    return this.graphicalCharterGroup.get('reference');
  }

  get formaText() {
    return this.graphicalCharterGroup.get('formaText');
  }


  ngOnInit(): void {
    
  
  }
  

  

  updateChartFunction() {
   this.graphicalCharterService.addGraphicalCharter(this.graphicalCharter).subscribe(result => {
              this.showToast("success", "Add ! ", " Event  Added !!");
              this.router.navigateByUrl('/communicationMarketing/GraphicalCharter').then(() => {
                this.router.navigate(['/communicationMarketing/GraphicalCharter']);
              });


            },
      (err) => {
                    this.showToast("danger", "Add ! ", err.error.message);


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
