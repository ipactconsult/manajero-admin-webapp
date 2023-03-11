import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../../models/Contract';
import { ContractService } from '../../../services/contractServices/contract.service';

@Component({
  selector: 'ngx-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

  contract : Contract;
  id : string;
  constructor(private cs : ContractService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.contract = new Contract();
    this.id = this.route.snapshot.params["id"];
    this.getContractDetails();
  }

  getContractDetails()
  {
    this.cs.getContract(this.id).subscribe(
      (data)=> {this.contract = data;},
      (err) => {console.log(err);}
    )
  }

}
