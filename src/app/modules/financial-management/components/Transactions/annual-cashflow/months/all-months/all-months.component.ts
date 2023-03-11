import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {DateTypeComponent} from "../Utils/Editors/date-type/date-type.component";
import {DetailsTypeComponent} from "../Utils/Editors/details-type/details-type.component";
import {NumberTypeComponent} from "../Utils/Editors/income-type/number-type.component";
import {ExpenseTypeComponent} from "../Utils/Editors/expense-type/expense-type.component";
import {TransactionService} from "../../../../../service/Transaction/transaction.service";
import {Transaction} from "../../../../../models/Transaction";
import {ActivatedRoute,  Router} from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {ExportService} from "../../../../../../../shared/exports/export.service";
import {MonthsHelpComponent} from "../../../transactions-utils/months-help/months-help.component";
import {GlobalTransactions} from "../../../../../models/GlobalTransactions";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {v4 as uuidv4} from 'uuid';
import {FilesInfo} from "../../../../../models/FilesInfo";
import {MonthlyChartsData} from "../../../../../models/MonthlyChartsData";
import Chart from "chart.js";
import {SelectAccountsComponent} from "../Utils/Editors/select-accounts/select-accounts.component";
import {SelectTypeComponent} from "../Utils/Editors/select-type/select-type.component";


@Component({
  selector: 'ngx-all-months',
  templateUrl: './all-months.component.html',
  styleUrls: ['./all-months.component.scss']
})
export class AllMonthsComponent implements OnInit {

  constructor(private ws:NbWindowService ,private exportService : ExportService ,private ts :TransactionService , private route :ActivatedRoute,private router: Router, private toastrService: NbToastrService) {
     }


  source =[];
  yeaar :number;
  moonth :number;
  monthName: string;
  balance:number=0;
  dateList =new Set();
  detailsList=[];
  selectedDate;
  selectedDetails=""
  message=""
  chartData =[]
  chartDates=[]
  chartBalance=[]
  myChart : Chart;
  
  // on date select on date list
  onChange(value) {
    this.detailsList =[];
    this.ts.getByMonthAndYear(this.moonth,this.yeaar).subscribe(
      (data:Transaction[]) => {
        this.source=data;
        this.source.forEach(obj=> {
          let raw = new Date(obj.date);

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          if(formatted ==value) {
            this.detailsList.push(obj.details)
          }
        })

      }
    )
    this.selectedDate=value.toString()
  }
  //on details selected
  onDetailsChange(value){
    this.selectedDetails=value
  }
  //
//upload
  selectedFiles: FileList;
  progressInfos = [];
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  myuuid ;

