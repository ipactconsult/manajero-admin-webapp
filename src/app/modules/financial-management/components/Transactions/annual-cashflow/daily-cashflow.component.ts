import {
  Component, OnInit,
  
} from '@angular/core';
import {TransactionService} from "../../../service/Transaction/transaction.service";
import {GlobalTransactions} from "../../../models/GlobalTransactions";
import {Router} from "@angular/router";
import {NbWindowService} from "@nebular/theme";
import {GlobalHelpComponent} from "../transactions-utils/global-help/global-help.component";
import {ExportService} from "../../../../../shared/exports/export.service";
import Chart from "chart.js";
import {DatePipe} from "@angular/common";
import {Workbook } from 'exceljs/dist/exceljs.min.js';
import * as fs from "file-saver";
@Component({
  selector: 'ngx-daily-cashflow',
  templateUrl: './daily-cashflow.component.html',
  styleUrls: ['./daily-cashflow.component.scss'],

})


export class DailyCashflowComponent implements OnInit{
  

  constructor(private ts: TransactionService,private exportService : ExportService, private router:Router, private ws:NbWindowService
  ) { 

  }
  tabSource =[];
  list2= [];
  datee = new Date();
  default =this.datee.getFullYear();
  defaultMonth = this.datee.getMonth();
  param : number;
  myChart :any;
  balances : number[] =[]
  
