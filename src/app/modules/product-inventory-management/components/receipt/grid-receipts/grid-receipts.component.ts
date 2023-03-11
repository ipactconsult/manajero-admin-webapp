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
  selector: 'ngx-grid-receipts',
  templateUrl: './grid-receipts.component.html',
  styleUrls: ['./grid-receipts.component.scss']
})
export class GridReceiptsComponent implements OnInit {

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
  moment: any = moment;
  userConnected;

  constructor(private receiptService: ReceiptService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

  getAllReceipts() {
    this.receiptService.getAllReceipts().subscribe(
      (data: Receipt[])=> {
        this.dataReceipts = [];
        for (let r = 0; r < data.length; r++) {
          if (data[r].receiptState === true &&
            data[r].purchaseOrder?.addedBy?.company === this.userConnected.company) {
            this.dataReceipts.push(data[r]);
          }
        }
      },(err)=> {
        return err;
      }
    );
  }

  getAllReceiptsASC() {
    this.receiptService.getAllReceiptsASC().subscribe(
      (data: Receipt[]) => {
        this.dataReceipts = [];
        for (let r = 0; r < data.length; r++) {
          if (data[r].receiptState === true &&
            data[r].purchaseOrder?.addedBy?.company === this.userConnected.company) {
            this.dataReceipts.push(data[r]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllReceiptsDESC() {
    this.receiptService.getAllReceiptsDESC().subscribe(
      (data: Receipt[]) => {
        this.dataReceipts = [];
        for (let r = 0; r < data.length; r++) {
          if (data[r].receiptState === true &&
            data[r].purchaseOrder?.addedBy?.company === this.userConnected.company) {
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

  onArchiveConfirm(receipt: Receipt, ref) {
    this.receiptService.archiveReceipt(receipt.receiptId).subscribe(
      () => {
        this.showToast('Receipt archived!!' , this.positions.TOP_RIGHT, 'success');
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
              this.moment(d.receiptCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.receiptState === true &&
              d.purchaseOrder?.addedBy?.company === this.userConnected.company
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
              this.moment(d.purchaseOrder.receptionDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.receiptState === true &&
              d.purchaseOrder?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataReceipts, 'Receipts');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.getAllReceipts();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
