import { Component, OnInit } from '@angular/core';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {Inventory} from "../../../models/inventory/inventory";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from "moment";
import {MaterialService} from "../../../services/material/material.service";
import {StockEntryService} from "../../../services/stockEntry/stock-entry.service";
import {InventoryMovementService} from "../../../services/inventoryMovement/inventory-movement.service";
import {Material} from "../../../models/material/material";
import {StockExitService} from "../../../services/stockExit/stock-exit.service";

@Component({
  selector: 'ngx-fix-stock',
  templateUrl: './fix-stock.component.html',
  styleUrls: ['./fix-stock.component.scss']
})
export class FixStockComponent implements OnInit {
  
  existedInv: Inventory = new Inventory();
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  inventoryMovement;
  stockExit;
  stockEntry;
  material;
  disableFixBtn = false;
  countFixed = 0;

  constructor(private invService: InventoryService, private router: Router,
              private location: Location, private toastrService: NbToastrService,
              private materialService: MaterialService, private stockEntryService: StockEntryService,
              private stockExitService: StockExitService, private imService: InventoryMovementService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "IM"+result;
  }

  static getRandomNumberSExit(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "STOCKEXIT"+result;
  }

  static getRandomNumberSEntry(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "STOCKENTRY"+result;
  }

  fixInventory(): void {
    this.invService.fixInventory(this.existedInv.inventoryId).subscribe(() => {
      this.router.navigateByUrl("/pim/stock/inventories");
      this.showToast("All Set!" , this.positions.TOP_RIGHT, 'success');
    })
  }

  fixInventoryStock(material: Material): void {
    this.disableFixBtn = true;
    this.countFixed = 0;
    this.inventoryMovement = {
      imRef: FixStockComponent.getRandomNumber(100000, 999999),
      material: material
    };
    this.stockExit = {
      material: material,
      quantityOut: material.quantityStock - material.quantityReel,
      stockExitRef: FixStockComponent.getRandomNumberSExit(100000, 999999)
    };
    this.stockEntry = {
      material: material,
      quantityIn: material.quantityReel - material.quantityStock,
      stockEntryRef: FixStockComponent.getRandomNumberSEntry(100000, 999999)
    };
    this.material = {
      quantityReel: material.quantityReel
    };
    this.invService.fixInventoryStock(this.existedInv.inventoryId, material.materialId)
      .subscribe(() => {
        this.materialService.fixMaterialStock(material.materialId, this.existedInv.inventoryId).subscribe(() => {
          this.imService.createIM(this.inventoryMovement).subscribe(() => {
            if (material.quantityStock > material.quantityReel) {
              this.stockExitService.addNewStockExit(this.stockExit).subscribe(() => {
                this.showToast("Stock Updated!" , this.positions.TOP_RIGHT, 'success');
                this.disableFixBtn = false;
                this.countFixed = this.countFixed + 1;
                for (let m = 0; m < this.existedInv.materials.length; m++) {
                  this.existedInv.materials[m].quantityStock = this.existedInv.materials[m].quantityReel;
                }
              }, errorExit => {
                this.showToast(errorExit.error , this.positions.TOP_RIGHT, 'danger');
              })
            } else {
              this.stockEntryService.addNewStockEntry(this.stockEntry).subscribe(() => {
                this.showToast("Stock Updated!" , this.positions.TOP_RIGHT, 'success');
                for (let m = 0; m < this.existedInv.materials.length; m++) {
                  this.existedInv.materials[m].quantityStock = this.existedInv.materials[m].quantityReel;
                }
              }, errorEntry => {
                this.showToast(errorEntry.error , this.positions.TOP_RIGHT, 'danger');
              })
            }
          }, errorIM => {
            this.showToast(errorIM.error , this.positions.TOP_RIGHT, 'danger');
          })
        }, errorM => {
          this.showToast(errorM.error , this.positions.TOP_RIGHT, 'danger');
        })
      }, errorInv => {
        this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
      })
  }

  ngOnInit(): void {
    this.invService.getOneInventory(this.router.url.replace("/pim/stock/fix/", ""))
      .subscribe(inventory => {
        this.existedInv = inventory;
        for (let m = 0; m < this.existedInv.materials?.length; m++) {
          if (this.existedInv.materials[m].quantityStock === this.existedInv.materials[m].quantityReel) {
            this.countFixed = this.countFixed + 1;
          }
        }
        if (this.existedInv.inventoryFixed === true) {
          this.showToast("Oops! This inventory is already Fixed!" , this.positions.TOP_RIGHT, 'info');
          this.location.back();
        }
      }, errorInv => {
        this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
      });
  }

}
