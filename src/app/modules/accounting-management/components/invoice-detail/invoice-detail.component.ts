import { Component, OnInit  } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from "@angular/common";
import {Invoice} from "../../models/invoice.model";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {InvoiceItemService} from "../../services/invoiceItem/invoice-item.service";
import {InvoiceItem} from "../../models/invoice-item.model";


@Component({
  selector: 'ngx-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  customColumn = 'description';
  defaultColumns = [ 'unitPrice', 'quantity', 'total' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  date: Date;

  totalInvoice: number = 0 ;

  idUri: string = '';
  term: string ="";
  paidStatus: string='Not paid';
  invoice: Invoice;


  dataSource: NbTreeGridDataSource<InvoiceItem>;
  
  source: LocalDataSource = new LocalDataSource();

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  constructor(private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute, 
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<InvoiceItem>,
              private router: Router, 
              private invoiceService: InvoiceService,
              private iis: InvoiceItemService) { }

  ngOnInit(): void {

    this.date = new Date();
    
    this.activatedRoute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });
    this.invoiceService.getInvoiceId(this.idUri).subscribe(result =>{
      this.invoice = result;
        if(this.invoice.paidStatus === true){
          this.paidStatus = 'Paid';
        }
    }
    )
    
    this.iis.getByInvoice(this.idUri).subscribe((data: InvoiceItem[]) => {

      const _data = data.map(val => ({...val, description: val.description ? val.description : 'Other'}));
      const tableData: any = _data.map(val => ({data: val}));
      this.dataSource = this.dataSourceBuilder.create(tableData);

      for(let j=0;j<tableData.length;j++){
        this.totalInvoice+= tableData[j].data.unitPrice * tableData[j].data.quantity;
      }

    })
    this.date = this.invoice.dueDate;
    
    
  
  }
  

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
}
