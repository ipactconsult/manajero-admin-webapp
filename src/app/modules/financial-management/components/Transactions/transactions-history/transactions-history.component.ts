import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {TypeFilterComponent} from "../annual-cashflow/months/Utils/Filters/type-filter/type-filter.component";
import {TransactionService} from "../../../service/Transaction/transaction.service";
import {Transaction} from "../../../models/Transaction";
import {ExportService} from "../../../../../shared/exports/export.service";


@Component({
  selector: 'ngx-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  constructor( private ts :TransactionService,private exportService : ExportService) { }
  source =[]
  ngOnInit(): void { 
    this.ts.getAllTransactions().subscribe( (data:Transaction[])=> {
      this.source =data;
      
    })
  }
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.source, `Transaction's history`);
  }
settings ={
  hideSubHeader: false ,
  pager :{
    display :true,
    perPage: 5,
  },
  columns :{


    date: {
      title: 'Date',
      type: 'Date',
      valuePrepareFunction: (date) => {
        let raw = new Date(date);

        return new DatePipe('en-EN').transform(raw, 'mediumDate');
      },

     


    },
    type: {
      title: 'Type',
      type: 'string',
      filter: {
        type: 'list',
        component : TypeFilterComponent,
        config: {



          list: [
            { value: 'Accessories', title: 'Accessories' },
            { value: 'Broker', title: 'Broker' },
            { value: 'Consulting', title: 'Consulting' },
            { value : 'Electricity' , title :'Electricity'},
            {value :'Entreprise_Creation', title:'Entreprise_Creation'},
            {value :'Food' , title :'Food'
            },
            {value :'Furniture_purchase' , title:'Furniture_purchase'},
            {value :'IT' , title :'IT'},
            {value :'Internet' , title :'Internet'},
            {value :'Invoices', title :'Invoices'
            },
            {value :'Phone', title :'Phone'},
            {value :'Purchases', title :'Purchases'},
            {value :'Rent', title :'Rent'},
            {value :'Salary', title :'Salary'},
            {value :'Water', title :'Water'},
            {value :'Withdrawal', title :'Withdrawal'},
            {value :'Commissions', title :'Commissions'},
            {value  :'OIM_Investments', title:'OIM_Investments'},
            {value :'Own_Funds' , title :'Own_Funds'},
            {value :'Rent_wages', title :'Rent_wages'},
            {value :'Sales' , title :'Sales'},
            {value :'Other' , title :'Other'}
          ],
        },

      },
     
     

    },
    details: {
      title: 'Details',
      type: 'string',
      //filter : true,
    },
    income: {
      title: 'Income',
      type: 'number',
      //filter : {type :'custom', component:MoneyFilterComponent},
      addable: true,
      
      

    },
    expense: {
      title: 'Expense',
      type: 'number',
      sort :true
      //filter : {type :'custom' , component:MoneyFilterComponent},
    },
    

  },
  actions : {
    add : false,
    edit :false,
    delete:false,
  }}


 
}

