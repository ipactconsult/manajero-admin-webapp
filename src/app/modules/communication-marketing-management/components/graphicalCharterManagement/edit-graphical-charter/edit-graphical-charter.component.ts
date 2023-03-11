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
import {GraphicalCharterService} from './../../../services/graphical-charter.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { GraphicalCharter } from '../../../models/graphical-charter';

@Component({
  selector: 'ngx-edit-graphical-charter',
  templateUrl: './edit-graphical-charter.component.html',
  styleUrls: ['./edit-graphical-charter.component.scss']
})
export class EditGraphicalCharterComponent implements OnInit {

  graphicalCharter: GraphicalCharter = new GraphicalCharter();
  graphicalCharterGroup: FormGroup;
  idUri ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  existedGraphicalCharter : GraphicalCharter;
  countries : any [] = [];

  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;


  constructor(private router: Router, private graphicalCharterService: GraphicalCharterService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.graphicalCharterGroup = new FormGroup({
      
      color: new FormControl(''),
      texType: new FormControl(''),
      description: new FormControl(''),
      reference: new FormControl(''),
      FormaText: new FormControl(''),
     



    });
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

  get FormaText() {
    return this.graphicalCharterGroup.get('FormaText');
  }

  



  ngOnInit(): void {

    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.graphicalCharterService.getGraphicalCharterById(this.idUri).subscribe(data => {
      this.graphicalCharter = data;
      error => console.log(error);
    });
  }

 
  updateGraphicalCharter() {
    this.graphicalCharterService.updateGraphicalCharter(this.graphicalCharter).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Graphical Charter Updated !!');

        this.router.navigateByUrl('/CommunicationMarketing/DetailsCharter/'+this.idUri, {skipLocationChange:true});
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
