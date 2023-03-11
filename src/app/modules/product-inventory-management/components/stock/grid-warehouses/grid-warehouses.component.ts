import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import moment from 'moment';
import {Warehouse} from "../../../models/warehouse/warehouse";
import {WarehouseService} from "../../../services/warehouse/warehouse.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import countries from '../../../countries.json';

@Component({
  selector: 'ngx-grid-warehouses',
  templateUrl: './grid-warehouses.component.html',
  styleUrls: ['./grid-warehouses.component.scss']
})
export class GridWarehousesComponent implements OnInit {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
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
  warehouses: Warehouse [] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  pageSize: number = 3;
  countries;
  userConnected;

  constructor(private warehouseService: WarehouseService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].warehouseState === true
            && data[m].addedBy?.company === this.userConnected.company) {
            this.warehouses.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllWarehousesASC() {
    this.warehouseService.getAllWarehousesASC().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].warehouseState === true
            && data[m].addedBy?.company === this.userConnected.company) {
            this.warehouses.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllWarehousesDESC() {
    this.warehouseService.getAllWarehousesDESC().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        for (let m = 0; m < data.length; m++) {
          if (data[m].warehouseState === true
            && data[m].addedBy?.company === this.userConnected.company) {
            this.warehouses.push(data[m]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getWarehousesByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        this.warehouses = data.filter(
          (d =>
              this.moment(d.warehouseCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.warehouseState === true && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getWarehousesByCountry(e) {
    this.filterByCountry(e);
  }

  filterByCountry(e) {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        this.warehouses = data.filter(
          (d =>
              d.warehouseCountry === e && d.warehouseState === true
              && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.warehouses, 'Warehouses');
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure you would like to archive this warehouse?'});
  }

  onArchiveConfirm(warehouse, ref) {
    this.warehouseService.archiveWarehouse(warehouse.warehouseId).subscribe(
      () => {
        this.showToast('Warehouse archived!!' , this.positions.TOP_RIGHT, 'success');
        this.warehouses.splice(this.warehouses.indexOf(warehouse), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.getAllWarehouses();
    this.countries = countries;
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
