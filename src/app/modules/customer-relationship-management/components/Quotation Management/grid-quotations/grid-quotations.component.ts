import { Component, OnInit } from '@angular/core';
import {Quotation} from '../../../models/Quotation';
import {QuotationService} from '../../../services/quotations/quotation.service';

@Component({
  selector: 'ngx-grid-quotations',
  templateUrl: './grid-quotations.component.html',
  styleUrls: ['./grid-quotations.component.scss']
})
export class GridQuotationsComponent implements OnInit {

 //declare quotations list
  dataQuotations: Quotation[]=[];
  
  //declare search input var
  search: string="";
  
    //current 1 nubmer for pagination
  current: number = 1;
  
    //pageSize for data items in page
  pageSize: number=9;
  
  constructor(private quotationService : QuotationService) { }

  ngOnInit(): void {
    this.getAllQuotations();
  }
  
  getAllQuotations(){
    this.quotationService.getQuotations().subscribe((data : Quotation[])=>{
      this.dataQuotations= data;
    });
  }

}
