import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from '@nebular/theme';
import {Quotation} from '../../../models/Quotation';
import {QuotationService} from '../../../services/quotations/quotation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-table-quotations',
  templateUrl: './table-quotations.component.html',
  styleUrls: ['./table-quotations.component.scss']
})
export class TableQuotationsComponent implements OnInit {

   //toaster config begin
    config: NbToastrConfig;
    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';
    //toaster config end

  //declare quotations list
  dataQuotations: Quotation[]=[];
  
  //declare search input var
  search: string="";
  
    //current 1 nubmer for pagination
  current: number = 1;
  
    //pageSize for data items in page
  pageSize: number=9;
  
  constructor(private quotationService : QuotationService,
                      private router: Router,
                  private toastrService: NbToastrService, 

  ) { }

  ngOnInit(): void {
    this.getAllQuotations();
  }
  
  getAllQuotations(){
    this.quotationService.getQuotations().subscribe((data : Quotation[])=>{
      this.dataQuotations= data;
    });
  }

  approveQuotation(quotation: Quotation, id: string){
    this.quotationService.approveQuotation(quotation,id).subscribe(
      (res) => {
        this.showToast('success', 'Update', 'Quotation approved by client!!');
        this.router.navigate(['/crm/quotations']).then(() => {
          this.getAllQuotations();
        
    });
      });
    }

     //toast notification for alert
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
