import {Component, OnInit, TemplateRef} from '@angular/core';
import {Inventory} from "../../../models/inventory/inventory";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from 'moment';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-inventories-grid',
  templateUrl: './inventories-grid.component.html',
  styleUrls: ['./inventories-grid.component.scss']
})
export class InventoriesGridComponent implements OnInit {

  inventories: Inventory[] = [];
  invChecks: Inventory[] = [];
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  current: number = 1;
  search: string = '';
  pageSize: number = 6;
  invCheckCreation = 0;
  dateToday;
  userConnected;

  constructor(private invService: InventoryService, private toastrService: NbToastrService,
              private dialogService: NbDialogService, private exportService: ExportService,
              private router: Router) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.inventories, 'Inventories');
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  goToCreateInventory() {
    if (this.invCheckCreation === 0) {
      this.router.navigateByUrl("/pim/stock/inventory/create");
    } else {
      this.showToast('You have already created an inventory this month. ' +
        'You can only create one inventory per month!',
        this.positions.TOP_RIGHT, 'danger');
    }
  }

  getAllInventories() {
    this.inventories = [];
    this.invService.getAllInventories().subscribe(inventories => {
      this.inventories = inventories;
      for (let i = 0; i < this.inventories.length; i++) {
        if (this.inventories[i].inventoryState === false ||
          this.inventories[i].addedBy?.company !== this.userConnected.company) {
          this.inventories.splice(this.inventories.indexOf(this.inventories[i]), 1);
        }
      }
    }, errorInv => {
      this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  getAllInventoriesASC() {
    this.inventories = [];
    this.invService.getAllInventoriesASC().subscribe(inventories => {
      this.inventories = inventories;
      for (let i = 0; i < this.inventories.length; i++) {
        if (this.inventories[i].inventoryState === false ||
          this.inventories[i].addedBy?.company !== this.userConnected.company) {
          this.inventories.splice(this.inventories.indexOf(this.inventories[i]), 1);
        }
      }
    }, errorInv => {
      this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  getAllInventoriesDESC() {
    this.inventories = [];
    this.invService.getAllInventoriesDESC().subscribe(inventories => {
      this.inventories = inventories;
      for (let i = 0; i < this.inventories.length; i++) {
        if (this.inventories[i].inventoryState === false ||
          this.inventories[i].addedBy?.company !== this.userConnected.company) {
          this.inventories.splice(this.inventories.indexOf(this.inventories[i]), 1);
        }
      }
    }, errorInv => {
      this.showToast(errorInv.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  getInventoriesByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.invService.getAllInventories().subscribe(
      (data: Inventory[]) => {
        this.inventories = [];
        this.inventories = data.filter(
          (d =>
              this.moment(d.inventoryCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.inventoryState === true && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getInventoriesByInvDate(e) {
    this.filterByInventoryDate(e);
  }

  filterByInventoryDate(e) {
    this.invService.getAllInventories().subscribe(
      (data: Inventory[]) => {
        this.inventories = [];
        this.inventories = data.filter(
          (d =>
              this.moment(d.inventoryDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.inventoryState === true && d.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  onArchiveConfirm(inventory: Inventory, ref) {
    this.invService.archiveInventory(inventory.inventoryId).subscribe(
      () => {
        this.showToast('Inventory archived!!' , this.positions.TOP_RIGHT, 'success');
        this.inventories.splice(this.inventories.indexOf(inventory), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.dateToday = new Date();
    this.getAllInventories();
    this.invService.getAllInventories().subscribe(inventories => {
      this.invChecks = inventories;
      for (let i = 0; i < this.invChecks.length; i++) {
        if (this.moment(this.invChecks[i].inventoryCreationDate).format('YYYY-MM')
          === this.moment(this.dateToday).format('YYYY-MM')
          && this.invChecks[i].addedBy?.company === this.userConnected.company) {
          this.invCheckCreation = this.invCheckCreation + 1;
        }
      }
    })
  }

}
