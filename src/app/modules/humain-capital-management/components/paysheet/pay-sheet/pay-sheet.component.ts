import { Component, OnInit } from '@angular/core';
import {PayService} from "../../../services/payService/pay.service";
import {ActivatedRoute} from "@angular/router";
import {Pay} from "../../../models/Pay";

@Component({
  selector: 'ngx-pay-sheet',
  templateUrl: './pay-sheet.component.html',
  styleUrls: ['./pay-sheet.component.scss']
})
export class PaySheetComponent implements OnInit {
id : string="";
pay: Pay= new Pay();
  constructor(private ps: PayService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.ps.findOne(this.id).subscribe((data : Pay)=>{
      this.pay=data;
    },error => {console.log(error)})
  }

}
