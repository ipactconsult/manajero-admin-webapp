import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Router} from "@angular/router";
import moment from 'moment';
import {ExportService} from "../../../../../../shared/exports/export.service";
import {PurchaseOrder} from "../../../../models/purchaseOrder/purchase-order";
import {PurchaseOrderService} from "../../../../services/purchaseOrder/purchase-order.service";
import {MaterialService} from "../../../../services/material/material.service";
import {formatDate} from "@angular/common";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";
import {Supplier} from "../../../../models/supplier/supplier";
import {SupplierService} from "../../../../services/supplier/supplier.service";
import emailjs from "@emailjs/browser";

@Component({
  selector: 'ngx-list-po',
  templateUrl: './list-po.component.html',
  styleUrls: ['./list-po.component.scss']
})
export class ListPoComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  dataPOs: PurchaseOrder[] = [];
  suppliers: Supplier[] = [];
  moment: any = moment;
  pageSize: number = 6;
  positions = NbGlobalPhysicalPosition;
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  dateNow = formatDate(new Date(),'yyyy-MM-dd','en_US');
  poCreationDate;
  existedPP;
  purchaseProcess;
  hiddenReceipt = true;
  hiddenConfirm = false;
  selectedPOId;
  materialType = '';
  materialName = '';
  materialSKU = '';
  materialCategory = '';
  materialBarcode = '';
  materialQuantity = '';
  materialPrice = '';
  totalPrice = '';
  templateParams;
  newPO;
  user;
  disSendBtn = false;
  numberOfProdsRM = 0;

  constructor(private poService: PurchaseOrderService, private materialService: MaterialService,
              private dialogService: NbDialogService, private router: Router,
              private windowService: NbWindowService, private toastrService: NbToastrService,
              private exportService: ExportService, private ppService: PurchaseProcessService,
              private supplierService: SupplierService) { }

  mailSupplier(newPO) {
    this.newPO = newPO;
    this.poService.sendMail(newPO.poId).subscribe(() => {
      for (let m = 0; m < this.newPO.materials.length; m++) {
        if (this.newPO.materials[m]?.materialType !== 'Service') {
          this.materialType = `\n${this.materialType}`.concat(`${this.newPO.materials[m].materialType}\n\n\n`);
          this.materialName = `\n${this.materialName}`.concat(`${this.newPO.materials[m].materialName}\n\n\n`);
          this.materialSKU = `\n${this.materialSKU}`.concat(`${this.newPO.materials[m].materialSKU}\n\n\n`);
          this.materialCategory = `\n${this.materialCategory}`.concat(`${this.newPO.materials[m].materialCategory.categoryName}\n\n\n`)
          this.materialQuantity = `\n${this.materialQuantity}`.concat(`${this.newPO.materials[m].materialQuantity}\n\n\n`);
          this.materialPrice = `\n${this.materialPrice}`
            .concat(`${this.newPO.materials[m].materialPrice} ${this.newPO.selectedSupplier.supplierCurrency}\n\n\n`);
          this.totalPrice = `\n${this.totalPrice}`
            .concat(`${this.newPO.materials[m].materialPrice * this.newPO.materials[m].materialQuantity +
            this.newPO.materials[m].materialPrice * this.newPO.materials[m].materialQuantity
            * (this.newPO.materials[m].materialVAT / 100)} ${this.newPO.selectedSupplier.supplierCurrency}\n\n\n`)
        }
        if (this.newPO.materials[m]?.materialType === 'Service') {
          this.materialType = `\n${this.materialType}`.concat(`${this.newPO.materials[m].materialType}\n\n\n`);
          this.materialName = `\n${this.materialName}`.concat(`${this.newPO.materials[m].materialName}\n\n\n`);
          this.materialSKU = `\n${this.materialSKU}`.concat(`${this.newPO.materials[m].materialSKU}\n\n\n`);
          this.materialCategory = `\n${this.materialCategory}`.concat(`${this.newPO.materials[m].materialCategory.categoryName}\n\n\n`)
          this.materialQuantity = `\n${this.materialQuantity}`.concat(`1`);
          this.materialPrice = `\n${this.materialPrice}`
            .concat(`${this.newPO.materials[m].materialPrice} ${this.newPO.selectedSupplier.supplierCurrency}\n\n\n`);
          this.totalPrice = `\n${this.totalPrice}`
            .concat(`${this.newPO.materials[m].materialPrice * 1 +
            this.newPO.materials[m].materialPrice * 1
            * (this.newPO.materials[m].materialVAT / 100)} ${this.newPO.selectedSupplier.supplierCurrency}\n\n\n`)
        }
      }
      this.templateParams = {
        supplierFirstName: this.newPO.selectedSupplier.supplierFirstName,
        supplierLastName: this.newPO.selectedSupplier.supplierLastName,
        supplierEmail: this.newPO.selectedSupplier.supplierEmail,
        materialType: this.materialType,
        materialName: this.materialName,
        materialSKU: this.materialSKU,
        materialCategory: this.materialCategory,
        materialQuantity: this.materialQuantity,
        materialPrice: this.materialPrice,
        totalPrice: this.totalPrice,
        user: this.user.email,
        deliveryDate: this.moment(this.newPO.receptionDate).format("DD MMM YYYY")
      };
      emailjs.send('service_jdvh2ff', 'purchaseOrderPIM', this.templateParams, '5YzEHE9cu-TKgbGSd');
      this.disSendBtn = true;
      newPO.mailSent = true;
      this.showToast('Purchase Order sent to Supplier.' , this.positions.TOP_RIGHT, 'success');
    }, errorPO => {
      this.showToast(errorPO.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  receiveMaterials(poId) {
    this.poService.getOnePO(poId).subscribe((po) => {
      this.purchaseOrder = po;
      this.poCreationDate = formatDate(this.purchaseOrder.poCreationDate,'yyyy-MM-dd','en_US');
      if (this.poCreationDate < this.dateNow) {
        this.poService.receivePO(poId).subscribe(purchaseOrder => {
          this.purchaseProcess = {
            po: purchaseOrder
          };
          if (this.existedPP && this.existedPP.po?.poId === this.purchaseOrder.poId) {
            this.ppService.sixthEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess).subscribe(purchaseProcess => {
              sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
            }, errorPP => {
              return errorPP.error;
            });
          }
          for (let m = 0; m < this.purchaseOrder.materials.length; m++) {
            this.materialService.receiveMaterial(this.purchaseOrder.materials[m].materialId, poId).subscribe(() => {
              if (this.purchaseOrder.materials[m].materialType === 'Finished Product' ||
                this.purchaseOrder.materials[m].materialType === 'Raw Material') {
                this.numberOfProdsRM = this.numberOfProdsRM + 1;
                if (this.numberOfProdsRM === 0) {
                  this.ppService.seventhEditPPService(this.existedPP.purchaseProcessId).subscribe(() => {

                  }, errorS => {
                    return errorS.error;
                  })
                }
              }
            }, error => {
              return error.error;
            })
          }
          this.showToast('Materials Received' , this.positions.TOP_RIGHT, 'success');
          this.hiddenReceipt = false;
          this.hiddenConfirm = true;
          this.selectedPOId = poId;
        }, err => {
          return err.error;
        })
      } else {
        this.showToast('Receipt should not be Confirmed Today!',
          this.positions.TOP_RIGHT, 'danger');
      }
    })
  }

  getAllPOs() {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].poState === true && data[p].addedBy?.company === this.user.company) {
            this.dataPOs.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllPOsASCByCode() {
    this.poService.getAllPOsASCByCode().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].poState === true && data[p].addedBy?.company === this.user.company) {
            this.dataPOs.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getAllPOsDESCByCode() {
    this.poService.getAllPOsDESCByCode().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        for (let p = 0; p < data.length; p++) {
          if (data[p].poState === true && data[p].addedBy?.company === this.user.company) {
            this.dataPOs.push(data[p]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getPOsByCreationDate(e) {
    this.filterByCreationDate(e);
  }

  filterByCreationDate(e) {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        this.dataPOs = data.filter(
          (d =>
              this.moment(d.poCreationDate).format('YYYY-MM-DD') === this.moment(e).format('YYYY-MM-DD') &&
              d.poState === true && d.addedBy?.company === this.user.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        for (let s = 0; s < data.length; s++) {
          if (data[s].supplierState === true
            && data[s].addedBy?.company === this.user.company) {
            this.suppliers.push(data[s]);
          }
        }
      }, (err) => {
        return err;
      }
    );
  }

  getPOsBySupplier(e) {
    this.filterBySupplier(e);
  }

  filterBySupplier(e) {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        this.dataPOs = data.filter(
          (d =>
              `${d.selectedSupplier?.supplierFirstName} ${d.selectedSupplier?.supplierLastName}` === e &&
              d.poState === true && d.addedBy?.company === this.user.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onArchiveConfirm(po: PurchaseOrder, ref) {
    this.poService.archivePO(po.poId).subscribe(
      () => {
        this.showToast('Purchase Order Archived!' ,
          this.positions.TOP_RIGHT, 'info');
        this.dataPOs.splice(this.dataPOs.indexOf(po), 1);
        ref.close();
      }, errorArchive => {
        return errorArchive.error;
      });
  }

  deletePO(po: PurchaseOrder) {
    this.poService.deletePO(po.poId).subscribe(
      () => {
        this.showToast('Purchase Order Deleted!' ,
          this.positions.TOP_RIGHT, 'danger');
        this.dataPOs.splice(this.dataPOs.indexOf(po), 1);
      }, error => {
        return error.error;
      }
    )
  }

  getPOsByStatus(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.poService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
        this.dataPOs = [];
        this.dataPOs = data.filter(
          (d =>
              d.poStatus === e &&
              d.poState === true && d.addedBy?.company === this.user.company
          )
        );
      }, (err) => {
        return err;
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataPOs, 'Purchase Orders');
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("purchaseProcess")) {
      this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
      this.poService.getAllPOs().subscribe(pos => {
        if (this.existedPP.po) {
          for (let p = 0; p < pos.length; p++) {
            if (pos[p].poId === this.existedPP.po.poId && pos[p].poStatus === 'Approved') {
              this.purchaseProcess = {
                po: pos[p]
              };
              this.ppService.sixthEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess).subscribe(purchaseProcess => {
                sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
              })
            }
          }
        }
      })
    }
    this.getAllPOs();
    this.getAllSuppliers();
    this.user = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
