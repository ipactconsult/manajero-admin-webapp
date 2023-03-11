import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {WarehouseService} from "../../../services/warehouse/warehouse.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import countries from '../../../countries.json';
import moment from 'moment';

@Component({
  selector: 'ngx-archived-warehouses-list',
  templateUrl: './archived-warehouses-list.component.html',
  styleUrls: ['./archived-warehouses-list.component.scss']
})
export class ArchivedWarehousesListComponent implements OnInit {

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
  exportExcelMsg: String;
  exportExcelStatus: String;

  constructor(private warehouseService: WarehouseService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) { }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  getAllArchivedWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        for (let m = 0; m < data.length; m++) {
                  if (data[m].warehouseState === false) {
                    this.warehouses.push(data[m]);
                  }
                }
        if (this.warehouses.length === 0) {
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
  
  getAllArchivedWarehousesASC() {
    this.warehouseService.getAllWarehousesASC().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        for (let m = 0; m < data.length; m++) {
                  if (data[m].warehouseState === false) {
                    this.warehouses.push(data[m]);
                  }
                }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedWarehousesDESC() {
    this.warehouseService.getAllWarehousesDESC().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = [];
        for (let m = 0; m < data.length; m++) {
                  if (data[m].warehouseState === false) {
                    this.warehouses.push(data[m]);
                  }
                }
      }, (err) => {
        return err;
      }
    );
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
              d.warehouseCountry === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.warehouses, 'Archived Warehouses');
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  onRestoreConfirm(warehouse, ref) {
    this.warehouseService.restoreWarehouse(warehouse.warehouseId).subscribe(
      () => {
       this.showToast('Warehouse Restored!!' , this.positions.TOP_RIGHT, 'success');
        this.warehouses.splice(this.warehouses.indexOf(warehouse), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.getAllArchivedWarehouses();
    this.countries = countries;
  }

}
