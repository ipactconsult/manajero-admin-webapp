import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RequestForQuotation} from "../../../models/requestForQuotation/request-for-quotation";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {RequestForQuotationService} from "../../../services/requestForQuotation/request-for-quotation.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {Router} from "@angular/router";
import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require('html-to-pdfmake');

@Component({
  selector: 'ngx-archived-rfqs-list',
  templateUrl: './archived-rfqs-list.component.html',
  styleUrls: ['./archived-rfqs-list.component.scss']
})
export class ArchivedRfqsListComponent implements OnInit {

  dataRFQs: RequestForQuotation [] = [];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  searchRFQ: string;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  current: number = 1;
  pageSize:number = 3;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  selectedRFQ;
  documentDefinition: any;
  positions = NbGlobalPhysicalPosition;
  exportExcelStatus: String;
  exportExcelMsg: String;

  constructor(private dialogService: NbDialogService, private windowService: NbWindowService,
              private rfqService: RequestForQuotationService, private exportService: ExportService, 
              private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllArchivedRFQs();
  }

  getAllArchivedRFQs() {
    this.rfqService.getAllRFQ().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = data;
        for (let r = 0; r < data.length; r++) {
          if (data[r].rfqState === true) {
            this.dataRFQs.splice(data.indexOf(data[r]), 1);
          }
        }
        if (this.dataRFQs.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
    }
        }, (err) => {
        return err;
      },
    );
  }
  
   getAllArchivedRFQsASC() {
    this.rfqService.getAllRFQ().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = data;
        for (let r = 0; r < data.length; r++) {
          if (data[r].rfqState === true) {
            this.dataRFQs.splice(data.indexOf(data[r]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
   getAllArchivedRFQsDESC() {
    this.rfqService.getAllRFQ().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = data;
        for (let r = 0; r < data.length; r++) {
          if (data[r].rfqState === true) {
            this.dataRFQs.splice(data.indexOf(data[r]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataRFQs, 'Archived Request For Quotations');
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
  
  onRestoreConfirm(rfq: RequestForQuotation, ref) {
    this.rfqService.restoreRFQ(rfq.rfqId).subscribe(
      () => {
        this.showToast('Request For Quotation Restored!' , this.positions.TOP_RIGHT, 'success');
        this.dataRFQs.splice(this.dataRFQs.indexOf(rfq), 1);
        ref.close();
      });
  }

}
