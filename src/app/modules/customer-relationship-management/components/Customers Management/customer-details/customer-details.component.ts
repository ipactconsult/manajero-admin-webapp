import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';
import {Customer} from '../../../models/Customer';
import {VisitService} from '../../../services/visits/visit.service';
import {Deals} from '../../../models/Deals';
import {DealsService} from '../../../services/deals/deals.service';
import {Contract} from '../../../models/Contract';
import {ContractService} from '../../../services/contracts/contract.service';

@Component({
  selector: 'ngx-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  idUri: string = '';
  customer: Customer = new Customer();
  visits;

  dataContracts:Contract[]=[];
  //current 1 nubmer for pagination
  current: number = 1;
    //pageSize for data items in page
  pageSize: number=4;  

    //pageSize for data items in page
  pageSizeDeals: number=4; 
  //current 1 nubmer for pagination
  currentContracts: number = 1;
    //pageSize for data items in page
  pageSizeContracts: number=4;
  constructor(private cs: CustomerService, private ds: DealsService,
              private contractService: ContractService,
              private activatedroute: ActivatedRoute, 
              private vs: VisitService) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.cs.getCustomerById(this.idUri).subscribe(data => {
      this.customer = data;
      error => console.log(error);
    });

    this.vs.getAllLastVisitsNonArchived(this.idUri)
      .subscribe(
        (data) => {
          this.visits = data;
          console.log(data)
        }
      );

    
      this.contractService.getAllContractsNonArchived().subscribe(
      (data: Contract[]) => {
        // @ts-ignore
        this.dataContracts = data.filter(c=>c?.deal?.visit?.customer?.id===this.customer.id);
          
      }, (err) => {
        return err;
      }
    );
  }


}
