import {Component, OnInit, TemplateRef} from '@angular/core';
import {InventoryMovementService} from "../../../services/inventoryMovement/inventory-movement.service";
import {InventoryMovement} from "../../../models/inventoryMovement/inventory-movement";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from "moment";
import {ExportService} from "../../../../../shared/exports/export.service";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";

@Component({
  selector: 'ngx-inventory-movements-list',
  templateUrl: './inventory-movements-list.component.html',
  styleUrls: ['./inventory-movements-list.component.scss']
})
export class InventoryMovementsListComponent implements OnInit {

  ims: InventoryMovement[] = [];
  materials: Material[] = [];
  search: string = '';
  pageSize: number = 8;
  current: number = 1;
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;
  userConnected;

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
        if (materials[m].materialState === true
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.materials.push(materials[m]);
        }
      }
    })
  }

  getAllIMs() {
    this.ims = [];
    this.imService.getAllIMs().subscribe(ims => {
      this.ims = ims;
      for (let im = 0; im < this.ims.length; im++) {
        if (this.ims[im].imState === false
          || this.ims[im].material?.addedBy?.company !== this.userConnected.company) {
          this.ims.splice(this.ims.indexOf(this.ims[im]), 1);
        }
      }
    })
  }

  getAllIMsASC() {
    this.ims = [];
    this.imService.getAllIMsASC().subscribe(ims => {
      this.ims = ims;
      for (let im = 0; im < this.ims.length; im++) {
        if (this.ims[im].imState === false
          || this.ims[im].material?.addedBy?.company !== this.userConnected.company) {
          this.ims.splice(this.ims.indexOf(this.ims[im]), 1);
        }
      }
    })
  }

  getAllIMsDESC() {
    this.ims = [];
    this.imService.getAllIMsDESC().subscribe(ims => {
      this.ims = ims;
      for (let im = 0; im < this.ims.length; im++) {
        if (this.ims[im].imState === false
          || this.ims[im].material?.addedBy?.company !== this.userConnected.company) {
          this.ims.splice(this.ims.indexOf(this.ims[im]), 1);
        }
      }
    })
  }

  getIMsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.imService.getAllIMs().subscribe(
      (data: InventoryMovement[]) => {
        this.ims = [];
        this.ims = data.filter(
          (d =>
              this.moment(d.imCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.imState === true && d.material?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getIMByMaterial(e) {
    this.filterByMaterial(e);
  }

  filterByMaterial(e) {
    this.imService.getAllIMs().subscribe(
      (data: InventoryMovement[]) => {
        this.ims = [];
        this.ims = data.filter(
          (d =>
              d.material.materialName === e &&
              d.imState === true && d.material?.addedBy?.company === this.userConnected.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.ims, 'Inventory Movements');
  }

  onArchiveConfirm(im: InventoryMovement, ref) {
    this.imService.archiveIM(im.imId).subscribe(
      () => {
        this.showToast('Inventory Movement archived!!' , this.positions.TOP_RIGHT, 'success');
        this.ims.splice(this.ims.indexOf(im), 1);
        ref.close();
      });
  }

  ngOnInit(): void {
    this.getAllIMs();
    this.getAllMaterials();
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
