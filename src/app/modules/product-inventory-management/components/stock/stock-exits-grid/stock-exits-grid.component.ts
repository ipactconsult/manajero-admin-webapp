import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StockExit} from "../../../models/stockExit/stock-exit";
import {RequestForQuotation} from "../../../models/requestForQuotation/request-for-quotation";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {StockExitService} from "../../../services/stockExit/stock-exit.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require('html-to-pdfmake');
import moment from "moment";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";

@Component({
  selector: 'ngx-stock-exits-grid',
  templateUrl: './stock-exits-grid.component.html',
  styleUrls: ['./stock-exits-grid.component.scss']
})
export class StockExitsGridComponent implements OnInit {

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
  userConnected;

  constructor(private dialogService: NbDialogService, private windowService: NbWindowService,
              private stockExitService: StockExitService, private exportService: ExportService,
              private toastrService: NbToastrService, private materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.getAllStockExits();
    this.materialService.getAllMaterials().subscribe(materials => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].materialState === true
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.materials.push(materials[m]);
        }
      }
    }, errorM => {
      return errorM;
    })
  }

  getAllStockExits() {
    this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
        this.stockExits = data;
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockExitState === false
            || data[s].material?.addedBy?.company !== this.userConnected.company) {
            this.stockExits.splice(data.indexOf(data[s]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllStockExitsASC() {
    this.stockExitService.getAllStockExitsASC().subscribe(
      (data: StockExit[]) => {
        this.stockExits = data;
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockExitState === false
            || data[s].material?.addedBy?.company !== this.userConnected.company) {
            this.stockExits.splice(data.indexOf(data[s]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllStockExitsDESC() {
    this.stockExitService.getAllStockExitsDESC().subscribe(
      (data: StockExit[]) => {
        this.stockExits = data;
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockExitState === false
            || data[s].material?.addedBy?.company !== this.userConnected.company) {
            this.stockExits.splice(data.indexOf(data[s]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getSExitsByCreationDate(e) {
    this.filterByDate(e);
  }

  filterByDate(e) {
    this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        this.stockExits = data.filter(
          (d =>
              this.moment(d.stockExitDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.stockExitState === true && d.material?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err
      });
  }

  getSExitsByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
        this.stockExits = [];
        this.stockExits = data.filter(
          (d =>
              d.material.materialName === e &&
              d.stockExitState === true && d.material?.addedBy?.company === this.userConnected.company
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
    this.exportService.exportAsExcelFile(this.stockExits, 'Stock Exits');
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    this.documentDefinition = {
      pageOrientation: 'landscape',
      pageSize: 'A3',
      content: [html],
    };
    pdfMake.createPdf(this.documentDefinition).download();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  onArchiveConfirm(stockExit: StockExit, ref) {
    this.stockExitService.archiveStockExit(stockExit.stockExitId).subscribe(
      () => {
        this.showToast('Stock Exit Archived!' , this.positions.TOP_RIGHT, 'success');
        this.stockExits.splice(this.stockExits.indexOf(stockExit), 1);
        ref.close();
      });
  }

}
