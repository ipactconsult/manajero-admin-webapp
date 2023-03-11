import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import moment from 'moment';
import {Receipt} from "../../../models/receipt/receipt";
import {ReceiptService} from "../../../services/receipt/receipt.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";

@Component({
  selector: 'ngx-archived-receipts-list',
  templateUrl: './archived-receipts-list.component.html',
  styleUrls: ['./archived-receipts-list.component.scss']
})
export class ArchivedReceiptsListComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
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
  pageSize: number = 3;
  dataReceipts: Receipt[] = [];
  positions = NbGlobalPhysicalPosition;
  exportExcelStatus: String;
  exportExcelMsg: String;
  moment: any = moment;

  constructor(private receiptService: ReceiptService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

  getAllArchivedReceipts() {
     this.receiptService.getAllReceipts().subscribe(
      (data: Receipt[])=> {
                for (let r = 0; r < data.length; r++) {
                  if (data[r].receiptState === false) {
                    this.dataReceipts.push(data[r]);
                  }
                }
                if (this.dataReceipts.length === 0) {
      this.exportExcelMsg = 'Export is not possible';
      this.exportExcelStatus = 'danger';
    } else {
      this.exportExcelMsg = 'Click here to export data to Excel';
      this.exportExcelStatus = 'primary';
    }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllArchivedReceiptsASC() {
    this.receiptService.getAllReceiptsASC().subscribe(
      (data: Receipt[]) => {
        for (let r = 0; r < data.length; r++) {
                  if (data[r].receiptState === false) {
                    this.dataReceipts.push(data[r]);
                  }
                }
      }, (err) => {
        return err;
      }
    );
  }
  
  getAllArchivedReceiptsDESC() {
    this.receiptService.getAllReceiptsDESC().subscribe(
      (data: Receipt[]) => {
        for (let r = 0; r < data.length; r++) {
                  if (data[r].receiptState === false) {
                    this.dataReceipts.push(data[r]);
                  }
                }
      }, (err) => {
        return err;
      }
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onRestoreConfirm(receipt: Receipt, ref) {
    this.receiptService.restoreReceipt(receipt.receiptId).subscribe(
      () => {
        this.showToast('Receipt restored!!' , this.positions.TOP_RIGHT, 'success');
        this.dataReceipts.splice(this.dataReceipts.indexOf(receipt), 1);
        ref.close();
      });
  }

  getReceiptsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.receiptService.getAllReceipts().subscribe(
      (data: Receipt[]) => {
        this.dataReceipts = [];
        this.dataReceipts = data.filter(
          (d =>
              this.moment(d.receiptCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD')
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  getReceiptsByReceiptDate(e) {
    this.filterByReceiptDate(e);
  }
  
  filterByReceiptDate(e) {
    this.receiptService.getAllReceipts().subscribe(
      (data: Receipt[]) => {
        this.dataReceipts = [];
        this.dataReceipts = data.filter(
          (d =>
              this.moment(d.purchaseOrder.receptionDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD')
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataReceipts, 'Archived Receipts');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  ngOnInit(): void {
    this.getAllArchivedReceipts();
  }

}
