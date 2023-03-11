import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbWindowService,
  NbGlobalPosition, NbGlobalPhysicalPosition
} from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FormBuilder } from '@angular/forms';
import { AccountsService } from '../../services/accounts/accounts.service';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  class: string;
  code: string;
  balance: string;
  subclasses?: number;
}

@Component({
  selector: 'ngx-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  
  

  
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  

    dataSource: NbTreeGridDataSource<FSEntry>;
    

  source: LocalDataSource = new LocalDataSource();

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  customColumn = 'code';
  defaultColumns = [ 'class','balance','subclasses' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  
  

  constructor( private activatedroute: ActivatedRoute, 
              private formbuilder: FormBuilder, private windowService: NbWindowService, 
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private router: Router, private as: AccountsService) {
     
    
    this.dataSource = this.dataSourceBuilder.create(this.data);
    
  }

  ngOnInit(): void {
    
    
  }
  
   private data: TreeNode<FSEntry>[] = [
    {
      data: { class: 'Comptes de capitaux', code: '1', subclasses: 5, balance: '-2000' },
      children: [
        { data: { class: 'Capital et réserves', code: '11', balance: '-500' } },
        { data: { class: 'Report a nouveau', code: '13', balance: '-1000' } },
        {
          data: { class: 'Subventions d’investissement', code: '15', balance: '0', subclasses: 3 },
          children: [
            { data: { class: 'Subventions d\'équipement', code: '151', balance: '-1800' } },
            { data: { class: 'Subventions d\'investissement inscrites au compte de résultat', code: '155', balance: '800' } },
            { data: { class: 'Autres subventions d’investissement ', code: '159', balance: '1000' } },
          ],
        },
        { data: { class: 'Provisions', code: '16', balance: '-500' } },
      ],
    },
    {
      data: { class: 'Comptes d\'immobilisations', code: '2', balance: '1900', subclasses: 2 },
      children: [
        {
          data: { class: 'Immobilisations incorporelles', code: '20', balance: '800', subclasses: 1 },
          children: [
            { data: { class: 'Frais d\'établissement', code: '205', balance: '800' } },
          ],
        },
        {
          data: { class: 'Immobilisations mises en concession', code: '22', balance: '1100', subclasses: 2 },
          children: [
            { data: { class: 'Immobilisations corporelles en cours', code: '223', balance: '2000' } },
            { data: { class: 'Immobilisations incorporelles en cours', code: '226', balance: '-900' } },
          ],
        },
      ],
    },
    {
      data: { class: 'Comptes financiers', code: '4', balance: '8000', subclasses: 2 },
      children: [
        { data: { class: 'Valeurs mobilières de placement', code: '41', balance: '10000' } },
        { data: { class: 'Régies d’avance et accréditifs', code: '45', balance: '-2000' } },
      ],
    },
  ];
  
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



