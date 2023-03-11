import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StockEntry} from "../../../models/stockEntry/stock-entry";
import {Material} from "../../../models/material/material";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {StockEntryService} from "../../../services/stockEntry/stock-entry.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {MaterialService} from "../../../services/material/material.service";
import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require('html-to-pdfmake');
import moment from "moment";

@Component({
  selector: 'ngx-stock-entries-grid',
  templateUrl: './stock-entries-grid.component.html',
  styleUrls: ['./stock-entries-grid.component.scss']
})
export class StockEntriesGridComponent implements OnInit {

  stockEntries: StockEntry [] = [];
  materials: Material [] = [];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  searchSEntry: string;
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
              private stockEntryService: StockEntryService, private exportService: ExportService,
              private materialService: MaterialService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.getAllStockEntries();
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

  getAllStockEntries() {
    this.stockEntryService.getAllStockEntries().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = data;
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockEntryState === false ||
            data[s].material?.addedBy?.company !== this.userConnected.company) {
            this.stockEntries.splice(data.indexOf(data[s]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllStockEntriesASC() {
    this.stockEntryService.getAllStockEntriesASC().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = data;
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockEntryState === false ||
            data[s].material?.addedBy?.company !== this.userConnected.company) {
            this.stockEntries.splice(data.indexOf(data[s]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllStockEntriesDESC() {
    this.stockEntryService.getAllStockEntriesDESC().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = data;
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockEntryState === false ||
            data[s].material?.addedBy?.company !== this.userConnected.company) {
            this.stockEntries.splice(data.indexOf(data[s]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getSEsByCreationDate(e) {
    this.filterByDate(e);
  }

  filterByDate(e) {
    this.stockEntryService.getAllStockEntries().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        this.stockEntries = data.filter(
          (d =>
              this.moment(d.stockEntryDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.stockEntryState === true &&
              d.material?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err
      });
  }

  getSEsByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.stockEntryService.getAllStockEntries().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        this.stockEntries = data.filter(
          (d =>
              d.material.materialName === e &&
              d.stockEntryState === true &&
              d.material?.addedBy?.company === this.userConnected.company
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
    this.exportService.exportAsExcelFile(this.stockEntries, 'Stock Entries');
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

  onArchiveConfirm(stockEntry: StockEntry, ref) {
    this.stockEntryService.archiveStockEntry(stockEntry.stockEntryId).subscribe(
      () => {
        this.showToast('Stock Entry Archived!' , this.positions.TOP_RIGHT, 'success');
        this.stockEntries.splice(this.stockEntries.indexOf(stockEntry), 1);
        ref.close();
      });
  }

}
