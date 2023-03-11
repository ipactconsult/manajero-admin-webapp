import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Quotation} from "../../../../models/quotation/quotation";
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import moment from "moment";
import {QuotationService} from "../../../../services/quotation/quotation.service";
import {ExportService} from "../../../../../../shared/exports/export.service";
import * as pdfMake from "pdfmake/build/pdfmake";
import {Supplier} from "../../../../models/supplier/supplier";
import {SupplierService} from "../../../../services/supplier/supplier.service";
const htmlToPdfmake = require('html-to-pdfmake');

@Component({
  selector: 'ngx-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {

  quotations: Quotation [] = [];
  rfqs: RequestForQuotation [] = [];
  suppliers: Supplier [] = [];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  searchQ: string;
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
              private quotationService: QuotationService, private exportService: ExportService,
              private toastrService: NbToastrService, private supplierService: SupplierService) {
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.getAllQuotations();
    this.getAllSuppliers();
  }

  getAllQuotations() {
    this.quotationService.getAllQuotations().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === false
            || data[q].rfq?.user?.company !== this.userConnected.company) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
        for (let q = 0; q < this.quotations.length; q++) {
          this.rfqs.push(this.quotations[q].rfq);
          if (q < this.quotations.length - 1) {
            if (this.quotations[q].rfq.rfqNumber === this.quotations[q+1].rfq.rfqNumber) {
              this.rfqs.splice(this.rfqs.indexOf(this.quotations[q].rfq), 1);
            }
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllQuotationsASC() {
    this.quotationService.getAllQuotationsASC().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === false
            || data[q].rfq?.user?.company !== this.userConnected.company) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getAllQuotationsDESC() {
    this.quotationService.getAllQuotationsDESC().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === false
            || data[q].rfq?.user?.company !== this.userConnected.company) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
      }, (err) => {
        return err;
      },
    );
  }

  getQuotationsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.quotationService.getAllQuotations().subscribe(
      (data: Quotation[]) => {
        this.quotations = [];
        this.quotations = data.filter(
          (d =>
              this.moment(d.quotationCreation).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.quotationState === true && d.rfq?.user?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === true
            && data[s].addedBy?.company === this.userConnected.company) {
            this.suppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getQuotationsBySupplier(e) {
    this.filterBySupplier(e);
  }

  filterBySupplier(e) {
    this.quotationService.getAllQuotations().subscribe(
      (data: Quotation[]) => {
        this.quotations = [];
        this.quotations = data.filter(
          (d =>
              `${d.supplier?.supplierFirstName} ${d.supplier?.supplierLastName}` === e &&
              d.quotationState === true && d.rfq?.user?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getQuotationsByRFQ_REF(e) {
    this.filterRFQ_REF(e);
  }

  filterRFQ_REF(e) {
    this.quotationService.getAllQuotations().subscribe(
      (data: Quotation[]) => {
        this.quotations = data;
        for (let q = 0; q < data.length; q++) {
          if (data[q].quotationState === false
            && data[q].rfq?.user?.company !== this.userConnected.company) {
            this.quotations.splice(data.indexOf(data[q]), 1);
          }
        }
        this.quotations = data.filter(
          (d =>
              d.rfq.rfqNumber === e &&
              d.quotationState === true && d.rfq?.user?.company === this.userConnected.company
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
    this.exportService.exportAsExcelFile(this.quotations, 'Quotations');
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

  onArchiveConfirm(quotation: Quotation, ref) {
    this.quotationService.archiveQuotation(quotation.quotationId).subscribe(
      () => {
        this.showToast('Quotation Archived!' , this.positions.TOP_RIGHT, 'success');
        this.quotations.splice(this.quotations.indexOf(quotation), 1);
        ref.close();
      });
  }

}
