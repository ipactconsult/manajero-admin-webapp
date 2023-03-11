import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../models/Customer';
import {Deals} from '../../../models/Deals';
import {CustomerService} from '../../../services/customers/customer.service';
import {DealsService} from '../../../services/deals/deals.service';
import {ActivatedRoute} from '@angular/router';
import {VisitService} from '../../../services/visits/visit.service';

@Component({
  selector: 'ngx-prospect-detail',
  templateUrl: './prospect-detail.component.html',
  styleUrls: ['./prospect-detail.component.scss']
})
export class ProspectDetailComponent implements OnInit {

 idUri: string = '';
  customer: Customer = new Customer();
  visits;
  dataDeals: Deals [] = [];

  constructor(private cs: CustomerService, private ds: DealsService, private activatedroute: ActivatedRoute, private vs: VisitService) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.cs.getCustomerById(this.idUri).subscribe(data => {
      this.customer = data;
      error => console.log(error);
    });

  }

}
