import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from '@nebular/theme';
import {Router} from '@angular/router';
import {Journal} from "../../models/journal.model";
import {JournalService} from "../../services/journal/journal.service";
import {Invoice} from "../../models/invoice.model";


@Component({
  selector: 'ngx-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss']
})
export class JournalListComponent implements OnInit {
  


  customer: Journal = new Journal();
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  dataJournals: Journal [] = [];
  
  options = [
    {key: 1, value: 'Prospect'},
    {key: 2, value: 'Lead'},
    {key: 3, value: 'Client'},
  ];


  constructor(private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private js: JournalService) { }

  ngOnInit(): void {
    this.getAllJournals();

  }
  getAllJournals(){
    this.js.getAll().subscribe(
      (data: Journal[]) => {
        this.dataJournals = [] ;
        for (let p = 0; p < data.length; p++) {
          if (data[p].archived === false) {
            this.dataJournals.push(data[p]);
          }
        }

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
  getJournalsDesc() {
    this.js.findAllJournalDesc().subscribe(
      (data: Journal[]) => {
        this.dataJournals = [] ;
        for (let p = 0; p < data.length; p++) {
          if (data[p].archived === false) {
            this.dataJournals.push(data[p]);
          }
        }
       
      }, 
    );
  }

  getJournalsAsc() {
    this.js.findAllJournalAsc().subscribe(
      (data: Journal[]) => {
        this.dataJournals = [] ;
        for (let p = 0; p < data.length; p++) {
          if (data[p].archived === false) {
            this.dataJournals.push(data[p]);
          }
        }
      }, 
    );
  }
  onArchiveConfirm(journal: Journal, ref) {
    this.js.archiveJournal(journal.id).subscribe(
      () => {
        this.showToast('success','info' ,
          'Operation successful!');
        this.dataJournals.splice(this.dataJournals.indexOf(journal), 1);
        ref.close();
      }, errorArchive => {
        this.showToast('danger','error' ,
          'Operation unsuccessful!');
        return errorArchive.error;
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

}
