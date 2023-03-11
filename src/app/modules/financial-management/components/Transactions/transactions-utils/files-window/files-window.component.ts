import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from "../../../../service/Transaction/transaction.service";
import {DatePipe} from "@angular/common";
import {DataTransferService} from "../../../../service/data-transfer.service";

@Component({
  selector: 'ngx-files-window',
  templateUrl: './files-window.component.html',
  styleUrls: ['./files-window.component.scss']
})
export class FilesWindowComponent implements OnInit {

  constructor(private ts : TransactionService, private dt:DataTransferService) { }
   
  source;
  @Input()
  transactionDate:string;
  transactionDetails:string;
  
  ngOnInit(): void {
    this.dt.date.subscribe(data=>{
      this.transactionDate=data
    })
    this.dt.details.subscribe(data=>{
      this.transactionDetails=data
    })
    this.ts.getTransactionFiles(this.transactionDate,this.transactionDetails).subscribe(result=>{
      this.source = result;
    })
  }
  filesTableSettings ={


    actions :{
     
      add :false,
      delete: false,
      edit:true

    },
    mode:'external',
    edit: {
      editButtonContent: '<i class="fas fa-eye small"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

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

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
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
  onDownload(event) {

    this.ts.downloadFile(event.data.fileId);
  }
}
