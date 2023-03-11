import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import moment from "moment";
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {ExportService} from "../../../../../../shared/exports/export.service";
import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require('html-to-pdfmake');

@Component({
  selector: 'ngx-rfqs',
  templateUrl: './rfqs.component.html',
  styleUrls: ['./rfqs.component.scss']
})
export class RfqsComponent implements OnInit {

  dataRFQs: RequestForQuotation [] = [];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  searchRFQ: string;
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
              private rfqService: RequestForQuotationService, private exportService: ExportService, 
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.getAllRFQs();
  }

  getAllRFQs() {
    this.rfqService.getAllRFQ().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = data;
        for (let r = 0; r < data.length; r++) {
          if (data[r].rfqState === false || data[r].user?.company !== this.userConnected.company) {
            this.dataRFQs.splice(data.indexOf(data[r]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
   getAllRFQsASC() {
    this.rfqService.getAllRFQ_ASC().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = data;
        for (let r = 0; r < data.length; r++) {
          if (data[r].rfqState === false || data[r].user?.company !== this.userConnected.company) {
            this.dataRFQs.splice(data.indexOf(data[r]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }
  
   getAllRFQsDESC() {
    this.rfqService.getAllRFQ_DESC().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = data;
        for (let r = 0; r < data.length; r++) {
          if (data[r].rfqState === false || data[r].user?.company !== this.userConnected.company) {
            this.dataRFQs.splice(data.indexOf(data[r]), 1);
          }
        }
        }, (err) => {
        return err;
      },
    );
  }

  getRFQsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.rfqService.getAllRFQ().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = [];
        this.dataRFQs = data.filter(
          (d =>
              this.moment(d.rfqCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.rfqState === true && d.user?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getRFQsByQuotationDeadline(e) {
    this.filterByQuotationDeadline(e);
  }

  filterByQuotationDeadline(e) {
    this.rfqService.getAllRFQ().subscribe(
      (data: RequestForQuotation[]) => {
        this.dataRFQs = [];
        this.dataRFQs = data.filter(
          (d =>
              this.moment(d.quotationDeadline).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.rfqState === true && d.user?.company === this.userConnected.company
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
    this.exportService.exportAsExcelFile(this.dataRFQs, 'Request For Quotations');
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
  
  onArchiveConfirm(rfq: RequestForQuotation, ref) {
    this.rfqService.archiveRFQ(rfq.rfqId).subscribe(
      () => {
        this.showToast('Request For Quotation Archived!' , this.positions.TOP_RIGHT, 'success');
        this.dataRFQs.splice(this.dataRFQs.indexOf(rfq), 1);
        ref.close();
      });
  }

}