  uploadFiles() {
    this.myuuid=uuidv4();
    if (this.selectedFiles==null) {
      this.action("danger","Success", "Please add a file");

    }
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
    
    
  }


  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.ts.upload(file,this.selectedDate,this.selectedDetails,this.myuuid).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          this.action("success","Success", "File Added");
          setTimeout(()=>{this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([this.router.url]);},2700)

        } else if (event instanceof HttpResponse) {
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
        this.action("danger","Error", "An error has occured");

      });
  }
  //
  filesSize;
  tSize;
  filesSource;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{
      this.yeaar = Number(params.get("year"));
      this.moonth = Number(params.get("month"));
      
      
      this.ts.getGlobal(this.yeaar,this.moonth).subscribe( (data:GlobalTransactions[])=> {
        data.forEach( obj=> {
          if (Number(obj.id) == this.moonth) {
            this.balance= obj.totalbalance;
            
          }
        } ) 
        
        
      })
      this.ts.getFilesInfo(this.moonth,this.yeaar).subscribe((data:FilesInfo[])=> {
        this.filesSource=data;
        this.filesSize=this.filesSource.length

      })
      
      
      this.ts.getByMonthAndYear(this.moonth,this.yeaar).subscribe(
        (data:Transaction[]) => {
          this.source=data;
          this.tSize =this.source.length

          this.source.forEach(obj=> {
            let raw = new Date(obj.date);

            let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
            
            this.dateList.add(formatted)
          })
          
        }
      )
     
      switch(this.moonth) {
        case 1: {
          this.monthName="January"
          break;
        }
        case 2: {
          this.monthName="February"
          break;
        }
        case 3: {
          this.monthName="March"
          break;
        }
        case 4: {
          this.monthName="April"
          break;
        }
        case 5: {
          this.monthName="May"
          break;
        }
        case 6: {
          this.monthName="June"
          break;
        }
        case 7: {
          this.monthName="July"
          break;
        }
        case 8: {
          this.monthName="August"
          break;
        }
        case 9: {
          this.monthName="September"
          break;
        }
        case 10: {
          this.monthName="October"
          break;
        }
        case 11: {
          this.monthName="November"
          break;
        }
        case 12: {
          this.monthName="December"
          break;
        }
      }
      this.ts.getMonthlyChartsData(this.moonth,this.yeaar).subscribe((data:MonthlyChartsData[]) => {
        this.chartData=data
        
        this.chartData.forEach( ele=>{
          ele.date= new Date (ele.date)
        })
        this.chartData.sort((a,b) => a.date.getDate() - b.date.getDate());
        
        this.chartData.forEach(ele=> {
          this.chartDates.push(new DatePipe('en-EN').transform(ele.date, 'mediumDate' ))
          this.chartBalance.push(ele.balance)
          
        })
        this.myChart = new Chart('balance', {
          type: 'line',
          data: {
            labels: this.chartDates,

            datasets: [{
              label: 'Balance',
              data: this.chartBalance,
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
        })
        
      })
    
    });
    
    



  }
  openWindow() {
    this.ws.open(MonthsHelpComponent, { title: `Help` });
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
  deleteTransaction (event) {

    this.ts.removeTransaction(event.data.id).subscribe(result => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.action("success","Success", "Transaction deleted");
        this.route.paramMap.subscribe((params) =>{
         
         


        });
        
      },
      (err) => {
        if (err)
          this.action("danger", "Error", "An error has deleted while updating the transaction !")
         



      },)
  }
  upTransaction (event) {
    this.ts.updateTransaction(event.newData).subscribe(result=> {
        this.action("success","Success", "Transaction updated");
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        
        

      },
      (err) => {
        if (err)
          this.action("danger", "Error", "An error has occured while updating the transaction !")



      },)
  }
  createTransaction (event) {

    this.ts. addTransaction(event.newData).subscribe ( result => {
        this.action("success","Success", "Transaction created");

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      

        
         


      },
      (err) => {
        if (err)
          this.action("danger", "Error", "An error has occured while adding the transaction !")



      },
    )
  }
  //end crud

 
  
  //export 
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.source, this.monthName +`'s transactions`);
  }
  //end export
   //table settings
  
  //transactions:
  Settings ={

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


      date: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        },

        editor : {type :'custom', component: DateTypeComponent},


      },
      type: {
        title: 'Type',
        type: 'html',
        
        editor:{
          type :'custom', component:SelectTypeComponent
        },
        valuePrepareFunction: (category) => {
          switch (category) {
            case "Operating": {
              return `<h5><span class="badge badge-primary">${category} </span></h5>`;
            }
            case "Non Operating": {
              return `<h5><span class="badge badge-info">${category} </span></h5>`;
            }}}
        

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
      }
     





    },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  
  //files 
  deleteFile(event) {
    this.ts.removeFileResponse(event.data.id).subscribe((result)=>{
        this.action("success","Success", "File Deleted");
        setTimeout(()=>{this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);},2700)
      
    },
    (err)=>{
      this.action("danger","Error","Error has occured !")
      setTimeout(()=>{this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);},2700)

    })
  }
  onDownload(event) {
    
    this.ts.downloadFile(event.data.fileId);
  }
  filesTableSettings ={

    
    actions :{
      
      add :false,
      
      
      
    },
    mode:'external',
    edit: {
      editButtonContent: '<i class="fas fa-download"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :true,
      inputClass: 'Transaction'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideSubHeader: true ,

    columns :{
      title : { 
        title :'Files names',
        type :'string'
        
      },
      date: {
        title: 'Transaction Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        },



      },

      details: {
        title: 'Transaction Details',
        type: 'string',

      },
      
    },
    pager :{
      display :true,
      perPage: 5,
    }
  }


  //end tables settings
  
  // selects : a revoir
  globalSelect() {
    this.router.navigateByUrl('/finance/annualCashFlow')
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  
  januarySelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/1/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];
    
  }
  februarySelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/2/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

 
    
  }
  marchSelect () {

    this.router.navigateByUrl('/finance/annualCashFlow/months/3/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];
  }
  aprilSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/4/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  maySelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/5/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  juneSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/6/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  julySelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/7/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  augustSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/8/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  septemberSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/9/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  octoberSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/10/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  novemberSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/11/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }
  decemberSelect () {
    this.router.navigateByUrl('/finance/annualCashFlow/months/12/'+this.yeaar)
    this.chartData =[];
    this.chartBalance=[];
    this.chartDates =[];

  }




}
