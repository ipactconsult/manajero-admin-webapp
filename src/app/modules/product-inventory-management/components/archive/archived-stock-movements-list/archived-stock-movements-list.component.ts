import {Component, OnInit, TemplateRef} from '@angular/core';
import {StockMovement} from "../../../models/stockMovement/stock-movement";
import {Material} from "../../../models/material/material";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {ExportService} from "../../../../../shared/exports/export.service";
import {StockMovementService} from "../../../services/stockMovement/stock-movement.service";
import {MaterialService} from "../../../services/material/material.service";
import moment from "moment";

@Component({
  selector: 'ngx-archived-stock-movements-list',
  templateUrl: './archived-stock-movements-list.component.html',
  styleUrls: ['./archived-stock-movements-list.component.scss']
})
export class ArchivedStockMovementsListComponent implements OnInit {

  stockMovements: StockMovement[] = [];
  materials: Material[] = [];
  positions = NbGlobalPhysicalPosition;
  current: number = 1;
  search: string = '';
  moment: any = moment;
  pageSize: number = 6;
  myDate = new Date().toDateString();
  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Stock Movements Data',
    templateString: `<header>Stock Movements \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  };

  constructor(private exportService: ExportService, private smService: StockMovementService,
              private dialogService: NbDialogService, private toastrService: NbToastrService,
              private materialService: MaterialService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
        for (let m = 0; m < this.materials.length; m++) {
          if (this.materials[m].materialState === false) {
            this.materials.splice(this.materials.indexOf(this.materials[m]), 1);
          }
        }
      }, (err) => {
        this.showToast(err.error , this.positions.TOP_RIGHT, 'danger');
      }
    );
  }

  getAllArchivedSMs() {
    this.smService.getAllSMs().subscribe(
      (data: StockMovement[]) => {
        this.stockMovements = [];
        for (let sm = 0; sm < data.length; sm++) {
          if (data[sm].activeState === false) {
            this.stockMovements.push(data[sm]);
          }
        }
      }, (err) => {
        this.showToast(err.error , this.positions.TOP_RIGHT, 'danger');
      }
    );
  }

  getAllArchivedSMsASCByCode() {
    this.smService.getAllSMsASCByCode().subscribe(
      (data: StockMovement[]) => {
        this.stockMovements = [];
        for (let sm = 0; sm < data.length; sm++) {
          if (data[sm].activeState === false) {
            this.stockMovements.push(data[sm]);
          }
        }
      }, (err) => {
        this.showToast(err.error , this.positions.TOP_RIGHT, 'danger');
      }
    );
  }

  getAllArchivedSMsDESCByCode() {
    this.smService.getAllSMsDESCByCode().subscribe(
      (data: StockMovement[]) => {
        this.stockMovements = [];
        for (let sm = 0; sm < data.length; sm++) {
          if (data[sm].activeState === false) {
            this.stockMovements.push(data[sm]);
          }
        }
      }, (err) => {
        this.showToast(err.error , this.positions.TOP_RIGHT, 'danger');
      }
    );
  }

  getArchivedSMsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.smService.getAllSMs().subscribe(
      (data: StockMovement[]) => {
        this.stockMovements = [];
        this.stockMovements = data.filter(
          (d =>
              this.moment(d.dateSM).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.activeState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  getArchivedSMByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.smService.getAllSMs().subscribe(
      (data: StockMovement[]) => {
        this.stockMovements = [];
        this.stockMovements = data.filter(
          (d =>
              d.material.materialName === e &&
              d.activeState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.stockMovements, 'Archived Stock Movements');
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onRestoreConfirm(sm: StockMovement, ref) {
    this.smService.restoreSM(sm.smId).subscribe(
      () => {
        this.showToast('Stock Movement Restored!' , this.positions.TOP_RIGHT, 'success');
        this.stockMovements.splice(this.stockMovements.indexOf(sm), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.getAllArchivedSMs();
    this.getAllMaterials();
  }

}
