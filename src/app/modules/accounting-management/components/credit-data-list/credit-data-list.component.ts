import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Credit} from "../../models/credit.model";
import {CustomerView} from "../../models/customer-view.model";
import {Router} from "@angular/router";
import {ExportService} from "../../../../shared/exports/export.service";
import {CustomerViewService} from "../../services/customerView/customer-view.service";
import {CreditService} from "../../services/credit/credit.service";

@Component({
  selector: 'ngx-credit-data-list',
  templateUrl: './credit-data-list.component.html',
  styleUrls: ['./credit-data-list.component.scss']
})
export class CreditDataListComponent implements OnInit {

  credit: Credit = new Credit();
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
  pageSize: number = 3;


  dataCredits: Credit [] = [];
  clients: CustomerView [] = [];

  constructor(private dialogService: NbDialogService,
              private router: Router,
              private windowService: NbWindowService,
              private toastrService: NbToastrService,
              private cs: CreditService,
              private exportService: ExportService,
              private clientService: CustomerViewService) { }

  ngOnInit(): void {
    this.getAllCredits();
    this.getAllClients();

  }


  getAllCredits(){
    this.cs.getAll().subscribe(
      (data: Credit[]) => {
        this.dataCredits = [] ;
        for (let p = 0; p < data.length; p++) {
          if (data[p].archived === false) {
            this.dataCredits.push(data[p]);
          }
        }
        this.dataCredits.forEach(ele=>{
          ele.taxRate = ele.taxRate * 100 ;
          ele.inflationRate = ele.inflationRate * 100;
        })

      },(err) => {
        return err;
      }
    );
  }
  getCreditByCurrency(e) {
    this.filterByCurrency(e);
  }

  filterByCurrency(e) {
    this.cs.getAll().subscribe(
      (data: Credit[]) => {
        this.dataCredits = [];
        this.dataCredits = data.filter(
          (d =>
              d.currency === e
          )
        );
      }, (err) => {
        return err;
      });
  }

  getCreditByClient(e) {
    this.filterByClient(e);
  }

  filterByClient(e) {
    this.cs.getAll().subscribe(
      (data: Credit[]) => {
        this.dataCredits = [];
        this.dataCredits = data.filter(
          (d =>
              d.clientName === e
          )
        );
      }, (err) => {
        return err;
      });
  }

  getArchived(e) {
    this.filterByArchived(e);
  }

  filterByArchived(e) {
    this.cs.getAll().subscribe(
      (data: Credit[]) => {
        this.dataCredits = [];
        this.dataCredits = data.filter(
          (d =>
              d.archived === e
          )
        );
      }, (err) => {
        return err;
      });
  }


  getAllClients(){
    this.clientService.getAll().subscribe((data: CustomerView[]) => {
      this.clients = data;
    },(err) => {
      return err;
    })
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onArchiveConfirm(credit: Credit, ref) {
    this.cs.archiveCredit(credit.id).subscribe(
      () => {
        this.showToast('success','info' ,
          'Operation successful!');
        this.dataCredits.splice(this.dataCredits.indexOf(credit), 1);
        ref.close();
      }, errorArchive => {
        return errorArchive.error;
      });
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

}