  ngOnInit() {
    let data
    let indexes=[1,2,3,4,5,6,7,8,9,10,11,12]

    let months=[]
    let monthExemple={date:"",type:"",details:"",income:0,expense:0,account:""}
    indexes.forEach(ele=>{
      this.ts.getByMonthAndYear(ele,this.default).subscribe(next=>{
          data=next
          months=[]

          if( data.length==0) {

            let date = new Date ()
            date.setMonth(ele,0)
            months.push([date])
            this.monthData.splice(ele-1, 1, months);
          }
          else {
            data.forEach(row=>{
                type ObjectKey = keyof typeof row;
                const myVar1 = 'date' as ObjectKey;
                monthExemple.date = new DatePipe('en-EN').transform(row[myVar1], 'mediumDate' )
                type ObjectKey2 = keyof typeof row;
                const myVar2 = 'type' as ObjectKey2;
                monthExemple.type = row[myVar2]
                type ObjectKey3 = keyof typeof row;
                const myVar3 = 'details' as ObjectKey3;
                monthExemple.details = row[myVar3]
                type ObjectKey4 = keyof typeof row;
                const myVar4 = 'income' as ObjectKey4;
                monthExemple.income = row[myVar4]
                type ObjectKey5 = keyof typeof row;
                const myVar5 = 'expense' as ObjectKey5;
                monthExemple.expense = row[myVar5]
                type ObjectKey6 = keyof typeof row;
                const myVar6 = 'account' as ObjectKey6;
                if (typeof row[myVar6] != 'string')
                {
                  monthExemple.account=row[myVar6].name
                }
                else {
                  monthExemple.account=row[myVar6]
                }
                months.push(Object.values(monthExemple))
                if(data.indexOf(row)==data.length-1) {
                  this.monthData.splice(ele-1, 1, months);

                }

              }
            )


          }

          
        }
      )

    })

    this.ts.getGlobal(this.default,this.defaultMonth).subscribe((data2:GlobalTransactions[]) => {
      this.param =this.default;
      this.tabSource= data2;
      this.tabSource.sort((a,b) => a.id - b.id)
      this.tabSource.forEach(obj=>{
        if (obj.id <13) {
          this.balances.push(obj.totalbalance)


        }
      })

      this.myChart = new Chart('balance', {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
          
          datasets: [{
            label: 'Balance',
            data: this.balances,
            fill:false,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend :{
            labels :{
              fontColor: "black"
            }
            
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"
                
              },
              
              
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }]
            
            
            
          }
        }
      });
    })
    
   }
  
  test :boolean;
  tabSettings ={
    actions: {
      
      custom: [
        {
          name: 'view',
          title: '<i  class="fas fa-eye small mt-2"></i>',
          
        }],
    add :false,
    edit :false,
    delete: false},
     

    columns :{
      id: {
        title: 'Months',
        type: 'string',
        valuePrepareFunction: (id) => {
          if (id =="Total" || id =="Averages") {
            this.test=false;
            return id
            
          }
          switch(id) {
            case "1": {
              return "January"
            }
            case "2": {
              return "February"
            }
            case "3": {
              return "March"
            }
            case "4": {
              return "April"
            }
            case "5": {
              return "May"
            }
            case "6": {
              return "June"
            }
            case "7": {
              return "July"
            }
            case "8": {
              return "August"
            }
            case "9": {
              return "September"
            }
            case "10": {
              return "October"
            }
            case "11": {
              return "November"
            }
            case "12": {
              return "December"


            }}
          
        
          
          
          
        
          
}
       


      },
      totalincome :{
        title:'Income',
        type :'number'
      },
      totalexpense :{
        title :'Expense',
        type :'number'
      },
      totalbalance :{
        title :'Balance',
        type :'number'
      }
    },
    rowClassFunction: (row) => {
     if (row.data.id =="Averages" || row.data.id =="Total") {
       return 'hide-action'
       return 'test'
     }
      
    },
    
    pager: {
      display: true,
      perPage :15,
    }
  }
  
  onCustom(event) {
    
    
   this.month = Number(event.data.id);
    this.router.navigateByUrl('/finance/annualCashFlow/months/'+this.month+'/'+this.year)
  }
   toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  monthData = new Array(12)
  exportExcelCashFlow(title,globalData,monthsData,year,balances) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);
    worksheet.mergeCells('A1', 'D1');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibre',
      size: 30,
      underline: 'single',
      bold: true,
      color: { argb: '4167B8' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.mergeCells('E1:F4');

    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('E1');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibre',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.addRow();
    worksheet.addRow();

//global table
    let header ={Months:"1",Income:"",Expense:"",Balance:""}
    let tableHeader = worksheet.addRow(Object.keys(header));
    tableHeader.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })
    globalData.forEach(ele=>{
        let row = worksheet.addRow(ele);
        let difference = row.getCell(4);


        let color = 'FF99FF99';
        if (difference.value < 0) {
          color = 'ff0000'
        }
        else {
          color = '008000'

        }

        difference.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        }
      }
    )

    let months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','Totals','Averages']

    

    for (let i=0;i<12;i++) {
      let worksheet2 = workbook.addWorksheet(months[i]);
      worksheet2.mergeCells('A1', 'D1');
      let titleRow2 = worksheet2.getCell('A1');
      titleRow2.value = months[i]+"'s transactions "+year
      titleRow2.font = {
        name: 'Calibre',
        size: 30,
        underline: 'single',
        bold: true,
        color: { argb: '4167B8' }
      }
      titleRow2.alignment = { vertical: 'middle', horizontal: 'center' }

      worksheet2.addRow();
      worksheet2.addRow();
      let balanceCell = worksheet2.getCell('E4');
      balanceCell.value = "Balance :";
      balanceCell.font = {
        name: 'Calibre',
        size: 12,
        bold: true
      }
      let balanceCell2 = worksheet2.getCell('F4');
      balanceCell2.value = balances[i]
      balanceCell2.font = {
        name: 'Calibre',
        size: 12,
        bold: true
      }
      balanceCell.alignment = { vertical: 'middle', horizontal: 'center' }


//transactions table
      let header2 ={Date:"1",Type:"",Details:"",Income:"",Expense:"",Account:""}
      let tableHeader2 = worksheet2.addRow(Object.keys(header2));
      tableHeader2.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4167B8' },
          bgColor: { argb: '' }
        }
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFF' },
          size: 12
        }
      })
      if(monthsData[i]!=undefined && monthsData[i][0].length !=1 ) {

        monthsData[i].forEach(ele=>{
            let row = worksheet2.addRow(ele);
            let difference = row.getCell(4);
            let expense= row.getCell(5);


            let color = '';
            let color2=''
            if (difference.value>0) {
              color = '008000'

            }
            else {color = 'FFFFFF'}
            if(expense.value>0) {
              color2='FF0000 '
            }
            else {
              color2='FFFFFF'
            }
            difference.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: color }
            }
            expense.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: color2 }
            }
          }
        )

      }

      for (let j = 0; j < worksheet2.columns.length; j += 1) {
        let dataMax = 0;
        const column = worksheet2.columns[j];
        for (let k = 1; k < column.values.length; k += 1) {

          const columnLength = String(column.values[k]).length;
          if (columnLength > dataMax) {
            dataMax = columnLength;
          }
        }
        column.width = dataMax < 10 ? 10 : dataMax;
      }
    }
    for (let j = 0; j< worksheet.columns.length; j+= 1) {
      let dataMax = 0;
      const column = worksheet.columns[j];
      for (let k = 1; k < column.values.length; k += 1) {

        const columnLength = String(column.values[k]).length;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      }
      column.width = dataMax < 10 ? 10 : dataMax;
    }
    //end cell size
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, title + '.xlsx');})

  }
  exportAsXLSX(): void {
    let title ="Cash Flow Statement Of "+this.default
    
    let exemple  = { id:"", income :0,expense :0,balance:0}
    let tabSource=[]

    this.tabSource.forEach(row=>{
      type ObjectKey = keyof typeof row;
      const myVar1 = 'id' as ObjectKey;
      if(row[myVar1]!='Averages' && row[myVar1]!='Total') {
        exemple.id = this.toMonthName(Number(row[myVar1]))
      }
      else {         exemple.id =row[myVar1]
      }
      type ObjectKey2 = keyof typeof row;
      const myVar2 = 'totalincome' as ObjectKey2;
      exemple.income = row[myVar2]
      type ObjectKey3 = keyof typeof row;
      const myVar3 = 'totalexpense' as ObjectKey3;
      exemple.expense = row[myVar3]
      type ObjectKey4 = keyof typeof row;
      const myVar4 = 'totalbalance' as ObjectKey4;
      exemple.balance = row[myVar4]
      tabSource.push(Object.values(exemple))
      
    })
    
        
          this.exportExcelCashFlow(title,tabSource,this.monthData,this.default,this.balances)
        
   


    
    
    
    
  }
  //help window
  openWindow() {
    this.ws.open(GlobalHelpComponent, { title: `Help` });
  }
  
  //
  
  
  
  selectedItemNgModel;

  month:number;
  year :number =this.default;
  transition : boolean =false;

 
  yearChange (event) {
    this.balances=[]
    this.transition=true;
    this.default=event
    this.year= event;
    
    this.ts.getGlobal(this.year,this.defaultMonth).subscribe((data:GlobalTransactions[]) => {
      this.param =this.year;
      this.tabSource= data;
      this.tabSource.sort((a,b) => a.id - b.id)
      this.tabSource.forEach(obj=>{
        if (obj.id <13) {
          this.balances.push(obj.totalbalance)


        }
      })
      this.myChart = new Chart('balance', {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],

          datasets: [{
            label: 'Balance',
            data: this.balances,
            fill:false,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [

              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend :{
            labels :{
              fontColor: "black"
            }

          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }]



          }
        }
      });
      
    })
    


  }
  selectedItem = 2022
  list: number [] = []
  uni: number [] = []
  avgIncome: number=0;
  avgExpense: number=0
  avgBalance: number=0
  compt: number = 1;
  dt: Date;

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  types  = [{title :'Salary', value :'Salary'},{title:'Invoices', value :'Invoices'},{title:'Withdrawal',value:'Withdrawal'},{title:'Sales',value :'Sales'},{title:'Rent_wages',value :'Rent_wages'},{title:'Purchases',value:'Purchases'},{title:'Food',value :'Food'},{title:'Rent',value:'Rent'},{title:'OIM_Investments',value:'OIM_Investments'},{title:'Commissions',value :'Commissions'},
    {title:'Own_Funds',value:'Own_Funds'},{title:'Furniture_purchase',value :'Furniture_purchase'},{title:'Broker',value :'Broker'},{title:'IT',value :'IT'},{title :'Consulting',value :'Consulting'},{title:'Accessories',value :'Accessories'},{title:'Water',value :'Water'},{title :'Electricity',value:'Electricity'},
   { title:'Phone',value :'Phone'},{title:'Internet', value :'Internet'},{title:'Enterprise_Creation',value :'Enterprise_Creation'},{title:'Other',value:'Other'}]
  
 
  array =[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050
]

  

  
  
  
}
