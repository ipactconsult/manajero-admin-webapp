import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../../shared/exports/export.service";
import {Material} from "../../../../models/material/material";
import {MaterialService} from "../../../../services/material/material.service";
import {Category} from "../../../../models/category/category";
import {CategoryService} from "../../../../services/category/category.service";
import moment from "moment";

@Component({
  selector: 'ngx-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.scss']
})
export class ListMaterialsComponent implements OnInit {

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
  dataMaterials: Material [] = [];
  dataCategories: Category[] = [];
  positions = NbGlobalPhysicalPosition;
  pageSize: number = 6;
  userConnected;
  moment: any = moment;

  constructor(private materialService: MaterialService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService,
              private categoryService: CategoryService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true
            && data[m].addedBy?.company === this.userConnected.company) {
            this.dataMaterials.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.dataCategories = [];
        for (let c = 0; c < data.length; c++) {
          if (data[c].categoryState === true
            && data[c].addedBy?.company === this.userConnected.company) {
            this.dataCategories.push(data[c]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllMaterialsASC() {
    this.materialService.getAllMaterialsASC().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true
            && data[m].addedBy?.company === this.userConnected.company) {
            this.dataMaterials.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllMaterialsDESC() {
    this.materialService.getAllMaterialsDESC().subscribe(
      (data: Material[]) => {
        this.dataMaterials = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].materialState === true
            && data[m].addedBy?.company === this.userConnected.company) {
            this.dataMaterials.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
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
              d.materialType === e &&
              d.materialState === true && d.addedBy?.company === this.userConnected.company
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
              d.materialCategory.categoryName === e &&
              d.materialState === true && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataMaterials, 'dataMaterials');
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure you would like to archive this material?'});
  }

  onArchiveConfirm(material, ref) {
    this.materialService.archiveMaterial(material.materialId).subscribe(
      () => {
        this.showToast('Material archived!!' , this.positions.TOP_RIGHT, 'success');
        this.dataMaterials.splice(this.dataMaterials.indexOf(material), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllCategories();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
