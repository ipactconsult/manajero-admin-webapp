import { Component, OnInit } from '@angular/core';
import {TypeTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/type-type/type-type.component";
import {NumberTypeComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/income-type/number-type.component";
import {BudgetsService} from "../../../service/BudgetService/budgets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {ForecastMoneyFlow} from "../../../models/ForecastMoneyFlow";
import {SelectTypeForForecastComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/select-type-for-forecast/select-type-for-forecast.component";
import {SelectDirectionForForecastComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/select-direction-for-forecast/select-direction-for-forecast.component";
import {DisabledInputComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/disabled-input/disabled-input.component";
import {ForecastHelperComponent} from "../util/helpers/forecast-helper/forecast-helper.component";

@Component({
  selector: 'ngx-forecast-budget',
  templateUrl: './forecast-budget.component.html',
  styleUrls: ['./forecast-budget.component.scss']
})
export class ForecastBudgetComponent implements OnInit {

  constructor( private ws:NbWindowService ,private bs:BudgetsService,private route:ActivatedRoute,private router:Router,private toastrService: NbToastrService) { }
 
  array =[2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060]
  date:Date  = new Date();
  source =[]
  defaultYear:number = this.date.getFullYear()+1;
  ngOnInit(): void {
    this.router.navigateByUrl('/finance/forecastBudget/' + this.defaultYear).then(()  =>   this.route.paramMap.subscribe((params) =>{
      this.defaultYear = Number(params.get("year"));
      this.bs.retrieveForecastMoneyFlowByYear(this.defaultYear).subscribe(
        data=>  {this.source=data
          this.source.sort((a,b) => a.sortOrder - b.sortOrder);}


      )}))
 
    

  }
  
  yearChange (event) {
    console.log(this.source)

    this.defaultYear=event;
    this.router.navigateByUrl('/finance/forecastBudget/' + this.defaultYear).then(()  => {})

  }
  tabSettings ={

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
      description: {
        title: 'Description',
        type: 'string',
        editor:{
          type :'custom', component:TypeTypeComponent
        }

      },
      direction: {
        title: 'Direction',
        type: 'html',
        //filter : true,
        valuePrepareFunction: (direction) => {
          switch (direction) {
            case "Income": {
              return `<h5><span class="badge badge-success">${direction} </span></h5>`;
            }
            case "Expense": {
              return `<h5><span class="badge badge-danger">${direction} </span></h5>`;
            }
           
         
          }



        },
       
        editor:{type:'custom',component:SelectDirectionForForecastComponent},
        
      },
      type: {
        title: 'Type',
        type: 'html',
        addable: true,
        valuePrepareFunction: (type) => {
          switch (type) {
            case "Operating Income": {
              return `<h5><span class="badge badge-primary">${type} </span></h5>`;
            }
            case "Non Operating Income": {
              return `<h5><span class="badge badge-info">${type} </span></h5>`;
            }
            case "Total Income" :{
              return `<h5><span class="badge badge-light">${type} </span></h5>`;


            }
            case "Operating Expense": {
              return `<h5><span class="badge badge-primary">${type} </span></h5>`;
            }
           
            
            case "Total Operating Income" :{
              return `<h5><span class="badge badge-primary">${type} </span></h5>`;


            }
            case "Total Non Operating Income" :{
              return `<h5><span class="badge badge-info">${type} </span></h5>`;


            }
            case "Total Operating Expense" :{
              return `<h5><span class="badge badge-primary">${type} </span></h5>`;


            }
            case "Total Non Operating Expense": {
              return `<h5><span class="badge badge-info">${type} </span></h5>`;
            }
            case "Non Operating Expense": {
              return `<h5><span class="badge badge-info">${type} </span></h5>`;
            }
            case "Total Expense" :{
              return `<h5><span class="badge badge-light">${type} </span></h5>`;


            }
            case "Tax" :{
              return `<h5><span class="badge badge-warning">${type} </span></h5>`;


            }
            case "Net Income Before Tax" :{
              return `<h5><span class="badge badge-secondary">${type} </span></h5>`;


            }
            case "Net Income" :{
              return `<h5><span class="badge badge-secondary">${type} </span></h5>`;


            }
          }



        },


        editor:{type:'custom',component:SelectTypeForForecastComponent}
      },
      january: {
        title: 'January',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      february: {
        title: 'February',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      march: {
        title: 'March',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      april: {
        title: 'April',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      may: {
        title: 'May',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      june: {
        title: 'June',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      july: {
        title: 'July',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      august: {
        title: 'August',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      september: {
        title: 'September',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      october: {
        title: 'October',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      november: {
        title: 'November',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      december: {
        title: 'December',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:NumberTypeComponent}
      },
      total: {
        title: 'Total',
        type: 'number',
        //filter : {type :'custom' , component:MoneyFilterComponent},
        editor:{type:'custom',component:DisabledInputComponent}
      },
      





    },
    pager :{
      display :true,
      perPage: 50,
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
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

  deleteForecastMoneyFlow(event){
    if (event.data.type=="Tax") {
      this.bs.deleteForecastTax(event.data.id).subscribe(()=> {

          this.action("success","Success", "Tax Deleted !");
          this.redirectTo('/finance/forecastBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })
    }
    else {
      this.bs.deleteForecastFlow(event.data.id).subscribe(
        ()=> {

          this.action("success","Success", "Expense Deleted !");
          this.redirectTo('/finance/forecastBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        }
      )
    }}
  moneyFlow: ForecastMoneyFlow;
  //crud 
  updateForecastMoneyFlow(event){
    if (event.newData.type == "Tax") {
      this.bs.updateForecastTax(event.newData).subscribe(()=> {

          this.action("success","Success", "Tax Updated !");
          this.redirectTo('/finance/forecastBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })}
    else {
      this.bs.updateForecastMoneyFlow(event.newData).subscribe(
        ()=> {

          this.action("success","Success", "Expense Updated !");
          this.redirectTo('/finance/forecastBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        }
      )}
  }

  addForecastMoneyFlow(event) {
    if (event.newData.type=="Tax") {
      this.moneyFlow=event.newData
      this.moneyFlow.year =this.defaultYear;
      this.moneyFlow.differenciator="Tax"
      this.bs.addForecastTax(this.moneyFlow).subscribe(()=> {

          this.action("success","Success", "Tax Added !");
          this.redirectTo('/finance/forecastBudget/'+this.defaultYear)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        })
    }
    else {
      this.moneyFlow=event.newData
      this.moneyFlow.year =this.defaultYear;
      this.moneyFlow.differenciator="Unit"
      this.bs.addForecastMoneyFlow(this.moneyFlow).subscribe(
        result => {
          console.log(result)
          console.log(this.defaultYear)

          this.action("success","Success", "Budget Entry Added !");
          this.redirectTo('/finance/forecastBudget/'+this.moneyFlow.year)

        },
        () => {
          this.action("danger","Error", "Please check your input !");

        }
      )}






  }
  
  exportExcel (){
    let  title ="Forecast Budget Plan " + this.defaultYear

    let finalData= []
    let dataExemple ={Description:"1",Direction:"",Type:"",January:"",February:"",March:"",April:"",May:"",June:"",July:"",August:"",September:"",October:"",November:"",December:"",Total:""}

    this.source.forEach(ele=>{
      type ObjectKey = keyof typeof ele;
      const myVar1 = 'description' as ObjectKey;
      dataExemple.Description = ele[myVar1]
      type ObjectKey2 = keyof typeof ele;
      const myVar2 = 'direction' as ObjectKey2;
      dataExemple.Direction = ele[myVar2]
      type ObjectKey3 = keyof typeof ele;
      const myVar3 = 'type' as ObjectKey3;
      dataExemple.Type = ele[myVar3]
      type ObjectKey4 = keyof typeof ele;
      const myVar4 = 'january' as ObjectKey4;
      dataExemple.January = ele[myVar4]
      type ObjectKey5 = keyof typeof ele;
      const myVar5 = 'february' as ObjectKey5;
      dataExemple.February = ele[myVar5]
      type ObjectKey6 = keyof typeof ele;
      const myVar6 = 'march' as ObjectKey6;
      dataExemple.March = ele[myVar6]
      type ObjectKey7 = keyof typeof ele;
      const myVar7 = 'april' as ObjectKey7;
      dataExemple.April = ele[myVar7]
      type ObjectKey8 = keyof typeof ele;
      const myVar8 = 'may' as ObjectKey8;
      dataExemple.May = ele[myVar8]
      type ObjectKey9 = keyof typeof ele;
      const myVar9 = 'june' as ObjectKey9;
      dataExemple.June = ele[myVar9]
      type ObjectKey10 = keyof typeof ele;
      const myVar10 = 'july' as ObjectKey10;
      dataExemple.July = ele[myVar10]
      type ObjectKey11 = keyof typeof ele;
      const myVar11 = 'august' as ObjectKey11;
      dataExemple.August = ele[myVar11]
      type ObjectKey12 = keyof typeof ele;
      const myVar12 = 'september' as ObjectKey12;
      dataExemple.September = ele[myVar12]
      type ObjectKey13 = keyof typeof ele;
      const myVar13 = 'october' as ObjectKey13;
      dataExemple.October = ele[myVar13]
      type ObjectKey14 = keyof typeof ele;
      const myVar14 = 'november' as ObjectKey14;
      dataExemple.November = ele[myVar14]
      type ObjectKey15 = keyof typeof ele;
      const myVar15 = 'december' as ObjectKey15;
      dataExemple.December = ele[myVar15]
      type ObjectKey16 = keyof typeof ele;
      const myVar16 = 'total' as ObjectKey16;
      dataExemple.Total = ele[myVar16]
      
      finalData.push(Object.values(dataExemple))
      
    })
    this.bs.exportExcelForecast(title,finalData)

  }
  
openWindow(){
    this.ws.open(ForecastHelperComponent,{ title: `Help` })
}
}
