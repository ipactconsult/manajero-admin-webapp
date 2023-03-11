import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { CategorieDoc } from '../../../models/CategorieDoc';
import { CategorieService } from '../../../services/categorie/categorie.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'ngx-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  createProjectCharterform: FormGroup;
  @Input() c: CategorieDoc;

  config : NbToastrConfig;
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  categorie : CategorieDoc;
  id: string;
  updatecategorie ;
  


  constructor(private ds: CategorieService, private toastrService : NbToastrService,  private fb: FormBuilder,
    private route: ActivatedRoute, private router : Router) { 

     


    }

  
  ngOnInit(): void {
    const formcontrols = {
      categoriename: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      description: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
    };
    this.createProjectCharterform = this.fb.group(formcontrols);
    this.categorie = new CategorieDoc();
    this.id = this.route.snapshot.params["id"];

    this.ds.getCategorieByid(this.id).subscribe(data=>{
      console.log(data)
      this.categorie = data;
    }, error => console.log(error)
    )
  }
  optionsdis : string [] =[
    'Employee documents',
   'Sales law documents',
   'Customer documents',
   'Clauses',
   'Business documents',
 
];


  editCategorie(categoryId: string): void{
    this.updatecategorie ={
      categoriename: this.createProjectCharterform.value.categoriename,
      description: this.createProjectCharterform.value.description,
    };
    this.ds.updateCategorie(categoryId, this.updatecategorie).subscribe(
      (res) => {  
        console.log(res);
        this.showToast('success','SUCESS','Data Updated Successfuly');
        this.categorie = new CategorieDoc();
        this.router.navigate(['/litige/listca']);
    }, (err) => {
        console.log(err);
        this.showToast('danger','FAILURE','Could not Update categorie');
    }
    )
  }

  onSubmit(){
    this.editCategorie(this.categorie.id);
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }


}
