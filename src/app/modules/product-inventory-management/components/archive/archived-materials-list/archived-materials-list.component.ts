import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Material} from "../../../models/material/material";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Category} from "../../../models/category/category";
import {MaterialService} from "../../../services/material/material.service";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";

@Component({
  selector: 'ngx-archived-materials-list',
  templateUrl: './archived-materials-list.component.html',
  styleUrls: ['./archived-materials-list.component.scss']
})
export class ArchivedMaterialsListComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  material: Material = new Material();
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
  dataMaterials: Material[] = [];
  dataCategories: Category[] = [];
  positions = NbGlobalPhysicalPosition;
  exportExcelMsg: String;
  exportExcelStatus: String;

  constructor(private materialService: MaterialService, private dialogService: NbDialogService,
              private categoryService: CategoryService, private router: Router, 
              private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

  getAllArchivedMaterials() {
     this.materialService.getAllMaterials().subscribe(
      (data: Material[])=> {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].materialState === false) {
                    this.dataMaterials.push(data[m]);
                  }
                }
                if (this.dataMaterials.length === 0) {
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
  
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.dataCategories = data;
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedMaterialsASC() {
    this.materialService.getAllMaterialsASC().subscribe(
      (data: Material[]) => {
        for (let m = 0; m < data.length; m++) {
                  if (data[m].materialState === false) {
                    this.dataMaterials.push(data[m]);
                  }
                }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedMaterialsDESC() {
    this.materialService.getAllMaterialsDESC().subscribe(
      (data: Material[]) => {
        for (let m = 0; m < data.length; m++) {
                  if (data[m].materialState === false) {
                    this.dataMaterials.push(data[m]);
                  }
                }
      }, (err) => {
        return err;
      }
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure you would like to archive this material?'});
  }

  onRestoreConfirm(material: Material, ref) {
    this.materialService.restoreMaterial(material.materialId).subscribe(
      () => {
        this.showToast('Material Restored!!' , this.positions.TOP_RIGHT, 'success');
        this.dataMaterials.splice(this.dataMaterials.indexOf(material), 1);
        ref.close();
      });
  }

  getMaterialsByMaterialType(e) {
    this.filterByMaterialType(e);
  }

  filterByMaterialType(e) {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        this.dataMaterials = data.filter(
          (d =>
              d.materialType === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  getMaterialsByCategory(e) {
    this.filterByCategory(e);
  }
  
  filterByCategory(e) {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        this.dataMaterials = data.filter(
          (d =>
              d.materialCategory === e
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataMaterials, 'Archived Materials');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  ngOnInit(): void {
    this.getAllArchivedMaterials();
    this.getAllCategories();
  }

}
