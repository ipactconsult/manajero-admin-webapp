import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import moment from "moment";
import {MaterialService} from "../../../../services/material/material.service";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Material} from "../../../../models/material/material";
import {CategoryService} from "../../../../services/category/category.service";
import {Category} from "../../../../models/category/category";

@Component({
  selector: 'ngx-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.scss']
})
export class CreateMaterialComponent implements OnInit {
  
  positions = NbGlobalPhysicalPosition;
  selectedMaterialType = '';
  selectedCategory;
  materialForm: FormGroup;
  categoryForm: FormGroup;
  newMaterial;
  newCategory;
  materials: Material[] = [];
  categories: Category[] = [];
  moment: any = moment;
  stockInputHidden: boolean = true;
  minStockVal;
  maxStockVal;
  valueBarcode = "";
  inputBarcodeHidden = true;
  userConnected;

  constructor(private materialService: MaterialService, private categoryService: CategoryService,
              private dialogService: NbDialogService, private toastrService: NbToastrService, 
              private formBuilder: FormBuilder, private router: Router, private location: Location) {
    this.materialForm = formBuilder.group({
      materialType: ['', Validators.required],
      materialName: ['', Validators.required],
      materialCategory: ['', Validators.required],
      minStock: ['', Validators.required],
      maxStock: ['', Validators.required],
      materialBarcode: ['']
    });
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

  selectMaterialType(selectedMaterialType): void {
    this.selectedMaterialType = selectedMaterialType;
    if (this.selectedMaterialType !== 'Service') {
      this.stockInputHidden = false;
      this.minStockVal = '';
      this.maxStockVal = '';
      this.inputBarcodeHidden = false;
    } else {
      this.stockInputHidden = true;
      this.minStockVal = 0;
      this.maxStockVal = 0;
      this.inputBarcodeHidden = true;
    }
  }

  changeMaxStock(maxStock): void {
    if (maxStock.target.value <= 0) {
      this.showToast('Maximum Stock Capacity must be Positive!' , this.positions.TOP_RIGHT, 'danger');
    }
    if (maxStock.target.value > 0 && this.minStockVal > 0 && maxStock.target.value <= this.minStockVal) {
      this.showToast('Maximum Stock Capacity must be Greater than Minimum Stock Capacity!' , this.positions.TOP_RIGHT, 'danger');
    }
  }

  changeMinStock(minStock): void {
    if (minStock.target.value <= 0) {
      this.showToast('Minimum Stock Capacity must be Positive!' , this.positions.TOP_RIGHT, 'danger');
    }
    if (minStock.target.value > 0 && this.maxStockVal > 0 && minStock.target.value >= this.minStockVal) {
      this.showToast('Minimum Stock Capacity must be Less than Maximum Stock Capacity!' , this.positions.TOP_RIGHT, 'danger');
    }
  }
  
  selectCategory(selectedCategory): void {
    this.selectedCategory = selectedCategory
  }

  static getRandomNumberCAT(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "CAT"+result;
  }
  
  createNewCategory(ref): void {
    this.newCategory = {
      categoryCode: CreateMaterialComponent.getRandomNumberCAT(100000, 999999),
      categoryName: this.categoryForm.value.categoryName,
      categoryDesc: this.categoryForm.value.categoryDesc,
      addedBy: this.userConnected
    };
    this.categoryService.addNewCategory(this.newCategory).subscribe(
      () => {
        this.categoryForm.reset();
        this.showToast('Category Created Successfully' , this.positions.TOP_RIGHT, 'success');
        this.categories.push(this.newCategory);
        ref.close();
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      }
    )
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "SKU"+result;
  }

  createNewMaterial(): void {
    this.newMaterial = {
      materialType: this.selectedMaterialType,
      materialName: this.materialForm.value.materialName,
      materialCategory: this.materialForm.value.materialCategory,
      materialBarcode: this.valueBarcode,
      stockAlert: this.materialForm.value.minStock,
      stockMax: this.materialForm.value.maxStock,
      materialSKU: CreateMaterialComponent.getRandomNumber(100000, 999999),
      addedBy: this.userConnected
    };
    this.materialService.createNewMaterial(this.newMaterial).subscribe(
         result => {
           if (result === null) {
             this.showToast('Material Already Exists' , this.positions.TOP_RIGHT, 'danger');
           } else {
             this.materialForm.reset();
             this.showToast('Material Created Successfully' , this.positions.TOP_RIGHT, 'success');
             this.router.navigateByUrl('/pim/procurement/materials');
           }
      }, error => {
          this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
        },
    );
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = [];
      for (let c = 0; c < categories.length; c++) {
        if (categories[c].categoryState === true
          && categories[c].addedBy?.company === this.userConnected.company) {
          this.categories.push(categories[c]);
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

}
