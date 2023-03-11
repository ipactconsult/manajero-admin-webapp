import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Deals} from '../../../models/Deals';
import {DealsService} from '../../../services/deals/deals.service';

@Component({
  selector: 'ngx-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.scss']
})
export class DealsDetailsComponent implements OnInit {
  date;
  idUri : string="";
  deal: Deals= new Deals();
  constructor(private datePipe: DatePipe, private activatedroute: ActivatedRoute, private ds: DealsService) { }

  ngOnInit(): void {
       this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id')
      });
      
      this.ds.getDealById(this.idUri).subscribe(data=>{
        this.deal= data;
        error=>console.log(error);
      })
    
  
    
  }
  getDate() {
    this.date = new Date();
    const latest_date = this.datePipe.transform(this.date, 'dd-MM-yyyy');
  }
}
