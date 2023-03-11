import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Supplier} from "../../../models/supplier/supplier";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import {SupplierService} from "../../../services/supplier/supplier.service";
import countries from '../../../countries.json';
import moment from 'moment';
import emailjs from "@emailjs/browser";

@Component({
  selector: 'ngx-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrls: ['./list-suppliers.component.scss']
})
export class ListSuppliersComponent implements OnInit {

  countries: any [] = [];
  current: number = 1;
  search: string = '';
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  pageSize: number = 3;
  dataSuppliers: Supplier [] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  user;
  templateParams;
  loading = false;

  constructor(private supplierService: SupplierService,
              private router: Router, private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private exportService: ExportService) { }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure you would like to archive this supplier?'});
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.dataSuppliers = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === true
            && data[s].addedBy?.company === this.user.company) {
            this.dataSuppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllSuppliersASC() {
    this.supplierService.getAllSuppliersASC().subscribe(
      (data: Supplier[]) => {
        this.dataSuppliers = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === true
            && data[s].addedBy?.company === this.user.company) {
            this.dataSuppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllSuppliersDESC() {
    this.supplierService.getAllSuppliersDESC().subscribe(
      (data: Supplier[]) => {
        this.dataSuppliers = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === true
            && data[s].addedBy?.company === this.user.company) {
            this.dataSuppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
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
              d.supplierCountry === e &&
              d.supplierState === true && d.addedBy?.company === this.user.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getSuppliersByDate(e) {
    this.filterBySupplierDate(e);
  }

  filterBySupplierDate(e) {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.dataSuppliers = [];
        this.dataSuppliers = data.filter(
          (d =>
              this.moment(d.supplierCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.supplierState === true && d.addedBy?.company === this.user.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataSuppliers, 'Suppliers');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  onArchiveConfirm(supplier: Supplier, ref) {
    this.supplierService.archiveSupplier(supplier.supplierId).subscribe(
      () => {
        this.showToast('Supplier archived!!' , this.positions.TOP_RIGHT, 'success');
        this.dataSuppliers.splice(this.dataSuppliers.indexOf(supplier), 1);
        ref.close();
      });
  }

  inviteToChat(supplier: Supplier) {
    this.loading = true;
    setTimeout(() => this.loading = false, 4000);
    this.templateParams = {
      supplierFirstName: supplier.supplierFirstName,
      supplierLastName: supplier.supplierLastName,
      supplierEmail: supplier.supplierEmail,
      user: this.user.email
    };
    emailjs.send('gmail', 'manazelloChatPIM', this.templateParams, 'hKe5Q_wImlLCq22-s')
      .then(() => {
        this.showToast('Supplier invited to meet.' , this.positions.TOP_RIGHT, 'success');
      }, (error) => {
        this.showToast('Could not invite supplier.' , this.positions.TOP_RIGHT, 'danger');
      });
  }

  ngOnInit(): void {
    this.countries = countries;
    this.getAllSuppliers();
    this.user = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
