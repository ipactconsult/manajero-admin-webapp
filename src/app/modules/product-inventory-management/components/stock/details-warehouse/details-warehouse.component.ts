import { Component, OnInit } from '@angular/core';
import {WarehouseService} from "../../../services/warehouse/warehouse.service";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {Router} from "@angular/router";
import moment from "moment";
import {Location} from "@angular/common";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";

@Component({
  selector: 'ngx-details-warehouse',
  templateUrl: './details-warehouse.component.html',
  styleUrls: ['./details-warehouse.component.scss']
})
export class DetailsWarehouseComponent implements OnInit {
  
  existedW: Warehouse = new Warehouse();
  moment: any = moment;
  allMaterials: Material[] = [];
  materialsByWarehouse: Material[] = [];

  constructor(private warehouseService: WarehouseService, private router: Router,
              private location: Location, private materialService: MaterialService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.warehouseService.getOneWarehouse(this.router.url.replace("/pim/stock/warehouse/", ""))
      .subscribe(warehouse => {
        this.existedW = warehouse;
        this.materialService.getAllMaterials().subscribe(materials => {
          this.allMaterials = materials;
          for (let m = 0; m < this.allMaterials.length; m++) {
            if (this.allMaterials[m].warehouse?.warehouseId === this.existedW.warehouseId) {
              this.materialsByWarehouse.push(this.allMaterials[m]);
            }
          }
        })
      });
  }

}
