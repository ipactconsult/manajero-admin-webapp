import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuotationService} from '../../../services/quotations/quotation.service';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {VisitService} from '../../../services/visits/visit.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Quotation} from '../../../models/Quotation';
import {Visit} from '../../../models/visit';

@Component({
  selector: 'ngx-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss']
})

export class AddQuotationComponent implements OnInit {
  
  //Declare quotation form Group
  quotationGroup: FormGroup = new FormGroup({});
    
  //initialize Quotation
  quotation : Quotation= new Quotation();
    
  //initializing data visits list
  dataVisits = [];
    
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  selectedVisit: any;
  
  constructor(private quotationService: QuotationService, 
              private toastrService: NbToastrService, 
              private router: Router,
              private vs: VisitService,
              ) 
  {
    this.quotationGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      visit: new FormControl('',[Validators.required])
    });
  }
  
  
  
  get title() {
    return this.quotationGroup.get('title');
  }  
  
  get comment() {
    return this.quotationGroup.get('comment');
  }

  get visit() {
    return this.quotationGroup.get('visit');
  }

  ngOnInit(): void {
     this.vs.getAllVisitsNonArchived()
      .subscribe(
        (data: any[]) => {
          this.dataVisits = data;
        }
      );
  }
  
  
  onMenuItemSelectedVisit(selectedOne) {
    this.selectedVisit = selectedOne;
  }

  
  //demand quoattion function
  demandQuotation() {
    
        this.quotation.visit = <Visit>{id: this.selectedVisit};

    this.quotationService.demandQuotation(this.quotation).subscribe(result => {
        this.showToast('success', 'Demand ! ', 'Quotation sended Successfully!!');
        this.router.navigateByUrl('/crm/quotations');
      },
      (err: HttpErrorResponse) => {
             this.showToast('danger', 'Demand ! ', 'Something wents wrong!!');
      });
  }
  
   //toast alert notification
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
