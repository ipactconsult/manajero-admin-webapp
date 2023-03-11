import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {DateTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/date-type/date-type.component";
import {TypeTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/type-type/type-type.component";
import {DetailsTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/details-type/details-type.component";
import {NumberTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/income-type/number-type.component";
import {SelectAccountsComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/select-accounts/select-accounts.component";
import {TransactionService} from "../../../service/Transaction/transaction.service";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";

import {IncomeStatementHelperComponent} from "../utils/helper/income-statement-helper/income-statement-helper.component";

@Component({
  selector: 'ngx-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.scss']
})
export class IncomeStatementComponent implements OnInit {

  constructor(private ws :NbWindowService,private ts :TransactionService, private toastrService: NbToastrService) { }
   dateFormat = require("dateformat");

  minDate=new Date(localStorage.getItem('startDate')).toISOString()
  maxDate=new Date(localStorage.getItem('endDate')).toISOString()
  from =localStorage.getItem('startDate')
  to= localStorage.getItem('endDate')
  source;
test;
  ngOnInit(): void {
    this.ts.getTransactionsByDateRange(this.minDate,this.maxDate).subscribe(result=>{
      this.source=result
      this.source.sort((a,b) => a.sortOrder - b.sortOrder)

    },()=>{
      this.action("danger","Error","Please Check Your Inputs !")
    })
    
    
    
  }
  //toast config 
  destroyByClick = true;
  duration = 4500;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  private action (state:NbComponentStatus, title :string, message: string)
  {
    const config ={
      status : state,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    this.toastrService.show( message,title, config);
  }
  //end toast config
  startDate(event) {
    let formatted = new DatePipe('en-EN').transform(event, 'mediumDate' );

    localStorage.setItem('startDate', formatted);


  }
  endDate(event) {
    let formatted = new DatePipe('en-EN').transform(event, 'mediumDate' );

    localStorage.setItem('endDate', formatted);
    location.reload()

  }

  //transactions:
  Settings ={
actions :{
  add:false,
  edit:false,
  delete:false
  
},

    hideSubHeader: false ,

    columns :{


      date: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },

        editor : {type :'custom', component: DateTypeComponent},


      },
      type: {
        title: 'Type',
        type: 'string',

        editor:{
          type :'custom', component:TypeTypeComponent
        }

      },
      details: {
        title: 'Details',
        type: 'string',
        //filter : true,
        editor:{type:'custom',component:DetailsTypeComponent}
      },
      direction:{
        title:'Direction',
        type:'html',  valuePrepareFunction:(cell,row)=>{
           if (row.type =="Total Revenue" || row.type =="Total Expense") {
            return  `<h5><span class="badge badge-light"> ${row.type}</span></h5>`

          }
          else if(row.type=="Net Income") {
            return `<h5><span class="badge badge-secondary"> Net Income</span></h5>`
          }
          else if ( row.balance <0) {
            return `<h5><span class="badge badge-danger"> Expense</span></h5>`
          }
          else if (row.balance >0) {
            return  `<h5><span class="badge badge-success"> Income</span></h5>`
          }
         

},
      
        
      },
      balance: {
        title: 'Balance',
        type: 'number',
        //filter : {type :'custom', component:MoneyFilterComponent},
        addable: true,


        editor:{type:'custom',component:NumberTypeComponent}
      },
     
      account :{
        title :'Transaction Account',
        type :'string',
        valuePrepareFunction:(cell,row)=> {
          if(row.account=="Not Classified"){
            return "Not Classified"
          }
          else {
          
          return row.account.name;}
        },
        editor : {type :'custom',component:SelectAccountsComponent}
      }






    },
    pager :{
      display :true,
      perPage: 20,
    }
  }
  exportExcel() {
    let expense =[]
    let income= []
    let exemple  = { date:"", type :"",details :"",balance:0,account:""}
    let finalExpense=[]
    let finalIncome=[]

    console.log(this.source)
    this.source.forEach(ele=>{
      if (ele.sortOrder<=2) {
        income.push(ele)
      }
      else if (ele.sortOrder>2)
      {expense.push(ele)}
    })
    
    expense.forEach(row=>{
      type ObjectKey = keyof typeof row;
      const myVar1 = 'date' as ObjectKey;
      exemple.date = new DatePipe('en-EN').transform(row[myVar1], 'mediumDate' )
      type ObjectKey2 = keyof typeof row;
      const myVar2 = 'type' as ObjectKey2;
      exemple.type = row[myVar2]
      type ObjectKey3 = keyof typeof row;
      const myVar3 = 'details' as ObjectKey3;
      exemple.details = row[myVar3]
      type ObjectKey4 = keyof typeof row;
      const myVar4 = 'balance' as ObjectKey4;
      exemple.balance = row[myVar4]
      type ObjectKey5 = keyof typeof row;
      const myVar5 = 'account' as ObjectKey5;
      if (typeof row[myVar5] != 'string')
      {
        exemple.account=row[myVar5].name
      }
      else {
        exemple.account=row[myVar5]
      }
      finalExpense.push(Object.values(exemple))
      
    })
    income.forEach(row=>{
      type ObjectKey = keyof typeof row;
      const myVar1 = 'date' as ObjectKey;
      exemple.date = new DatePipe('en-EN').transform(row[myVar1], 'mediumDate' )
      type ObjectKey2 = keyof typeof row;
      const myVar2 = 'type' as ObjectKey2;
      exemple.type = row[myVar2]
      type ObjectKey3 = keyof typeof row;
      const myVar3 = 'details' as ObjectKey3;
      exemple.details = row[myVar3]
      type ObjectKey4 = keyof typeof row;
      const myVar4 = 'balance' as ObjectKey4;
      exemple.balance = row[myVar4]
      type ObjectKey5 = keyof typeof row;
      const myVar5 = 'account' as ObjectKey5;
      if (typeof row[myVar5] != 'string')
      {
        exemple.account=row[myVar5].name
      }
      else {
        exemple.account=row[myVar5]
      }
      finalIncome.push(Object.values(exemple))

    })
    
    let period ="Time Period: Between "+this.from+" and "+this.to
    this.ts.exportIncomeStatement(finalExpense,finalIncome,"Income Statement",period)
  }
  
openWindow(){
    this.ws.open(IncomeStatementHelperComponent, { title: `Help` })
    
}

}
