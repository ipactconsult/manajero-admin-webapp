import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Quotation} from "../../../models/quotation/quotation";
import {RequestForQuotation} from "../../../models/requestForQuotation/request-for-quotation";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {QuotationService} from "../../../services/quotation/quotation.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {Router} from "@angular/router";
import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require('html-to-pdfmake');

@Component({
  selector: 'ngx-archived-quotations-list',
  templateUrl: './archived-quotations-list.component.html',
  styleUrls: ['./archived-quotations-list.component.scss']
})
export class ArchivedQuotationsListComponent implements OnInit {

  quotations: Quotation [] = [];
  rfqs: RequestForQuotation [] = [];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  searchQ: string;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  current: number = 1;
  pageSize:number = 3;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  documentDefinition: any;
  positions = NbGlobalPhysicalPosition;
  exportExcelStatus: String;
  exportExcelMsg: String;

  constructor(private dialogService: NbDialogService, private windowService: NbWindowService,
              private quotationService: QuotationService, private exportService: ExportService, 
              private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllArchivedQuotations();
  }

  getAllArchivedQuotations() {
    this.quotationService.getAllQuotations().subscribe(
      (data: Quotation[]) => {
        for (let q = 0; q < data.length; q++) {
                  if (data[q].quotationState === false) {
                    this.quotations.push(data[q]);
                  }
                }
        if (this.quotations.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
    }
        for (let q = 0; q < this.quotations.length; q++) {
          this.rfqs.push(this.quotations[q].rfq);
        }
        for (let r = 0; r < this.rfqs.length; r++) {
          while (this.rfqs[r].rfqNumber === this.rfqs[r+1].rfqNumber) {
            this.rfqs.splice(this.rfqs.indexOf(this.rfqs[r]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
   getAllArchivedQuotationsASC() {
    this.quotationService.getAllQuotationsASC().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === true) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
   getAllArchivedQuotationsDESC() {
    this.quotationService.getAllQuotationsDESC().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === true) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
  getQuotationsByRFQ_REF(e) {
    this.filterRFQ_REF(e);
  }

  filterRFQ_REF(e) {
    this.quotationService.getAllQuotations().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === true) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
        this.quotations = data.filter(
          (d =>
              d.rfq.rfqNumber === e
          )
        );
        }, (err) => {
        return err;
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.quotations, 'Archived Quotations');
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
  
  onRestoreConfirm(quotation: Quotation, ref) {
    this.quotationService.restoreQuotation(quotation.quotationId).subscribe(
      () => {
        this.showToast('Quotation Restored!' , this.positions.TOP_RIGHT, 'success');
        this.quotations.splice(this.quotations.indexOf(quotation), 1);
        ref.close();
      });
  }

}
