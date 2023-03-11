import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../../service/Transaction/transaction.service";
import {AccountsService} from "../../../service/Accounts/accounts.service";
import {Transaction} from "../../../models/Transaction";
import {FilesInfo} from "../../../models/FilesInfo";
import {DatePipe} from "@angular/common";
import {DateTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/date-type/date-type.component";
import {TypeTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/type-type/type-type.component";
import {DetailsTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/details-type/details-type.component";
import {NumberTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/income-type/number-type.component";
import {ExpenseTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/expense-type/expense-type.component";
import {SelectAccountsComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/select-accounts/select-accounts.component";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";

import {FilesWindowComponent} from "../../Transactions/transactions-utils/files-window/files-window.component";
import {DataTransferService} from "../../../service/data-transfer.service";
import {ReconciliationHelperComponent} from "../util/helper/reconciliation-helper/reconciliation-helper.component";

@Component({
  selector: 'ngx-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss']
})
export class ReconciliationComponent implements OnInit {

  constructor(private dt :DataTransferService,private ws :NbWindowService,private ts :TransactionService, private as:AccountsService, private toastrService: NbToastrService) { }
   
  
  globalBalance;
  statementBalance;
  reconciledTransactions 
  nonReconciledTransactions ;
  numberReconT;
  numberNonReconT;
  reconciledFiles : FilesInfo[]
  nonReconciledFiles: FilesInfo[]
  numberReconF;
  numberNonReconF;
  allTransactions :Transaction[];
  maxDate:string
  format(date)  {
    let raw = new Date(date);

    return new DatePipe('en-EN').transform(raw, 'mediumDate');
  }
  ngOnInit(): void {
    this.as.getGlobalAccountBalance().subscribe(result=> {
      this.globalBalance = result;
    })
    this.as.getBankAccountBalance().subscribe(result=> {
      this.statementBalance = result;
    })
    this.ts.getReconciledTransactions().subscribe(result=> {
      this.reconciledTransactions= result
      this.numberReconT= this.reconciledTransactions.length
      
    })
    this.ts.getNonReconciledTransactions().subscribe(result=>{
      this.nonReconciledTransactions =result;
      this.numberNonReconT = result.length
    })
    this.ts.getReconciledFiles().subscribe(result=>{
      this.reconciledFiles =result
      this.numberReconF=result.length
    })
    this.ts.getNonReconciledFiles().subscribe(result=>{
      this.nonReconciledFiles=result
      this.numberNonReconF=result.length
    })
    this.ts.getAllTransactions().subscribe((result=>{
      this.allTransactions =result
      
      let instanceDate= this.allTransactions[0].date
      
        this.maxDate = this.format(instanceDate)
      
      
      for (let i=1; i<this.allTransactions.length;i++) {
        if (new Date(this.allTransactions[i].date).toISOString()>new Date(instanceDate).toISOString()) {
          this.maxDate =this.format(this.allTransactions[i].date)
        }
      }
    }))
    
  }
  //toast config 
  destroyByClick = true;
  duration = 2000;
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

  //transactions 
  
  tabSettings ={
    mode:'external',
    edit: {
      editButtonContent: '<i class="fas fa-eye small"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    delete: {
      deleteButtonContent: '<i class="nb-checkmark"></i>',
      confirmDelete: false,
    },
    actions :{
      add:false,



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
      income: {
        title: 'Income',
        type: 'number',
        //filter : {type :'custom', component:MoneyFilterComponent},
        addable: true,


        editor:{type:'custom',component:NumberTypeComponent}
      },
      expense: {
        title: 'Expense',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:ExpenseTypeComponent}
      },
      account :{
        title :'Transaction Account',
        type :'string',
        valuePrepareFunction:(cell,row)=> {
          return row.account.name;
        },
        editor : {type :'custom',component:SelectAccountsComponent}
      },
      reconciled :{
        title: 'Status',
        type :'html',
        valuePrepareFunction: (reconciled) => {
          switch (reconciled) {
            case false: {
              return `<h5><span class="badge badge-danger"> Unreconciled </span></h5>`;
            }
           

          }




        },
      }
      






    },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  tabSettings2 ={
    mode:'external',
    actions :{
      add:false,
      edit:false,
      delete:false,
      

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
        //filter : { type :'custom', component:DateFilterComponent},

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
      income: {
        title: 'Income',
        type: 'number',
        //filter : {type :'custom', component:MoneyFilterComponent},
        addable: true,


        editor:{type:'custom',component:NumberTypeComponent}
      },
      expense: {
        title: 'Expense',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:ExpenseTypeComponent}
      },
      account :{
        title :'Transaction Account',
        type :'string',
        valuePrepareFunction:(cell,row)=> {
          return row.account.name;
        },
        editor : {type :'custom',component:SelectAccountsComponent}
      },
      reconciled :{
        title: 'Status',
        type :'html',
        valuePrepareFunction: (reconciled) => {
          switch (reconciled) {
            case true: {
              return `<h5><span class="badge badge-success"> Reconciled </span></h5>`;
            }


          }




        },
      }







    },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  
  reconcileTransaction(event) {
    this.ts.reconcileTransaction(event.data.id).subscribe(()=>{
      this.action("success","Success", "Transaction reconciled");
        location.reload()


      },
      ()=>{
        this.action("danger","Success", "an error has occured!");


      }
    )
  }
  
  openFilesWindow(event){
    console.log(event.data.stringDate)
    this.dt.transferData(event.data.stringDate,event.data.details);
   
    this.ws.open(FilesWindowComponent,{title:`Proof Files List`})
    
    
  }
  
  //end transactions
  
  
  //files
  onDownload(event) {
    this.ts.downloadFile(event.data.fileId);
  }
  reconcileFile(event) {
    this.ts.reconcileFile(event.data).subscribe(()=>{
        this.action("success","Success", "File reconciled");
        location.reload()


      },
      ()=>{
        this.action("danger","Success", "an error has occured!");


      }
    )
  }
  
  tabSettings3 ={
    mode:'external',
    edit: {
      editButtonContent: '<i class="fas fa-eye small"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    delete: {
      deleteButtonContent: '<i class="nb-checkmark"></i>',
      confirmDelete: false,
    },
    actions :{
      add:false,

      

    },

  

    columns :{


      date: {
        title: 'Transaction Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },
        //filter : { type :'custom', component:DateFilterComponent},

        editor : {type :'custom', component: DateTypeComponent},


      },
     
      details: {
        title: 'Transaction Details',
        type: 'string',
        //filter : true,
      },
      title: {
        title: 'File Title',
        type: 'string',
        


      },
     
      reconciled :{
        title: 'Status',
        type :'html',
        valuePrepareFunction: (reconciled) => {
          switch (reconciled) {
            case false: {
              return `<h5><span class="badge badge-danger"> Unreconciled </span></h5>`;
            }


          }




        },
      }







    },
    pager :{
      display :true,
      perPage: 5,
    }
  }


  tabSettings4 ={
    mode:'external',
    actions :{
      add:false,
      edit:false,
      delete:false,
      custom: [
        {
          name: 'view',
          title: '<i class="nb-checkmark"></i>',

        }],

    },

    hideSubHeader: false ,

    columns :{


      date: {
        title: 'Transaction Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },
        //filter : { type :'custom', component:DateFilterComponent},

        editor : {type :'custom', component: DateTypeComponent},


      },

      details: {
        title: 'Transaction Details',
        type: 'string',
        //filter : true,
      },
      title: {
        title: 'File Title',
        type: 'string',



      },

      reconciled :{
        title: 'Status',
        type :'html',
        valuePrepareFunction: (reconciled) => {
          switch (reconciled) {
            case true: {
              return `<h5><span class="badge badge-success"> Reconciled </span></h5>`;
            }


          }




        },
      }







    },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  //end files
   


  //Export excel
  preparingData (data) :any[]
  {
    let final =[]
    let reconciliationExemple  = { date:"", type :"",details :"",difference:0,account:""}
    data.forEach(row=>{
      
      type ObjectKey = keyof typeof row;
      const myVar1 = 'date' as ObjectKey;
      reconciliationExemple.date = this.format(row[myVar1])
      type ObjectKey2 = keyof typeof row;
      const myVar2 = 'type' as ObjectKey2;
      reconciliationExemple.type = row[myVar2]
      type ObjectKey3 = keyof typeof row;
      const myVar3 = 'details' as ObjectKey3;
      reconciliationExemple.details = row[myVar3]
      type ObjectKey4 = keyof typeof row;
      const myVar4 = 'balance' as ObjectKey4;
      reconciliationExemple.difference = Number(row[myVar4])
      type ObjectKey5 = keyof typeof row;
      const myVar5 = 'account' as ObjectKey5;
      reconciliationExemple.account= row[myVar5].name
      final.push(Object.values(reconciliationExemple))

    })
    return final
  }
  exportExcel () {
    let  title ="Reconciliation Grid " 
    let reconciled =this.preparingData(this.reconciledTransactions)    
   let nonReconciled= this.preparingData(this.nonReconciledTransactions)
    if(nonReconciled.length==0) {
      nonReconciled = this.preparingData(this.allTransactions)
    }

    this.ts.exportReconciliation(reconciled,nonReconciled,title,this.maxDate,this.globalBalance,this.statementBalance)


  }
  
  openWindow(){
    this.ws.open(ReconciliationHelperComponent,{ title: `Help` })
  }

}
