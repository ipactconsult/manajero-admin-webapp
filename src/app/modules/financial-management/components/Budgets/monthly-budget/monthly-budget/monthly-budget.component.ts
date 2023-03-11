import { Component, OnInit } from '@angular/core';
import {BudgetsService} from "../../../../service/BudgetService/budgets.service";
import {TypeTypeComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/type-type/type-type.component";
import {NumberTypeComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/income-type/number-type.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MoneyFlow} from "../../../../models/MoneyFlow";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {SelectTypeComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/select-type/select-type.component";
import {DisabledInputComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/disabled-input/disabled-input.component";
import {BudgetsHelperComponent} from "../../util/helpers/budgets-helper/budgets-helper.component";
import {SelectForExpenseTypeComponent} from "../../../Transactions/annual-cashflow/months/Utils/Editors/select-for-expense-type/select-for-expense-type.component";

@Component({
  selector: 'ngx-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.scss']
})
export class MonthlyBudgetComponent implements OnInit {

  constructor( private ws:NbWindowService, private bs :BudgetsService , private route :ActivatedRoute,private router:Router,private toastrService: NbToastrService) { }
  expenses;
  incomes;
  date :Date = new Date();
  defaultYear :number= this.date.getFullYear();
  monthArray =['January','February','March','April','May','June','July','August','September','October','November','December']
  defaultMonth:string= this.monthArray[this.date.getMonth()];
  ngOnInit(): void {
    this.router.navigateByUrl('/finance/monthlyBudget/' + this.defaultMonth + '/' + this.defaultYear).then(() =>
      this.route.paramMap.subscribe((params) =>{
        this.defaultYear = Number(params.get("year"));
        this.defaultMonth = params.get("month");


        this.bs.getAllMoneyFlow("Expense",this.defaultYear,this.defaultMonth,"Monthly").subscribe(data=> {
          this.expenses=data;

          this.expenses.sort((a,b) => a.sortOrder - b.sortOrder)
        })
        this.bs.getAllMoneyFlow("Income",this.defaultYear,this.defaultMonth,"Monthly").subscribe(data=> {
          this.incomes=data;

          this.incomes.sort((a,b) => a.sortOrder - b.sortOrder)
        })}))

  }

  // year & month select

  
  
  yearArray =[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051]
  yearChange (event) {

    this.router.navigateByUrl('/finance/monthlyBudget/' + this.defaultMonth + '/' + event).then(() => {})

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
        title: 'Category',
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
        title: 'Category',
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
            case (difference >=0): {
              return `<h5><span class="badge badge-success">${difference} </span></h5>`;
            }
            case (difference <0) :{
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
 

  januarySelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/January/' + this.defaultYear).then(()  =>{})
    

  }
  februarySelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/February/'+this.defaultYear).then(()  =>{})
  }
  marchSelect () {

    this.router.navigateByUrl('/finance/monthlyBudget/March/'+this.defaultYear).then(()  =>{})
  
  }
  aprilSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/April/'+this.defaultYear).then(()  =>{})
  

  }
  maySelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/May/'+this.defaultYear).then(()  =>{})
   

  }
  juneSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/June/'+this.defaultYear).then(()  =>{})
    

  }
  julySelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/July/'+this.defaultYear).then(()  =>{})
    

  }
  augustSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/August/'+this.defaultYear).then(()  =>{})
   

  }
  septemberSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/September/'+this.defaultYear).then(()  =>{})
   

  }
  octoberSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/October/'+this.defaultYear).then(()  =>{})
  

  }
  novemberSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/November/'+this.defaultYear).then(()  =>{})
  
  }
  decemberSelect () {
    this.router.navigateByUrl('/finance/monthlyBudget/December/'+this.defaultYear).then(()  =>{})


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
  
  //crud
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
  moneyFlow : MoneyFlow = new MoneyFlow();
  addExpense(event) {
    if (event.newData.category=="Tax") {
      this.moneyFlow=event.newData
      this.moneyFlow.year =this.defaultYear;
      this.moneyFlow.type ="Monthly";
      this.moneyFlow.month=this.defaultMonth;
      this.bs.addTax(this.moneyFlow).subscribe(()=> {

          this.action("success","Success", "Tax Added !");
          this.redirectTo('/finance/monthlyBudget/'+this.moneyFlow.month+'/'+this.moneyFlow.year)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })
    }
    else {
    this.moneyFlow=event.newData
    this.moneyFlow.year =this.defaultYear;
    this.moneyFlow.type ="Monthly";
    this.moneyFlow.month=this.defaultMonth;
    this.bs.addExpenseMoneyFlow(this.moneyFlow).subscribe(
      ()=> {
        

        this.action("success","Success", "Budget Entry Added !");
        this.redirectTo('/finance/monthlyBudget/'+this.moneyFlow.month+'/'+this.moneyFlow.year)

      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }



    )}



  }
  addIncome(event) {
    this.moneyFlow=event.newData
    this.moneyFlow.year =this.defaultYear;
    this.moneyFlow.type ="Monthly";
    this.moneyFlow.month=this.defaultMonth;
    this.bs.addIncomeMoneyFlow(this.moneyFlow).subscribe(
      () => {
     

        this.action("success","Success", "Budget Entry Added !");
        this.redirectTo('/finance/monthlyBudget/'+this.moneyFlow.month+'/'+this.moneyFlow.year)

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
          this.redirectTo('/finance/annualBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })}
    else {
      this.bs.updateExpense(event.newData).subscribe(
        ()=> {

          this.action("success","Success", "Expense Updated !");
          this.redirectTo('/finance/annualBudget/'+this.defaultYear)

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
        this.redirectTo('/finance/annualBudget/'+this.defaultYear)

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
        this.redirectTo('/finance/annualBudget/'+this.defaultYear)

      },
      () => {
        this.action("danger","Error", "Please check your input !");

      }
    )
  }
  deleteExpense(event){
    if (event.data.category=="Tax") {
      this.bs.deleteTax(event.data.id).subscribe(()=> {

          this.action("success","Success", "Tax Deleted !");
          this.redirectTo('/finance/annualBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })
    }
    else {
      this.bs.deleteExpense(event.data.id).subscribe(
        ()=> {

          this.action("success","Success", "Expense Deleted !");
          this.redirectTo('/finance/annualBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        }
      )
    }}


 //excel export
  exportExcel () {
    let  title ="Monthly Budget Plan " + this.defaultMonth +" " +this.defaultYear
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
