import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import moment from 'moment';
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'ngx-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  categoryForm: FormGroup;
  newCategory;
  moment: any = moment;
  userConnected;

  constructor(private categoryService: CategoryService, private dialogService: NbDialogService, 
              private toastrService: NbToastrService, private formBuilder: FormBuilder, 
              private router: Router, private location: Location) {
    this.categoryForm = formBuilder.group({
      categoryName: ['', Validators.required],
      categoryDesc: ['', Validators.required]
    })
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "CAT"+result;
  }
  
  createNewCategory(): void {
    this.newCategory = {
      categoryName: this.categoryForm.value.categoryName,
      categoryDesc: this.categoryForm.value.categoryDesc,
      categoryCode: CreateCategoryComponent.getRandomNumber(100000, 999999),
      addedBy: this.userConnected
    };
    this.categoryService.addNewCategory(this.newCategory).subscribe(
      (category) => {
        if (category === null) {
          this.showToast('Category Already Exists' , this.positions.TOP_RIGHT, 'danger');
        } else {
          this.categoryForm.reset();
          this.showToast('Category Created Successfully' , this.positions.TOP_RIGHT, 'success');
          this.router.navigateByUrl('/pim/categories');
        }
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      }
    )
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
