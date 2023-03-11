import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {OrderSale} from "../../models/order-sale.model";
import {OrderSaleService} from "../../services/orderSale/order-sale.service";
import {ExportService} from "../../../../shared/exports/export.service";


@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

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
  
  dataInvoice: OrderSale[] = [];


  constructor(private orderSaleService: OrderSaleService, private dialogService: NbDialogService, private router: Router,
  private windowService: NbWindowService, private toastrService: NbToastrService, private exportService: ExportService
) { }

  ngOnInit(): void {
    this.getAllOrderSales();
  }
  
  getAllOrderSales() {
    this.orderSaleService.getAll().subscribe(
      (data: OrderSale[]) => {
        this.dataInvoice = data;
      }, (err) => {
        return err;
      }
    );
  }
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataInvoice, 'Purchase Returns');
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
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }



}
