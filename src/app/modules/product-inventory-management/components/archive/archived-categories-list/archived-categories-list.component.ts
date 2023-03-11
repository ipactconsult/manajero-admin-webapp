import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category} from "../../../models/category/category";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Material} from "../../../models/material/material";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import moment from 'moment';

@Component({
  selector: 'ngx-archived-categories-list',
  templateUrl: './archived-categories-list.component.html',
  styleUrls: ['./archived-categories-list.component.scss']
})
export class ArchivedCategoriesListComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  category: Category = new Category();
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  pageSize: number = 3;
  dataCategories: Category[] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  materials: Material[] = [];
  exportExcelMsg: String;
  exportExcelStatus: String;
  constructor(private categoryService: CategoryService, private dialogService: NbDialogService, 
              private router: Router, private windowService: NbWindowService, 
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

  getAllArchivedCategories() {
     this.categoryService.getAllCategories().subscribe(
      (data: Category[])=> {
                for (let c = 0; c < data.length; c++) {
                  if (data[c].categoryState === false) {
                    this.dataCategories.push(data[c]);
                  }
                }
                if (this.dataCategories.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
    }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllArchivedCategoriesASC() {
    this.categoryService.getAllCategoriesASC().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
                for (let c = 0; c < data.length; c++) {
                  if (data[c].categoryState === false) {
                    this.dataCategories.push(data[c]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllArchivedCategoriesDESC() {
    this.categoryService.getAllCategoriesDESC().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
                for (let c = 0; c < data.length; c++) {
                  if (data[c].categoryState === false) {
                    this.dataCategories.push(data[c]);
                  }
                }
          },(err)=> {
              return err;
          }
    );    
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onRestoreConfirm(category: Category, ref) {
    this.categoryService.restoreCategory(category.categoryId).subscribe(
      () => {
        this.showToast('Category Restored!!' , this.positions.TOP_RIGHT, 'success');
        this.dataCategories.splice(this.dataCategories.indexOf(category), 1);
        ref.close();
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataCategories, 'Archived Categories');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  ngOnInit(): void {
    this.getAllArchivedCategories();
  }

}
