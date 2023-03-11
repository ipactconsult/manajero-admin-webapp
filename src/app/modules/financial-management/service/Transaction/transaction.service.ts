import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/Transaction';

import {GlobalTransactions} from "../../models/GlobalTransactions";
import {Files} from "../../models/Files";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";
import {FilesInfo} from "../../models/FilesInfo";
import {Router} from "@angular/router";
import {MonthlyChartsData} from "../../models/MonthlyChartsData";
import {Workbook } from 'exceljs/dist/exceljs.min.js';
import * as fs from "file-saver";

import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class  TransactionService  {

  
  httpOptions = {
    headers: new HttpHeaders({
  
      'Content-Type': 'application/json;  charset=utf-8 ',      
    }),
  };

  private Url = 'https://manazelo-finance-back.herokuapp.com/transaction';
  private urlToFile = 'https://manazelo-finance-back.herokuapp.com';

  constructor(private httpclient:HttpClient, private router: Router) { 
    
  }

  public addTransaction(data): Observable<Transaction> {
    return this.httpclient.post<Transaction>(`${this.Url}/createTransaction/`,data,this.httpOptions);
  }
 public getAllTransactions () : Observable<Transaction[]> {
   return this.httpclient.get<Transaction[]>(`${this.Url}/retrieveAllTransactions`);
 }
 
  public getByMonthAndYear (month:number,year:number) : Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]> (`${this.Url}/retrieve-transactionByMonth/`+month+`/`+ year);



  }
  
 public getTransactionsByDate (date : string) : Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]> (`${this.Url}/retrieve-transactionByDate/`+date)
 }
 
 public getTransactionsByYear(year : number) :Observable<Transaction[]> {
   return this.httpclient.get<Transaction[]> (`${this.Url}/retrieve-transactionByYear/`+year)

 }

  public removeTransaction(id:string):Observable<any> {
    return this.httpclient.delete(`${this.Url}/removeTransaction/`+id,{responseType: 'text'});
  }
  
  public updateTransaction(data):Observable<Transaction> {
    return this.httpclient.put<Transaction>(`${this.Url}/updateTransaction/`, data,this.httpOptions);
  }
  
  public getGlobal (year :number,month:number): Observable<GlobalTransactions[]> {
    return this.httpclient.get<GlobalTransactions[]>( `${this.Url}/global/`+year+`/`+month)
  }
  
  public addTransactionProofs (file : BinaryType[] ): Observable<Files[]> {

    return this.httpclient.post<Files[]>(`${this.Url}/files/add `, file,this.httpOptions);
  }

  upload(file: File[],transactionDate:Date,transactionDetails:String,uniqueId:String): Observable<HttpEvent<any>> {
    const formData:any = new FormData();
    formData.append('files', file);
    formData.append('date',transactionDate);
    formData.append('details',transactionDetails);
    formData.append('uniqueId',uniqueId);
    const req = new HttpRequest('POST', `${this.Url}/files/add`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpclient.request(req);
  }
  
  getFilesInfo (month:number,year:number) :Observable<FilesInfo[]> {
    return this.httpclient.get<FilesInfo[]>(`${this.Url}/FilesResponses/byMonthAndYear/`+month+`/` +year);
  }
  
  
  downloadFile (title: string)  {
   
    window.location.href=`${this.Url}/files/`+title
    
    
  }
  public removeFileResponse(id:string):Observable<any> {
    return this.httpclient.delete(`${this.Url}/files/removeFileResponse/`+id,{responseType: 'text'});
  }
  getMonthlyChartsData (month:number,year:number):Observable<MonthlyChartsData[]> {
    return this.httpclient.get<MonthlyChartsData[]>(`${this.Url}/FilteredMbc/`+month+`/`+year);
  }
  
  getTransactionFiles (date:String,details:string):Observable<FilesInfo[]> {
    return this.httpclient.get<FilesInfo[]>(`${this.Url}/FilesResponses/byDateAndDetails/`+date+`/` +details);

  }



  
  //reconciliation
  getNonReconciledTransactions ():Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]>(`${this.Url}/nonReconciledTransactions`);
  }
  getReconciledTransactions ():Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]>(`${this.Url}/reconciledTransactions`);
  }

  getNonReconciledFiles ():Observable<FilesInfo[]> {
    return this.httpclient.get<FilesInfo[]>(`${this.urlToFile}/files/nonReconciledFiles`);
  }
  getReconciledFiles ():Observable<FilesInfo[]> {
    return this.httpclient.get<FilesInfo[]>(`${this.urlToFile}/files/reconciledFiles`);
  }
  reconcileTransaction(id:string) :Observable<Transaction> {
    return this.httpclient.put<Transaction>(`${this.Url}/reconcileTransaction`+`/`+id ,this.httpOptions)
  }
  reconcileFile(data) :Observable<Transaction> {
    return this.httpclient.put<Transaction>(`${this.Url}/files/reconcileFile`,data,this.httpOptions)
  }
  
  //export excel
  
  exportReconciliation (reconciled,nonReconciled,title,lastDate,globalBalance,statementBalance) {
    let workbook = new Workbook();
    let worksheet= workbook.addWorksheet(title);
    worksheet.mergeCells('D1', 'H3');
    let titleRow = worksheet.getCell('D1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '4167B8' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.mergeCells('A4', 'B4');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('A4');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }
    
    
    let titleRow2 = worksheet.getCell('A6');
    titleRow2.value = "System Balance on " + lastDate +" :"
    
    titleRow2.font = {
      name: 'Calibre',
      size: 12,
      
      
      color: { argb: '4167B8' }
    }
    let gBalance =worksheet.getCell('B6')
    gBalance.value=globalBalance
    let color1 =""
    if (globalBalance == statementBalance) {
      color1 ="008000"
    }
    else {
      color1 ="FF0000"
    }
    gBalance.font={
      name: 'Calibre',
      size: 12,
      color:{argb:'FFFFFF'}
     
    }
    gBalance .fill= {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color1 }



    }
    worksheet.addRow();
    let header ={Date:"1",Type:"",Details:"",Balance:"",Account:""}
    let header1 ={Date:"1",Type:"",Details:"",Balance:"",Account:""}

    let tableHeader = worksheet.addRow(Object.keys(header1));
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
    nonReconciled.forEach(ele=>{
        const row = worksheet.addRow(ele);
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
    worksheet.addRow()
    
    let titleRow3= worksheet.getCell('G6')
    titleRow3.value="Statement Balance on "+lastDate +" :"
    titleRow3.font = {
      name: 'Calibre',
      size: 12,
      
      
      color: { argb: '4167B8' }
    }
    let sBalance =worksheet.getCell('H6')
    sBalance.value=statementBalance

    let color2 =""
    if (globalBalance == statementBalance) {
      color2 ="008000"
    }
    else {
      color2 ="FF0000"
    }
    sBalance.font={
      name: 'Calibre',
      size: 12,
      color:{argb:'FFFFFF'}

    }
    sBalance .fill= {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color2 }



    }
    let b=7
    const headerRow= worksheet.getRow(8);
       
    (Object.keys(header) as (keyof typeof header)[]).forEach((key, index) => {
      headerRow.getCell(b).value=key
      b++;
    });
    headerRow.eachCell((cell, number) => {
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
    let k:number=9;
    reconciled.forEach(elem=>{
      let a=7
      const row = worksheet.getRow(k);
        (Object.keys(elem) as (keyof typeof elem)[]).forEach((key, index) => {
          row.getCell(a).value=elem[key]
          a++;
        });        let difference = row.getCell(10);
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
        k++;
      }

    )
    let totalLenghts= 12 + nonReconciled.length
    let legendCell1 = worksheet.getCell('C'+totalLenghts);
    legendCell1.value="Risky Value"
    legendCell1.fill ={
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ff0000' }
    }
    let legendCell2 = worksheet.getCell('B'+totalLenghts);
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
      fs.saveAs(blob, title + '.xlsx');})
    



  }
  
  //Income Statement

  getTransactionsByDateRange (minDate: string,maxDate:string):Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]>(`${this.Url}/transactionsByDateRange/`+minDate+'/'+maxDate);
  }

  exportIncomeStatement (expense,income,title,period) {
    let workbook = new Workbook();
    let worksheet= workbook.addWorksheet(title);
    worksheet.mergeCells('A1', 'E2');
    let titleRow = worksheet.getCell('C1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 17,
      underline: 'single',
      bold: true,
      color: { argb: '4167B8' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
   
    let d = new Date();
    let date = new DatePipe('en-EN').transform(d, 'mediumDate' )
    let dateCell = worksheet.getCell('A3');
    dateCell.value = "Created on : " +date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    
    let periodCell = worksheet.getCell('A4');
    periodCell.value = period
    periodCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }

    let expenseCell = worksheet.getCell('A6');
    expenseCell.value = "Income"
    expenseCell.font = {
      name: 'Calibri',
      size: 14,
      bold: true,
      underline: 'single',
      color: { argb: '4167B8' }
    }
    worksheet.addRow();
    let header ={Date:"1",Type:"",Details:"",Balance:"",Account:""}
    
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
    income.forEach(ele=>{
        let row = worksheet.addRow(ele);
      console.log(row)
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
    worksheet.addRow()
    
    let length =income.length+10

    let titleRow3= worksheet.getCell('A'+length)
    titleRow3.value="Expense"
    titleRow3.font = {
      name: 'Calibri',
      size: 14,
      bold: true,
      underline: 'single',
      color: { argb: '4167B8' }
    }
    worksheet.addRow()
    let header1 ={Date:"1",Type:"",Details:"",Balance:"",Account:""}
    let tableHeader1 = worksheet.addRow(Object.keys(header1));
    tableHeader1.eachCell((cell, number) => {
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
    expense.forEach(ele=>{
        let row = worksheet.addRow(ele);
        let difference = row.getCell(4);
        let color = 'FF99FF99';
        
        let type= row.getCell(2)
      
      if (type.value =='Net Income')
        type.fill ={
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '808080' }
        
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
    let totallengths = 15+expense.length+income.length
    let legendCell1 = worksheet.getCell('B'+totallengths);
    legendCell1.value="Expense"
    legendCell1.fill ={
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ff0000' }
    }
    let legendCell2 = worksheet.getCell('C'+totallengths);
    legendCell2.value="Income"
    legendCell2.fill ={
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '008000' }
    }
    let legendCell3= worksheet.getCell('D'+totallengths);
    legendCell3.value="Net Income"
    legendCell3.fill ={
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '808080' }
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
      fs.saveAs(blob, title + '.xlsx');})




  }  
  
  //risk 

  public getOperatingTransactions(year : number) :Observable<GlobalTransactions[]> {
    return this.httpclient.get<GlobalTransactions[]> (`${this.Url}/operatingTransactions/`+year)

  }
  public getEmployeeNumber() :Observable<Number> {
    return this.httpclient.get<Number> (`https://employees-hcm-manazello.herokuapp.com/employee/count_emps`)

  }
  
 /* exportExcelCashFlow(title,globalData,monthsData,year,balances) {
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
    
    
    
   console.log(monthsData)
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
      console.log(monthsData)
      if( monthsData[i][0].length !=1) {

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

  }*/
  
}
