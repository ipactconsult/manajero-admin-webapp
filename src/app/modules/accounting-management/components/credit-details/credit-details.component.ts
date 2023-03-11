import { Component, OnInit, Input } from '@angular/core';
import { CreditService } from '../../services/credit/credit.service';
import { Router } from '@angular/router';
import {
  NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Credit } from '../../models/credit.model';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-credit-details',
  templateUrl: './credit-details.component.html',
  styleUrls: ['./credit-details.component.scss']
})
export class CreditDetailsComponent implements OnInit {

  customColumn = 'type';
  defaultColumns = [ 'total', 'allocated', 'status', 'remainingCredit' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];


  source: LocalDataSource = new LocalDataSource();

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  dataSource: NbTreeGridDataSource<Credit>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Credit>,
    private router: Router,
     private cs: CreditService) { }

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

    this.cs.getAll().subscribe(
      (data: Credit[]) => {
        
        const _data = data.map(val => ({...val, type: val.type ? val.type : '( no type )'}));
        const tableData: any = _data.map(val => ({data: val}));

        this.dataSource = this.dataSourceBuilder.create(tableData);

      }
    );
  }

}


