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
import moment from "moment";

@Component({
  selector: 'ngx-archived-stock-entries-list',
  templateUrl: './archived-stock-entries-list.component.html',
  styleUrls: ['./archived-stock-entries-list.component.scss']
})
export class ArchivedStockEntriesListComponent implements OnInit {

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

  constructor(private dialogService: NbDialogService, private windowService: NbWindowService,
              private stockEntryService: StockEntryService, private exportService: ExportService,
              private materialService: MaterialService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.getAllArchivedStockEntries();
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

  getAllArchivedStockEntries() {
    this.stockEntryService.getAllStockEntries().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockEntryState === false) {
            this.stockEntries.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllArchivedStockEntriesASC() {
    this.stockEntryService.getAllStockEntriesASC().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockEntryState === false) {
            this.stockEntries.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllArchivedStockEntriesDESC() {
    this.stockEntryService.getAllStockEntriesDESC().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        for (let s = 0; s < data.length; s++) {
          if (data[s].stockEntryState === false) {
            this.stockEntries.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getArchivedSEsByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.stockEntryService.getAllStockEntries().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        this.stockEntries = data.filter(
          (d =>
              d.material.materialName === e &&
              d.stockEntryState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  getArchivedSEsByCreationDate(e) {
    this.filterByDate(e);
  }

  filterByDate(e) {
    this.stockEntryService.getAllStockEntries().subscribe(
      (data: StockEntry[]) => {
        this.stockEntries = [];
        this.stockEntries = data.filter(
          (d =>
              this.moment(d.stockEntryDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.stockEntryState === false
          )
        );
      }, (err) => {
        return err
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.stockEntries, 'Archived Stock Entries');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  onRestoreConfirm(stockEntry: StockEntry, ref) {
    this.stockEntryService.restoreStockEntry(stockEntry.stockEntryId).subscribe(
      () => {
        this.showToast('Stock Entry Restored!' , this.positions.TOP_RIGHT, 'success');
        this.stockEntries.splice(this.stockEntries.indexOf(stockEntry), 1);
        ref.close();
      });
  }

}
