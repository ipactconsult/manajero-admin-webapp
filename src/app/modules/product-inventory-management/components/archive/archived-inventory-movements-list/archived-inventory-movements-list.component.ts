import {Component, OnInit, TemplateRef} from '@angular/core';
import {InventoryMovement} from "../../../models/inventoryMovement/inventory-movement";
import {Material} from "../../../models/material/material";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {InventoryMovementService} from "../../../services/inventoryMovement/inventory-movement.service";
import {ExportService} from "../../../../../shared/exports/export.service";
import {MaterialService} from "../../../services/material/material.service";
import moment from "moment";

@Component({
  selector: 'ngx-archived-inventory-movements-list',
  templateUrl: './archived-inventory-movements-list.component.html',
  styleUrls: ['./archived-inventory-movements-list.component.scss']
})
export class ArchivedInventoryMovementsListComponent implements OnInit {

  ims: InventoryMovement[] = [];
  materials: Material[] = [];
  search: string = '';
  pageSize: number = 8;
  current: number = 1;
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;

  constructor(private imService: InventoryMovementService, private toastrService: NbToastrService,
              private exportService: ExportService, private materialService: MaterialService,
              private dialogService: NbDialogService) { }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(materials => {
      this.materials = [];
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].materialState === true) {
          this.materials.push(materials[m]);
        }
      }
    })
  }

  getAllArchivedIMs() {
    this.imService.getAllIMs().subscribe(ims => {
      this.ims = [];
      for (let im = 0; im < ims.length; im++) {
        if (ims[im].imState === false) {
          this.ims.push(ims[im]);
        }
      }
    })
  }

  getAllArchivedIMsASC() {
    this.imService.getAllIMsASC().subscribe(ims => {
      this.ims = [];
      for (let im = 0; im < ims.length; im++) {
        if (ims[im].imState === false) {
          this.ims.push(ims[im]);
        }
      }
    })
  }

  getAllArchivedIMsDESC() {
    this.imService.getAllIMsDESC().subscribe(ims => {
      this.ims = [];
      for (let im = 0; im < ims.length; im++) {
        if (ims[im].imState === false) {
          this.ims.push(ims[im]);
        }
      }
    })
  }

  getArchivedIMsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.imService.getAllIMs().subscribe(
      (data: InventoryMovement[]) => {
        this.ims = [];
        this.ims = data.filter(
          (d =>
              this.moment(d.imCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.imState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  getArchivedIMByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.imService.getAllIMs().subscribe(
      (data: InventoryMovement[]) => {
        this.ims = [];
        this.ims = data.filter(
          (d =>
              d.material.materialName === e &&
              d.imState === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.ims, 'Archived Inventory Movements');
  }

  onRestoreConfirm(im: InventoryMovement, ref) {
    this.imService.restoreIM(im.imId).subscribe(
      () => {
        this.showToast('Inventory Movement restored!!' , this.positions.TOP_RIGHT, 'success');
        this.ims.splice(this.ims.indexOf(im), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.getAllArchivedIMs();
    this.getAllMaterials();
  }

}
