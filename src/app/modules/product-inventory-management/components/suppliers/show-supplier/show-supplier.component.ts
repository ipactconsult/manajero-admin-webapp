import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import {Supplier} from "../../../models/supplier/supplier";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier/supplier.service";

@Component({
  selector: 'ngx-show-supplier',
  templateUrl: './show-supplier.component.html',
  styleUrls: ['./show-supplier.component.scss']
})
export class ShowSupplierComponent implements OnInit {
  
  existedSupplier: Supplier = new Supplier();
  completedState1 = true;
  moment: any = moment;
  mailTo: String = 'mailto:';

  constructor(private supplierService: SupplierService, private location: Location,
              private router: Router) { }
  
  goToPreviousRoute(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.supplierService.getOneSupplier(this.router.url
      .replace('/pim/supplier/', '')).subscribe((supplier) => {
        this.existedSupplier = supplier;
    })
  }

}
