import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Pay} from "../../../models/Pay";
import {PayService} from "../../../services/payService/pay.service";
import {ActivatedRoute} from "@angular/router";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from "@nebular/theme";


@Component({
  selector: 'ngx-pay-sheet-form',
  templateUrl: './pay-sheet-form.component.html',
  styleUrls: ['./pay-sheet-form.component.scss']
})
export class PaySheetFormComponent implements OnInit {
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  loading = false;
  payForm : FormGroup;
  pay: Pay = new Pay();
  id : string;
  constructor(private ps : PayService, private route : ActivatedRoute,private toastrService: NbToastrService) { 
    this.payForm = new FormGroup({
      primeConventionnelle : new FormControl('',Validators.required),
      primeNonConventionnelle: new FormControl('')
    })
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params["id"];

  }
  
  calculate(){
    this.ps.addPay(this.pay, this.id).subscribe((res)=>{
        this.showToast("success","SUCCESS","Operation Achieved Successfuly");
    },(err)=>{
      console.log(err);
    })
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Leave Request ${titleContent}`,
      config);
  }


}
