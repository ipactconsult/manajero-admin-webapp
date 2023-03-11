import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Supplier} from "../../../models/supplier/supplier";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {SupplierService} from "../../../services/supplier/supplier.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import moment from 'moment';
import countries from '../../../countries.json';

@Component({
  selector: 'ngx-archived-suppliers-list',
  templateUrl: './archived-suppliers-list.component.html',
  styleUrls: ['./archived-suppliers-list.component.scss']
})
export class ArchivedSuppliersListComponent implements OnInit {

  countries: any [] = [];
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  supplier: Supplier = new Supplier();
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
  dataSuppliers: Supplier[] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  pageSize: number = 3;
  exportExcelMsg: String;
  exportExcelStatus: String;

  constructor(private supplierService: SupplierService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) { }
  
  getAllArchivedSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === false) {
            this.dataSuppliers.push(data[s]);
          }
        }
        if (this.dataSuppliers.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
    }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedSuppliersASC() {
    this.supplierService.getAllSuppliersASC().subscribe(
      (data: Supplier[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === false) {
            this.dataSuppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedSuppliersDESC() {
    this.supplierService.getAllSuppliersDESC().subscribe(
      (data: Supplier[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === false) {
            this.dataSuppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  getSuppliersByCountry(e) {
    this.filterByCountry(e);
  }
  
  filterByCountry(e) {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.dataSuppliers = [];
        this.dataSuppliers = data.filter(
          (d =>
              d.supplierCountry === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  getSuppliersByDate(e) {
    this.filterByDate(e);
  }
  
  filterByDate(e) {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.dataSuppliers = [];
        this.dataSuppliers = data.filter(
          (d =>
              this.moment(d.supplierCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD')
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataSuppliers, 'Archived Suppliers');
  }
  
  onRestoreConfirm(supplier: Supplier, ref) {
    this.supplierService.restoreSupplier(supplier.supplierId).subscribe(
      () => {
        this.showToast('Supplier Restored!' , this.positions.TOP_RIGHT, 'success');
        this.dataSuppliers.splice(this.dataSuppliers.indexOf(supplier), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.countries = countries;
    this.getAllArchivedSuppliers();
  }

}
