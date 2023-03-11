import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { Litige } from '../../../models/Litige';
import { LitigeService } from '../../../services/litige/litige.service';

@Component({
  selector: 'ngx-create-litige',
  templateUrl: './create-litige.component.html',
  styleUrls: ['./create-litige.component.scss']
})
export class CreateLitigeComponent implements OnInit {
  createLitigeProject: FormGroup;
  @Input() c: Litige;
  categorie: Litige = new Litige();
  constructor(private router: Router,
     private cs: LitigeService,
     private fb: FormBuilder,
     private toastrService: NbToastrService
     ) { }
     index = 1;
     destroyByClick = true;
     duration = 2000;
     hasIcon = true;
     position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
     preventDuplicates = false;


  ngOnInit(): void {

    const formcontrols = {
      typelitige: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      date:new FormControl("", [Validators.required]),
      statut :new FormControl("", [Validators.required]),
      nouvelledatechance :new FormControl("", [Validators.required]),
      
    };
    this.createLitigeProject = this.fb.group(formcontrols);

  }
  optionsdis : string [] =[
      'Quality dispute',
     'Price dispute',
     'Litige administratif',
     'Event date dispute',
     'Missing equipment dispute',
     'Double billing dispute'
  ];
  options : string [] =[
  
   'NonRésolu',
];

  selectedOption = this.options['NonRésolu'];

  onMenuItemSelected(selectedOne) {
    console.log(selectedOne);
    this.selectedOption = selectedOne;
  }

  createLitige() {
    const data = this.createLitigeProject.value;
    this.cs.addLitige(data).subscribe(
      (res) => {
        
        this.showToast('success', 'SUCCESS', 'Created Successfuly'); 
        this.router.navigate(['/litige/listlitige']);

      },
      
      (err) => {
        this.showToast("danger", "Failed", "Creation Dispute failed!");

        this.router.navigate(['/litige/listlitige']);
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
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }

}
