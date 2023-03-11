import { Component, OnInit } from '@angular/core';
import {Deals} from '../../../models/Deals';
import {DealsService} from '../../../services/deals/deals.service';
import {Customer} from '../../../models/Customer';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';

@Component({
  selector: 'ngx-deals-customer',
  templateUrl: './deals-customer.component.html',
  styleUrls: ['./deals-customer.component.scss']
})
export class DealsCustomerComponent implements OnInit {
  dataDeals: Deals [] = [];
    idUri: string = '';
      customer: Customer = new Customer();
          //pageSize for data items in page
  pageSize: number=4;  
  //current 1 nubmer for pagination
  currentDeals: number = 1;
  constructor(private cs: CustomerService,private ds: DealsService         ,
              private activatedroute: ActivatedRoute, ) { }

  ngOnInit(): void {
     this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.cs.getCustomerById(this.idUri).subscribe(data => {
      this.customer = data;
      error => console.log(error);
    });


    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => 
        this.dataDeals = data.filter(
          d=>d?.visit?.customer?.id===this.customer.id)
       
        
    
    );
  }

}
