import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { MoneyFlow } from '../../models/MoneyFlow';
import {ForecastMoneyFlow} from "../../models/ForecastMoneyFlow";


import {Workbook } from 'exceljs/dist/exceljs.min.js';
import * as fs from "file-saver";


@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  private Url = 'https://manazelo-finance-back.herokuapp.com';

  constructor(private httpclient:HttpClient) {

  }
  

  public addIncomeMoneyFlow(data): Observable<MoneyFlow> {
    return this.httpclient.post<MoneyFlow>(`${this.Url}/budgets/createIncome/`, data,this.httpOptions);
  }
  public addExpenseMoneyFlow(data): Observable<MoneyFlow> {
    return this.httpclient.post<MoneyFlow>(`${this.Url}/budgets/createExpense/`, data,this.httpOptions);
  }

  public addTax(data): Observable<MoneyFlow> {
    return this.httpclient.post<MoneyFlow>(`${this.Url}/budgets/createTax/`, data,this.httpOptions);
  }
  public getAllMoneyFlow (direction:string,year:number,month:string,type: string): Observable<MoneyFlow[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("direction",direction);
    queryParams = queryParams.append("year",year);
    queryParams = queryParams.append("month",month);
    queryParams = queryParams.append("type",type);

    return this.httpclient.get<MoneyFlow[]>(`${this.Url}/budgets/retrieveAllMoneyFlow`,{params:queryParams})


  }
  public updateExpense(data): Observable<MoneyFlow> {
    return this.httpclient.put<MoneyFlow>(`${this.Url}/budgets/updateExpense/ `, data,this.httpOptions);
  }
  public updateIncome(data): Observable<MoneyFlow> {
    return this.httpclient.put<MoneyFlow>(`${this.Url}/budgets/updateIncome/ `, data,this.httpOptions);
  }

  public updateTax(data): Observable<MoneyFlow> {
    return this.httpclient.put<MoneyFlow>(`${this.Url}/budgets/updateTax/ `, data,this.httpOptions);
  }
  public deleteExpense(id:string): Observable<any>{
    return this.httpclient.delete(`${this.Url}/budgets/removeExpense/`+id, this.httpOptions);
  }
  public deleteIncome(id:string): Observable<any> {
    return this.httpclient.delete(`${this.Url}/budgets/removeIncome/`+id, this.httpOptions);
  }

  public deleteTax(id:string): Observable<any> {
    return this.httpclient.delete<MoneyFlow>(`${this.Url}/budgets/removeTax/`+id,this.httpOptions);
  }
  
  
  
  //Forecast 
  public retrieveForecastMoneyFlowByYear(year:number): Observable<ForecastMoneyFlow[]> {
    return this.httpclient.get<ForecastMoneyFlow[]>(`${this.Url}/budgets/findByYear/`+year);
  }

  public addForecastMoneyFlow(data): Observable<ForecastMoneyFlow> {
    return this.httpclient.post<ForecastMoneyFlow>(`${this.Url}/budgets/createFmf/`, data,this.httpOptions);
  }
  public updateForecastMoneyFlow(data): Observable<ForecastMoneyFlow> {
    return this.httpclient.put<ForecastMoneyFlow>(`${this.Url}/budgets/updateFmf/`, data,this.httpOptions);
  }
  public addForecastTax(data): Observable<ForecastMoneyFlow> {
    return this.httpclient.post<ForecastMoneyFlow>(`${this.Url}/budgets/createForecastTax/`, data,this.httpOptions);
  }
  public updateForecastTax(data): Observable<ForecastMoneyFlow> {
    return this.httpclient.put<ForecastMoneyFlow>(`${this.Url}/budgets/updateForecastTax/`, data,this.httpOptions);
  }
  public deleteForecastFlow(id:string): Observable<any> {
    return this.httpclient.delete(`${this.Url}/budgets/removeForecastFlow/`+id, this.httpOptions);
  }

  public deleteForecastTax(id:string): Observable<any> {
    return this.httpclient.delete<MoneyFlow>(`${this.Url}/budgets/removeForecastTax/`+id,this.httpOptions);
  }
  public retrieveForecastMoneyFlowTotalExpense(year:number): Observable<Number> {
    return this.httpclient.get<Number>(`${this.Url}/forecast/forecastExpenses/`+year);
  }
  
  //excel export
  
 exportExcel(title,expense:MoneyFlow[],income:MoneyFlow[]) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);
    
 
    worksheet.mergeCells('A1', 'D4');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
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
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }
     


   //expense table
   worksheet.mergeCells('A6:C6')
   let titleRow2 = worksheet.getCell('A6');
   titleRow2.value = "Expense"
   titleRow2.font = {
     name: 'Calibre',
     size: 16,
     underline: 'single',
     bold: true,
     color: { argb: '4167B8' }
   }
   worksheet.addRow();
   let header ={Description:"1",Type:"",Actual:"",Budget:"",Difference:""}
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
   console.log(expense.length)
   console.log(income.length)
   expense.forEach(ele=>{
     let row = worksheet.addRow(ele);
       let difference = row.getCell(5);
     let description =row.getCell(1)
     description.font ={
       
       bold :true
     }

     let color = 'FF99FF99';
       if (difference.value > 0) {
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
   worksheet.addRow()

   //income table)
   let elength= expense.length+10
   worksheet.mergeCells('A'+elength.toString()+':'+'C'+elength.toString())
   let titleRow3 = worksheet.getCell('C'+elength.toString());
   titleRow3.value = "Income"
   titleRow3.font = {
     name: 'Calibre',
     size: 16,
     underline: 'single',
     bold: true,
     color: { argb: '4167B8' }
   }
   worksheet.addRow()

   let tableHeader2 = worksheet.addRow(Object.keys(header));
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
   income.forEach(ele=>{
       let row = worksheet.addRow(ele);
       let difference = row.getCell(5);
       let color = 'FF99FF99';
       let color2;
     let description =row.getCell(1)

     if (description.value =="Net Income Before Tax" || description.value=="Net Income")
       {
         color2='4167B8'
       }
       description.font ={
         color :{argb: color2},
         bold :true
       }
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

   let totalLengths =income.length+expense.length+14
   let legendCell1 = worksheet.getCell('E'+totalLengths);
   legendCell1.value="Risky Value"
   legendCell1.fill ={
     type: 'pattern',
     pattern: 'solid',
     fgColor: { argb: 'ff0000' }
   }
   let legendCell2 = worksheet.getCell('F'+totalLengths);
   legendCell2.value="Beneficial Value"
   legendCell2.fill ={
     type: 'pattern',
     pattern: 'solid',
     fgColor: { argb: '008000' }
   }
   //cells size
   console.log(worksheet.columns[1].values.length)
   console.log(typeof (worksheet.columns[1].values[1]))
   for (let i = 0; i < worksheet.columns.length; i += 1) {
     let dataMax = 0;
     const column = worksheet.columns[i];
     for (let j = 1; j < column.values.length; j += 1) {
       
       const columnLength = String(column.values[j]).length;
       if (columnLength > dataMax) {
         dataMax = columnLength;
       }
     }
     column.width = dataMax < 10 ? 10 : dataMax;
   }
   
   
   

   //end cell size
   workbook.xlsx.writeBuffer().then((data) => {
     let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
     fs.saveAs(blob, title + '.xlsx');
   })






   }
   exportExcelForecast(title,data :ForecastMoneyFlow[]) {
     let workbook = new Workbook();
     let worksheet = workbook.addWorksheet(title);
     worksheet.mergeCells('A1', 'P1');
     let titleRow = worksheet.getCell('F1');
     titleRow.value = title
     titleRow.font = {
       name: 'Calibre',
       size: 30,
       underline: 'single',
       bold: true,
       color: { argb: '4167B8' }
     }
     titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
     let d = new Date();
     let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
     let dateCell = worksheet.getCell('A2');
     dateCell.value = date;
     dateCell.font = {
       name: 'Calibre',
       size: 12,
       bold: true
     }
     worksheet.addRow();

     let header ={Description:"1",Direction:"",Type:"",January:"",February:"",March:"",April:"",May:"",June:"",July:"",August:"",September:"",October:"",November:"",December:"",Total:""}
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
     
     data.forEach(ele=>{
       let row = worksheet.addRow(ele);
       let color2;
       let color;       
       let type =row.getCell(3)
       let direction= row.getCell(2)

       if (type.value =="Net Income Before Tax" || type.value=="Net Income")
       {
         color2='4167B8'
       }
       else if (type.value =="Tax") {
         color2='FFFF00'
         
       }
       else if(type.value=="Operating Income" || type.value=="Non Operating Income" || type.value=="Total Operating Income" || type.value=="Total Non Operating Income"|| type.value=="Total Income")
       {
         color2='008000'
       }
       else {
         color2='FF0000'
       }
       if(direction.value =="Income") {
         color ='008000'
         
       }
       else if (direction.value=="Expense") {
         color='FF0000'
       }
       direction.fill={
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color }
       }
         
        type.font= {
         bold:true
        }
       type.fill ={
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color2 }
       }
     })
     let legendCell1 = worksheet.getCell('A23');
     legendCell1.value="Expense"
     legendCell1.fill ={
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: 'ff0000' }
     }
     let legendCell2 = worksheet.getCell('B23');
     legendCell2.value="Income"
     legendCell2.fill ={
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: '008000' }
     }
     let legendCell3= worksheet.getCell('C23');
     legendCell3.value="Tax"
     legendCell3.fill ={
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: 'FFFF00' }
     }
     let legendCell4= worksheet.getCell('D23');
     legendCell4.value="Net"
     legendCell4.fill ={
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: '4167B8' }
     }
     
     //cells size
     console.log(worksheet.columns[1].values.length)
     console.log(typeof (worksheet.columns[1].values[1]))
     for (let i = 0; i < worksheet.columns.length; i += 1) {
       let dataMax = 0;
       const column = worksheet.columns[i];
       for (let j = 1; j < column.values.length; j += 1) {

         const columnLength = String(column.values[j]).length;
         if (columnLength > dataMax) {
           dataMax = columnLength;
         }
       }
       column.width = dataMax < 10 ? 10 : dataMax;
     }
     

     //end cell size
     workbook.xlsx.writeBuffer().then((dataa) => {
       let blob = new Blob([dataa], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
       fs.saveAs(blob, title + '.xlsx');
     })





   }

  public getRiskInfos (year:number) : Observable<MoneyFlow> {
    return this.httpclient.get<MoneyFlow>(`${this.Url}/budgets/riskInfos/`+year);
  }
  
}
