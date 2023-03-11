import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbWindowService,
  NbToastrService,
  NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus
} from '@nebular/theme';
import {DatePipe} from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import {JournalService} from "../../services/journal/journal.service";
import { Journallines } from '../../models/journallines.model';
import { JournallinesService } from '../../services/journalLines/journallines.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../models/account.model';
import { AccountsService } from '../../services/accounts/accounts.service';
import {Journal} from "../../models/journal.model";
import {ExportService} from "../../../../shared/exports/export.service";
import {FilesProof} from "../../models/files-proof.model";
import {FilesProofService} from "../../services/filesProof/files-proof.service";


@Component({
  selector: 'ngx-journal-details',
  templateUrl: './journal-details.component.html',
  styleUrls: ['./journal-details.component.scss']
})
export class JournalDetailsComponent implements OnInit {

  JournalLinesForm!: FormGroup;
  JournalLinesToAdd: Journallines;
  
  date: Date;
  
  term: string ="";
  
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  customColumn = 'wording';
  defaultColumns = ['filesProof', 'account','createdAt','debit', 'credit' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  idUri: string = '';
  journalname: string;
  journal: Journal;

  journallines: Journallines [] = [];
  source: LocalDataSource = new LocalDataSource();

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  

  dataSource: NbTreeGridDataSource<Journallines>;

  accounts: Account [];
  filesProofs: FilesProof [];
  
  totalCredit: number = 0;
  totalDebit: number = 0;
  totalBalance: number = 0;
  tagTotalCredit: String="";
  tagTotalDebit: String="";
  tagTotalBalance: String="";


  @Output() addJournalLineOutputEvent = new EventEmitter<Journallines>();


  constructor(private fps: FilesProofService,
              private datePipe: DatePipe, 
              private exportService: ExportService , 
              private js:JournalService,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute, private formbuilder: FormBuilder, private windowService: NbWindowService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<Journallines>,
    private router: Router,
     private jls: JournallinesService, private as: AccountsService) { 
      this.JournalLinesForm = formbuilder.group({
        wording: ['', Validators.required],
        debit: ['', Validators.required],
        credit: ['', Validators.required],
        account: [null, Validators.required],
        filesProof:[null, Validators.required],
      })
     }
     
     exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.journallines, 'journallines');
  }
  exportAsPDF(): void {
    this.jls.exportByPDF(this.idUri).subscribe(result =>{
          this.showToast('success', 'Exported ! ', 'Journal '+ this.journalname+' has been exported to pdf file in your chosen location !!');
      }
    );
  }
  
     submit() {
    
    
    this.JournalLinesToAdd = {
        wording: this.JournalLinesForm.value.wording,
        debit: this.JournalLinesForm.value.debit,
        credit: this.JournalLinesForm.value.credit,
        account: this.JournalLinesForm.value.account,
        journal: this.journal,
        filesProof: {
          id:this.JournalLinesForm.value.filesProof.id
        },
      }
      this.jls.addJournalLine(this.JournalLinesToAdd).subscribe(result => {
        
      this.showToast('success', 'Add ! ', 'New journal Added !!');
          this.ngOnInit();
    },
      (err) => {
        this.showToast('danger', 'Add ! ', err.error.message);
  
      },
    );
  }


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  
  

  ngOnInit(): void {
        this.date = new Date();
    const latest_date = this.datePipe.transform(this.date, 'MM-dd-yyyy');
    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });
    this.js.getJournalId(this.idUri).subscribe(result =>{
      this.journal = result;
      this.journalname = result.name;
      this.date = this.journal.createdAt;
      this.getDate();
    })
    
    this.fps.getAllTitles().subscribe(
      (data: FilesProof[])=>{
        this.filesProofs = data;
      }
    )
    this.as.getAll().subscribe(
      (data: Account[])=>{
        this.accounts = data;
      }
    )
    this.jls.getAllByJournal(this.idUri).subscribe(
      (data: Journallines[]) => {

        this.journallines = data;
        const _data = data.map(val => (
          
         
          {...val, 
          wording: val.wording ? val.wording : '( no wording )', 
          account: val.account.name, 
          filesProof: val.filesProof?.title ? val.filesProof?.title : 'no file', 
          createdAt: this.datePipe.transform(val.createdAt, 'dd-MM-yyyy')}));
       
        
        const tableData: any[] = _data.map(val => ({data: val}));

        this.dataSource = this.dataSourceBuilder.create(tableData);
           for(let j=0;j<tableData.length;j++){   
       this.totalCredit+= tableData[j].data.credit;
       this.totalDebit+= tableData[j].data.debit;
       this.totalBalance+= tableData[j].data.balance;

  }
                      this.tagTotalBalance ="Total Balance : "+this.totalBalance;
        this.tagTotalDebit ="Total Debit : "+this.totalDebit;
            this.tagTotalCredit ="Total Credit : "+this.totalCredit;
      }
    );

    
    
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
  
  getDate() {
    this.date = new Date();
    const latest_date = this.datePipe.transform(this.date, 'MM-dd-yyyy');
  }
  


}
