import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieDoc } from '../../../models/CategorieDoc';
import { CategorieService } from '../../../services/categorie/categorie.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {
  createProjectCharterform: FormGroup;
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;


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



  @Input() c: CategorieDoc;
  categorie: CategorieDoc = new CategorieDoc();
  constructor(private router: Router,
     private cs: CategorieService,
     private fb: FormBuilder,
     private toastrService: NbToastrService


     ) { }

  ngOnInit(): void {
    const formcontrols = {
      categoriename: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      description: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
    };
    this.createProjectCharterform = this.fb.group(formcontrols);
  }
  

  optionsdis : string [] =[
    'Employee documents',
   'Sales law documents',
   'Customer documents',
   'Clauses',
   'Business documents',
 
];

  create() {
    const data = this.createProjectCharterform.value;
    this.cs.addCategorie(data).subscribe(
      (res) => {
        
        this.showToast('success', 'SUCCESS', 'Created Successfuly'); 
        
        this.router.navigate(['/litige/listca']);

      },

      (err) => {
        this.showToast("danger", "Failed", "Creation Category failed!");

        this.router.navigate(['/litige/listca']);
      },
    );
  }
  
}


