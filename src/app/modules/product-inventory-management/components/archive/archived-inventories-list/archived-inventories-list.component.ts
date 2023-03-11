import {Component, OnInit, TemplateRef} from '@angular/core';
import {Inventory} from "../../../models/inventory/inventory";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {Router} from "@angular/router";
import moment from "moment";

@Component({
  selector: 'ngx-archived-inventories-list',
  templateUrl: './archived-inventories-list.component.html',
  styleUrls: ['./archived-inventories-list.component.scss']
})
export class ArchivedInventoriesListComponent implements OnInit {

  inventories: Inventory[] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  current: number = 1;
  search: string = '';
  pageSize: number = 6;
  dateToday;

  constructor(private invService: InventoryService, private toastrService: NbToastrService,
              private dialogService: NbDialogService, private exportService: ExportService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.inventories, 'Archived Inventories');
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getAllArchivedInventories() {
    this.invService.getAllInventories().subscribe(inventories => {
      this.inventories = [];
      for (let i = 0; i < inventories.length; i++) {
        if (inventories[i].inventoryState === false) {
          this.inventories.push(inventories[i]);
        }
      }
    }, errorInv => {
      this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  getAllArchivedInventoriesASC() {
    this.invService.getAllInventoriesASC().subscribe(inventories => {
      this.inventories = [];
      for (let i = 0; i < inventories.length; i++) {
        if (inventories[i].inventoryState === false) {
          this.inventories.push(inventories[i]);
        }
      }
    }, errorInv => {
      this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  getAllArchivedInventoriesDESC() {
    this.invService.getAllInventoriesDESC().subscribe(inventories => {
      this.inventories = [];
      for (let i = 0; i < inventories.length; i++) {
        if (inventories[i].inventoryState === false) {
          this.inventories.push(inventories[i]);
        }
      }
    }, errorInv => {
      this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  getArchivedInventoriesByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.invService.getAllInventories().subscribe(
      (data: Inventory[]) => {
        this.inventories = [];
        this.inventories = data.filter(
          (d =>
              this.moment(d.inventoryCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.inventoryState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  getArchivedInventoriesByInvDate(e) {
    this.filterByInventoryDate(e);
  }

  filterByInventoryDate(e) {
    this.invService.getAllInventories().subscribe(
      (data: Inventory[]) => {
        this.inventories = [];
        this.inventories = data.filter(
          (d =>
              this.moment(d.inventoryDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.inventoryState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  onRestoreConfirm(inventory: Inventory, ref) {
    this.invService.restoreInventory(inventory.inventoryId).subscribe(
      () => {
        this.showToast('Inventory restored!!' , this.positions.TOP_RIGHT, 'success');
        this.inventories.splice(this.inventories.indexOf(inventory), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.dateToday = new Date();
    this.getAllArchivedInventories();
  }

}
