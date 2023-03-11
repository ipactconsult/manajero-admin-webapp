import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StockExit} from "../../../models/stockExit/stock-exit";
import {Material} from "../../../models/material/material";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {StockExitService} from "../../../services/stockExit/stock-exit.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {MaterialService} from "../../../services/material/material.service";
import moment from "moment";

@Component({
  selector: 'ngx-archived-stock-exits-list',
  templateUrl: './archived-stock-exits-list.component.html',
  styleUrls: ['./archived-stock-exits-list.component.scss']
})
export class ArchivedStockExitsListComponent implements OnInit {

  stockExits: StockExit [] = [];
  materials: Material [] = [];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  searchSE: string;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  current: number = 1;
  pageSize:number = 6;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  documentDefinition: any;
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;

  constructor(private dialogService: NbDialogService, private windowService: NbWindowService,
              private stockExitService: StockExitService, private exportService: ExportService,
              private toastrService: NbToastrService, private materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.getAllArchivedStockExits();
    this.materialService.getAllMaterials().subscribe(materials => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].materialState === true) {
          this.materials.push(materials[m]);
        }
      }
    }, errorM => {
      return errorM;
    })
  }

  getAllArchivedStockExits() {
    this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockExitState === false) {
            this.stockExits.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllArchivedStockExitsASC() {
    this.stockExitService.getAllStockExitsASC().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockExitState === false) {
            this.stockExits.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllArchivedStockExitsDESC() {
    this.stockExitService.getAllStockExitsDESC().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockExitState === false) {
            this.stockExits.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getArchivedSExitsByCreationDate(e) {
    this.filterByDate(e);
  }

  filterByDate(e) {
    this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        this.stockExits = data.filter(
          (d =>
              this.moment(d.stockExitDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.stockExitState === false
          )
        );
      }, (err) => {
        return err
      });
  }

  getArchivedSExitsByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        this.stockExits = data.filter(
          (d =>
              d.material.materialName === e &&
              d.stockExitState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.stockExits, 'Archived Stock Exits');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  onRestoreConfirm(stockExit: StockExit, ref) {
    this.stockExitService.restoreStockExit(stockExit.stockExitId).subscribe(
      () => {
        this.showToast('Stock Exit Restored!' , this.positions.TOP_RIGHT, 'success');
        this.stockExits.splice(this.stockExits.indexOf(stockExit), 1);
        ref.close();
      });
  }

}
