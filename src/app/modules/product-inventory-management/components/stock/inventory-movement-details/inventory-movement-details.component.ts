import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from "moment";
import {InventoryMovementService} from "../../../services/inventoryMovement/inventory-movement.service";
import {InventoryMovement} from "../../../models/inventoryMovement/inventory-movement";

@Component({
  selector: 'ngx-inventory-movement-details',
  templateUrl: './inventory-movement-details.component.html',
  styleUrls: ['./inventory-movement-details.component.scss']
})
export class InventoryMovementDetailsComponent implements OnInit {

  existedIM: InventoryMovement = new InventoryMovement();
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private imService: InventoryMovementService, private router: Router,
              private location: Location, private toastrService: NbToastrService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.imService.getOneIM(this.router.url.replace("/pim/stock/inventory/movement/", ""))
      .subscribe(im => {
        this.existedIM = im;
      }, errorInv => {
        this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

}
