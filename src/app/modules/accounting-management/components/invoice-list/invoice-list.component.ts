import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {ExportService} from "../../../../shared/exports/export.service";
import {Invoice} from "../../models/invoice.model";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {CustomerView} from "../../models/customer-view.model";
import {CustomerViewService} from "../../services/customerView/customer-view.service";

@Component({
  selector: 'ngx-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

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
  
  dataInvoice: Invoice [] = [];
  clients: CustomerView [] = [];

  constructor(private invoiceService: InvoiceService, 
              private dialogService: NbDialogService, 
              private router: Router,
              private windowService: NbWindowService, 
              private toastrService: NbToastrService, 
              private exportService: ExportService,
              private clientService: CustomerViewService) { }

  ngOnInit(): void {
    this.getAllInvoices();
    this.getAllClients();
  }

  getInvoiceByCurrency(e) {
    this.filterByCurrency(e);
  }

  filterByCurrency(e) {
    this.invoiceService.getAll().subscribe(
      (data: Invoice[]) => {
        this.dataInvoice = [];
        this.dataInvoice = data.filter(
          (d =>
              d.currency === e
          )
        );
      }, (err) => {
        return err;
      });
  }
  
  getInvoiceByClient(e) {
    this.filterByClient(e);
  }

  filterByClient(e) {
    this.invoiceService.getAll().subscribe(
      (data: Invoice[]) => {
        this.dataInvoice = [];
        this.dataInvoice = data.filter(
          (d =>
              d.clientName === e 
          )
        );
      }, (err) => {
        return err;
      });
  }

  getArchived(e) {
    this.filterByArchived(e);
  }

  filterByArchived(e) {
    this.invoiceService.getAll().subscribe(
      (data: Invoice[]) => {
        this.dataInvoice = [];
        this.dataInvoice = data.filter(
          (d =>
              d.archived === e
          )
        );
      }, (err) => {
        return err;
      });
  }


  getAllClients(){
    this.clientService.getAll().subscribe((data: CustomerView[]) => {
      this.clients = data;
    },(err) => {
      return err;
    })
  }
  getAllInvoices(){
    this.invoiceService.getAll().subscribe((data: Invoice[]) => {
      this.dataInvoice = [];
      for (let p = 0; p < data.length; p++) {
        if (data[p].archived === false) {
          this.dataInvoice.push(data[p]);
        }
      }
    },(err) => {
      return err;
    })
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataInvoice, 'Invoices');
  }

  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onArchiveConfirm(invoice: Invoice, ref) {
    this.invoiceService.archiveInvoice(invoice.id).subscribe(
      () => {
        this.showToast('success','info' ,
           'Operation successful!');
        this.dataInvoice.splice(this.dataInvoice.indexOf(invoice), 1);
        ref.close();
      }, errorArchive => {
        return errorArchive.error;
      });
  }
  

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }


}
