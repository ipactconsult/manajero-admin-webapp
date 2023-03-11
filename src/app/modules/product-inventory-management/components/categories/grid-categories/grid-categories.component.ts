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
  selector: 'ngx-grid-categories',
  templateUrl: './grid-categories.component.html',
  styleUrls: ['./grid-categories.component.scss']
})
export class GridCategoriesComponent implements OnInit {

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
  pageSize: number = 6;
  dataCategories: Category[] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  materials: Material[] = [];
  userConnected;
  constructor(private categoryService: CategoryService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllCategoriesASC() {
    this.categoryService.getAllCategoriesASC().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllCategoriesDESC() {
    this.categoryService.getAllCategoriesDESC().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllCategoriesASCRef() {
    this.categoryService.getAllCategoriesASCRef().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllCategoriesDESCRef() {
    this.categoryService.getAllCategoriesDESCRef().subscribe(
      (data: Category[])=> {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getCategoriesByDate(e) {
    this.filterByDate(e);
  }

  filterByDate(e) {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.dataCategories = [];
        this.dataCategories = data.filter(
          (d =>
              this.moment(d.categoryCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.categoryState === true && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onArchiveConfirm(category: Category, ref) {
    this.categoryService.archiveCategory(category.categoryId).subscribe(
      () => {
        this.showToast('Category archived!!' , this.positions.TOP_RIGHT, 'success');
        this.dataCategories.splice(this.dataCategories.indexOf(category), 1);
        ref.close();
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataCategories, 'Categories');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
