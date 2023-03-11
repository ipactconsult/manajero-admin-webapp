import { Component, OnInit } from '@angular/core';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {Inventory} from "../../../models/inventory/inventory";
import {Router} from "@angular/router";
import moment from "moment";
import {Location} from "@angular/common";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {
  
  existedInv: Inventory = new Inventory();
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private invService: InventoryService, private router: Router,
              private location: Location, private toastrService: NbToastrService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.invService.getOneInventory(this.router.url.replace("/pim/stock/inventory/", ""))
      .subscribe(inventory => {
        this.existedInv = inventory;
      }, errorInv => {
        this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

}
