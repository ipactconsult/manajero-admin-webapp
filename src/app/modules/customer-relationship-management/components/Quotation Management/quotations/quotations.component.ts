import { Component, OnInit } from '@angular/core';
import {QuotationService} from '../../../services/quotations/quotation.service';
import {Quotation} from '../../../models/Quotation';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from '@nebular/theme';
import {Router} from '@angular/router';
import {VisitService} from '../../../services/visits/visit.service';
import {ExportService} from '../../../../../shared/exports/export.service';

@Component({
  selector: 'ngx-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {

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
  dataVisits: any[];
  properties: Object;
  
  constructor(private quotationService : QuotationService,
                      private router: Router,
                  private vs: VisitService,
                                  private exportService: ExportService,

                  private toastrService: NbToastrService, 

  ) { }
//export data prospects as excel file
    exportAsXLSX(): void {
        this.exportService.exportAsExcelFile(this.dataQuotations, 'dataCustomers');
    }

  ngOnInit(): void {
    this.getAllQuotations();
      //properties data
        this.vs.findAllProperties().subscribe(
      (data) => {
        this.properties = data;

      }, error => console.log(error)
    );
      
     this.vs.getAllVisitsNonArchived()
      .subscribe(
        (data: any[]) => {
          this.dataVisits = data;
        }
      );
  }
  
  getAllQuotations(){
    this.quotationService.getQuotations().subscribe((data : Quotation[])=>{
      this.dataQuotations= data;
    });
  }
  
  filterByStatus(e) {
    this.quotationService.getQuotations().subscribe(
      (data: Quotation[]) => {
        this.dataQuotations = [];
        this.dataQuotations = data.filter(
          (q =>
              q.status === e
          )
        );
      }, (err) => {
        return err;
      });
  }
filterByVisit(e) {
    this.quotationService.getQuotations().subscribe(
      (data: Quotation[]) => {
        this.dataQuotations = [];
        this.dataQuotations = data.filter(
          (q =>
              q?.visit?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }

filterByProperty(e) {
    this.quotationService.getQuotations().subscribe(
      (data: Quotation[]) => {
        this.dataQuotations = [];
      
        this.dataQuotations = data.filter(
          (q =>
                // @ts-ignore
              q?.visit?.property?.propertyId === e
          )
        );
      }, (err) => {
        return err;
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
