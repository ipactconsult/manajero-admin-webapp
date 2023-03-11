import {Component,  Input, OnInit, } from '@angular/core';
import {Deals} from '../../../models/Deals';
import {Visit} from '../../../models/visit';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  
} from '@nebular/theme';
import {DealsService} from '../../../services/deals/deals.service';
import {ExportService} from '../../../../../shared/exports/export.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-deals-history',
  templateUrl: './deals-history.component.html',
  styleUrls: ['./deals-history.component.scss']
})
export class DealsHistoryComponent implements OnInit {

 dataDeals: Deals [] = [];
 
  @Input() deal = Deals;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  current: number = 1;
  dataVisits: Visit [] = [];
  pageSize:number=11;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
 
  constructor(private ds: DealsService,private dialogService: NbDialogService,
             
              private exportService: ExportService, private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllDeals();

  }

  getAllDeals() {
    this.ds.getDealByArchive().subscribe(
      (data: Deals[]) => {
        this.dataDeals = data;
      }
    );
  }

 
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataDeals, 'dataDeals');
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
  
  
  onRestoreConfirm(deals: Deals, id: string) {
    this.ds.cancelArchiveDeals(deals,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Deal Restored !!');
         this.getAllDeals();
        this.router.navigate(['/crm/deals']).then(() => {
              this.getAllDeals();
        });
      });
  }


}
