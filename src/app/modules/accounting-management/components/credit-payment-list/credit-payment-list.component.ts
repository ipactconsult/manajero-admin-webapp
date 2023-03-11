import { Component, OnInit , Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';
import {CreditPayment} from "../../models/credit-payment.model";
import {CreditPaymentService} from "../../services/creditPayment/credit-payment.service";
import {Credit} from "../../models/credit.model";
import {CreditService} from "../../services/credit/credit.service";

@Component({
  selector: 'ngx-credit-payment-list',
  templateUrl: './credit-payment-list.component.html',
  styleUrls: ['./credit-payment-list.component.scss']
})
export class CreditPaymentListComponent implements OnInit {

  customColumn = 'period';
  defaultColumns = [ 'payment', 'interest','taxValue', 'balance', 'cumulativeInterest' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  idUri: string = '';
  term: string ="";
  credit: Credit;


  source: LocalDataSource = new LocalDataSource();

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  dataSource: NbTreeGridDataSource<CreditPayment>;

  constructor(private activatedroute: ActivatedRoute, private dataSourceBuilder: NbTreeGridDataSourceBuilder<CreditPayment>,
              private router: Router,
              private cps: CreditPaymentService, private cs:CreditService) { }

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

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });
    this.cs.getCreditId(this.idUri).subscribe(result =>{
      this.credit = result;
    })

    this.cps.getAllByCredit(this.idUri).subscribe(
      (data: CreditPayment[]) => {

        const _data = data.map(val => ({...val, period: val.period ? val.period : '0'}));
        const tableData: any = _data.map(val => ({data: val}));

        this.dataSource = this.dataSourceBuilder.create(tableData);

      }
    );
  }

}
