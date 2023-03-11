import { Component, OnInit } from '@angular/core';
import { NumberTypeComponent } from '../../../Transactions/annual-cashflow/months/Utils/Editors/income-type/number-type.component';
import { TypeTypeComponent } from '../../../Transactions/annual-cashflow/months/Utils/Editors/type-type/type-type.component';
import {BudgetsService} from "../../../../service/BudgetService/budgets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectTypeComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/select-type/select-type.component";
import {MoneyFlow} from "../../../../models/MoneyFlow";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {SelectForExpenseTypeComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/select-for-expense-type/select-for-expense-type.component";
import {DisabledInputComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/disabled-input/disabled-input.component";
import {BudgetsHelperComponent} from "../../util/helpers/budgets-helper/budgets-helper.component";
@Component({
  selector: 'ngx-annual-budget',
  templateUrl: './annual-budget.component.html',
  styleUrls: ['./annual-budget.component.scss']
})
export class AnnualBudgetComponent implements OnInit {

  constructor( private ws: NbWindowService,private bs :BudgetsService, private router:Router,private route:ActivatedRoute,private toastrService: NbToastrService ) { }
expenses;
  incomes;
  getData () {
    
    this.bs.getAllMoneyFlow("Expense",this.defaultYear,"void","Yearly").subscribe(data=> {
      this.expenses=data;

      this.expenses.sort((a,b) => a.sortOrder - b.sortOrder)
    })
    this.bs.getAllMoneyFlow("Income",this.defaultYear,"void","Yearly").subscribe(data=> {
      this.incomes=data;

      this.incomes.sort((a,b) => a.sortOrder - b.sortOrder)
    })
    
  }
  ngOnInit(): void {
    if (   localStorage.getItem('defaultYear') == undefined
    ) {
      this.defaultYear = this.defaultDate.getFullYear();
    }
    else {
      this.defaultYear=Number(localStorage.getItem('defaultYear'))
    }

      this.getData()
      
    
  }
  
  // year select
defaultDate : Date = new Date();
defaultYear;
  array =[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050]
  yearChange (event) {
      
 this.defaultYear=event;
    localStorage.setItem('defaultYear', event);

    this.getData();

  }
  

  // tables settings
  expenseSettings ={

    add: {
      addButtonContent: ' <i class="nb-plus"></i> ',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
      inputClass: 'MoneyFlow'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :true,
      inputClass: 'MoneyFlow'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    hideSubHeader: false ,

    columns :{
      subCategory: {
        title: 'Description',
        type: 'string',
         editor:{
          type :'custom', component:TypeTypeComponent
        }

      },
      category: {
        title: 'Expense Type',
        type: 'html',
        //filter : true,
        editor:{type:'custom',component:SelectForExpenseTypeComponent},
        valuePrepareFunction: (category) => {
          switch (category) {
            case "Operating": {
              return `<h5><span class="badge badge-primary">${category} </span></h5>`;
            }
            case "Non Operating": {
              return `<h5><span class="badge badge-info">${category} </span></h5>`;
            }
            case "Total" :{
              return `<h5><span class="badge badge-light">${category} </span></h5>`;


            }
            case "Tax" :{
              return `<h5><span class="badge badge-warning">${category} </span></h5>`;


            }
          }
          


        },
      },
      actual: {
        title: 'Actual',
        type: 'number',
        addable: true,
        

        editor:{type:'custom',component:NumberTypeComponent}
      },
      budget: {
        title: 'Budget',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      difference: {
        title:'Difference',
        type :'html',
        editor:{type:'custom',component:DisabledInputComponent},
        valuePrepareFunction: (difference) => {
          switch (true) {
            case (difference <0): {
              return `<h5><span class="badge badge-success">${difference} </span></h5>`;
            }
            case (difference >=0) :{
              return `<h5><span class="badge badge-danger">${difference} </span></h5>`;
            }
           
          }



        },
      }





    },
    pager :{
      display :true,
      perPage: 15,
    }
  }
  incomeSettings ={

    add: {
      addButtonContent: ' <i class="nb-plus"></i> ',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
      inputClass: 'Transaction'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :true,
      inputClass: 'Transaction'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    hideSubHeader: false ,

    columns :{
      subCategory: {
        title: 'Description',
        type: 'string',
        editor:{
          type :'custom', component:TypeTypeComponent
        }

      },
      category: {
        title: 'Income Type',
        type: 'html',
        //filter : true,
        editor:{type:'custom',component:SelectTypeComponent},
        valuePrepareFunction: (category) => {
          switch (category) {
            case "Operating": {
              return `<h5><span class="badge badge-primary">${category} </span></h5>`;
            }
            case "Non Operating": {
              return `<h5><span class="badge badge-info">${category} </span></h5>`;
            }
            case "Total" :{
              return `<h5><span class="badge badge-light">${category} </span></h5>`;


            }
            case "Net Income Before Tax" :{
              return `<h5><span class="badge badge-secondary">${category} </span></h5>`;


            }
            case "Net Income" :{
              return `<h5><span class="badge badge-secondary">${category} </span></h5>`;


            }
          }



        },
      },
      actual: {
        title: 'Actual',
        type: 'number',
        addable: true,


        editor:{type:'custom',component:NumberTypeComponent}
      },
      budget: {
        title: 'Budget',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      difference: {
        title:'Difference',
        type :'html',
        editor:{type:'custom',component:DisabledInputComponent},
        valuePrepareFunction: (difference) => {
          switch (true) {
            case (difference >0 ): {
              return `<h5><span class="badge badge-success">${difference} </span></h5>`;
            }
            case (difference <=0) :{
              return `<h5><span class="badge badge-danger">${difference} </span></h5>`;
            }

          }




        },
      }





    },
    pager :{
      display :true,
      perPage: 15,
    }
  }
  //toast config 
  destroyByClick = true;
  duration = 5000;
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
  //crud
 

  moneyFlow : MoneyFlow = new MoneyFlow();
  addExpense(event) {
    if (event.newData.category=="Tax") {
      this.moneyFlow=event.newData
      this.moneyFlow.year =this.defaultYear;
      this.moneyFlow.type ="Yearly";
      this.moneyFlow.month="void";
      this.bs.addTax(this.moneyFlow).subscribe(()=> {

          this.action("success","Success", "Tax Added !");
          location.reload()
        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })
    }
    else {
    this.moneyFlow=event.newData
    this.moneyFlow.year =this.defaultYear;
    this.moneyFlow.type ="Yearly";
    this.moneyFlow.month="void";
    this.bs.addExpenseMoneyFlow(this.moneyFlow).subscribe(
      result => {
        
        
        this.action("success","Success", "Budget Entry Added !");
location.reload()
      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }
      )}
    
    




  }
  addIncome(event) {
    this.moneyFlow=event.newData
    this.moneyFlow.year =this.defaultYear;
    this.moneyFlow.type ="Yearly";
    this.moneyFlow.month="void";
    this.bs.addIncomeMoneyFlow(this.moneyFlow).subscribe(
      result => {
       
        this.action("success","Success", "Budget Entry Added !");
location.reload()
      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }



    )



  }
  
  updateExpense(event){
     if (event.newData.category == "Tax") {
    this.bs.updateTax(event.newData).subscribe(()=> {

        this.action("success","Success", "Tax Updated !");
        location.reload()
      },
      () => {
        this.action("danger","Error", "Please check your input !");

      })}
     else {
    this.bs.updateExpense(event.newData).subscribe(
      ()=> {

        this.action("success","Success", "Expense Updated !");
location.reload()
      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }
    )}
  }
  updateIncome(event){
    this.bs.updateIncome(event.newData).subscribe(
      ()=> {

        this.action("success","Success", "Income Updated !");
        location.reload()
      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }
    )
  }
  deleteIncome(event){
    this.bs.deleteIncome(event.data.id).subscribe(
      ()=> {

        this.action("success","Success", "Income Deleted !");
location.reload()
      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }
    )
  }
  deleteExpense(event){
    this.moneyFlow =event.data
    if (event.data.category=="Tax") {
      this.bs.deleteTax(event.data.id).subscribe(()=> {

          this.action("success","Success", "Tax Deleted !");
location.reload()
        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })
    }
    else {
    this.bs.deleteExpense(event.data.id).subscribe(
      ()=> {

        this.action("success","Success", "Expense Deleted !");
        location.reload()

      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }
    )
  }}
  // excel export
  
  exportExcel () {
   let  title ="Annual Budget Plan " + this.defaultYear
    let expense =[]
    let expenseExemple  = { description:"", type :"",actual :0,budget:0,difference:0}
    this.expenses.forEach(row=>{
      type ObjectKey = keyof typeof row;
      const myVar1 = 'subCategory' as ObjectKey;
      expenseExemple.description = row[myVar1]
      type ObjectKey2 = keyof typeof row;
      const myVar2 = 'category' as ObjectKey2;
      expenseExemple.type = row[myVar2]
      type ObjectKey3 = keyof typeof row;
      const myVar3 = 'actual' as ObjectKey3;
      expenseExemple.actual = row[myVar3]
      type ObjectKey4 = keyof typeof row;
      const myVar4 = 'budget' as ObjectKey4;
      expenseExemple.budget = row[myVar4]
      type ObjectKey5 = keyof typeof row;
      const myVar5 = 'difference' as ObjectKey5;
      expenseExemple.difference = row[myVar5]
      expense.push(Object.values(expenseExemple))
      
    })
    console.log(expense)
    let income = []
      this.incomes.forEach(row=> {
        type ObjectKey = keyof typeof row;
        const myVar1 = 'subCategory' as ObjectKey;
        expenseExemple.description = row[myVar1]
        type ObjectKey2 = keyof typeof row;
        const myVar2 = 'category' as ObjectKey2;
        expenseExemple.type = row[myVar2]
        type ObjectKey3 = keyof typeof row;
        const myVar3 = 'actual' as ObjectKey3;
        expenseExemple.actual = row[myVar3]
        type ObjectKey4 = keyof typeof row;
        const myVar4 = 'budget' as ObjectKey4;
        expenseExemple.budget = row[myVar4]
        type ObjectKey5 = keyof typeof row;
        const myVar5 = 'difference' as ObjectKey5;
        expenseExemple.difference = row[myVar5]
        income.push(Object.values(expenseExemple))
      })
    
    this.bs.exportExcel(title,expense,income)


  }
  
  
 
  openWindow(){
    this.ws.open(BudgetsHelperComponent,{ title: `Help` })
  }
  
}
