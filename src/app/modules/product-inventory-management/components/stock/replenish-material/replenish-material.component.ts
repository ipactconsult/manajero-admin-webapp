import { ReplenishmentProcessService } from '../../../services/replenishmentProcess/replenishment-process.service';
import { Material } from '../../../models/material/material';
import { MaterialService } from '../../../services/material/material.service';
import { Router } from '@angular/router';
import {Component, OnInit, TemplateRef} from '@angular/core';
import { Location } from '@angular/common';
import moment from 'moment';
import {PurchaseRequisitionService} from "../../../services/purchaseRequisition/purchase-requisition.service";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {ReplenishmentProcess} from "../../../models/replenishmentProcess/replenishment-process";
import {PurchaseRequisition} from "../../../models/purchaseRequisition/purchase-requisition";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import emailjs from '@emailjs/browser';
import {PurchaseOrderService} from "../../../services/purchaseOrder/purchase-order.service";

@Component({
  selector: 'ngx-replenish-material',
  templateUrl: './replenish-material.component.html',
  styleUrls: ['./replenish-material.component.scss']
})
export class ReplenishMaterialComponent implements OnInit {

  existedMaterial: Material = new Material();
  materials: Material[] = [];
  materialsPO: Material[] = [];
  prToAdd;
  rpToAdd;
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  existedPRMongo: PurchaseRequisition = new PurchaseRequisition();
  existedRP: ReplenishmentProcess = new ReplenishmentProcess();
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  stepOneDone;
  stepTwoDone;
  poForm: FormGroup;
  newPO;
  materialType = '';
  materialName = '';
  materialSKU = '';
  materialCategory = '';
  materialUnit = '';
  materialQuantity = '';
  materialPrice = '';
  totalPrice = '';
  templateParams;
  user;
  dateToday;
  stepThreeDone = false;
  material;

  constructor(private materialService: MaterialService, private router: Router,
              private rpService: ReplenishmentProcessService, private prService: PurchaseRequisitionService,
              private toastrService: NbToastrService, private location: Location,
              private poService: PurchaseOrderService, private formBuilder: FormBuilder,
              private dialogService: NbDialogService) {
    this.poForm = formBuilder.group({
      receptionDate: ['', Validators.required]
    })
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  goToPreviousRoute(): void {
    this.location.back();
  }

  goToPreviousPR(): void {
    this.stepThreeDone = false;
  }

  goToNextStep() : void {
    this.rpService.firstEditRP(this.existedRP.rpId).subscribe(rp => {
      sessionStorage.setItem("replenishmentProcess", JSON.stringify(rp));
    })
  }

  decrementQuantity(): void {
    this.existedMaterial.materialQuantity = this.existedMaterial.materialQuantity - 1;
    if (this.existedMaterial.materialQuantity
      === this.existedMaterial.stockAlert - this.existedMaterial.quantityStock) {
      this.showToast('Can no more decrement quantity because this is the minimum quantity needed.',
        this.positions.TOP_RIGHT, 'info');
    }
  }

  incrementQuantity(): void {
    this.existedMaterial.materialQuantity = this.existedMaterial.materialQuantity + 1;
    if (this.existedMaterial.materialQuantity
      === this.existedMaterial.stockMax - this.existedMaterial.quantityStock) {
      this.showToast('Can no more increment quantity because this is the maximum quantity needed.',
        this.positions.TOP_RIGHT, 'info');
    }
  }

  static getRandomNumberRP(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "RP"+result;
  }

  static getRandomNumberPR(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "PR"+result;
  }

  static getRandomNumberPO(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "PO"+result;
  }

  createPR(): void {
    this.materials.push(this.existedMaterial);
    this.prToAdd = {
      material: this.materials,
      purchaseRequisitionNumber: ReplenishMaterialComponent.getRandomNumberPR(100000, 999999),
      addedBy: this.user
    };
    this.material = {
      materialQuantity: this.existedMaterial.materialQuantity
    };
    this.prService.addNewPR(this.prToAdd).subscribe(pr => {
      this.existedPR = pr;
      this.rpToAdd = {
        pr: pr,
        step: 1,
        rpRef: ReplenishMaterialComponent.getRandomNumberRP(100000, 999999)
      };
      this.rpService.createRP(this.rpToAdd).subscribe(rp => {
        this.materialService.updateMaterialQuantity(this.material, this.existedMaterial.materialId).subscribe(() => {
          this.existedRP = rp;
          sessionStorage.setItem("replenishmentProcess", JSON.stringify(this.existedRP));
          this.showToast('Purchase Requisition sent to Finance Team. It will be reviewed shortly.',
            this.positions.TOP_RIGHT, 'info');
        })
      })
    })
  }
  
  abandonRP(): void {
    this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      this.rpService.deleteRP(this.existedRP.rpId).subscribe(() => {
        sessionStorage.removeItem("replenishmentProcess");
        this.showToast('Replenishment Abandoned!',
          this.positions.TOP_RIGHT, 'danger');
        this.showToast('Redirecting to materials in stock.',
          this.positions.TOP_RIGHT, 'info');
        this.router.navigateByUrl('/pim/stock/in-stock');
      }, errorRP => {
        this.showToast(errorRP.error,
          this.positions.TOP_RIGHT, 'danger');
      })
    }, errorPR => {
      this.showToast(errorPR.error,
        this.positions.TOP_RIGHT, 'danger');
    })
  }

  addNewPO(ref): void {
    this.materialsPO.push(this.existedMaterial);
    this.newPO = {
      poNumber: ReplenishMaterialComponent.getRandomNumberPO(100000, 999999),
      selectedSupplier: this.existedMaterial.supplier,
      materials: this.materialsPO,
      receptionDate: this.poForm.value.receptionDate,
      addedBy: this.user
    };
    this.poService.addNewPO(this.newPO).subscribe(result => {
      for (let m = 0; m < this.newPO.materials.length; m++) {
        this.materialType = `\n${this.materialType}`.concat(`${this.newPO.materials[m].materialType}\n\n\n`)
        this.materialName = `\n${this.materialName}`.concat(`${this.newPO.materials[m].materialName}\n\n\n`)
        this.materialSKU = `\n${this.materialSKU}`.concat(`${this.newPO.materials[m].materialSKU}\n\n\n`)
        this.materialCategory = `\n${this.materialCategory}`.concat(`${this.newPO.materials[m].materialCategory.categoryName}\n\n\n`)
        this.materialUnit = `\n${this.materialUnit}`.concat(`${this.newPO.materials[m].materialUnit}\n\n\n`)
        this.materialQuantity = `\n${this.materialQuantity}`.concat(`${this.newPO.materials[m].materialQuantity}\n\n\n`)
        this.materialPrice = `\n${this.materialPrice}`
          .concat(`${this.newPO.materials[m].materialPrice} ${this.existedMaterial.supplier.supplierCurrency}\n\n\n`)
        this.totalPrice = `\n${this.totalPrice}`
          .concat(`${this.newPO.materials[m].materialPrice * this.newPO.materials[m].materialQuantity +
          this.newPO.materials[m].materialPrice * this.newPO.materials[m].materialQuantity
          * (this.newPO.materials[m].materialVAT / 100)} ${this.existedMaterial.supplier.supplierCurrency}\n\n\n`)
      }
      this.templateParams = {
        supplierFirstName: this.newPO.selectedSupplier.supplierFirstName,
        supplierLastName: this.newPO.selectedSupplier.supplierLastName,
        supplierEmail: this.newPO.selectedSupplier.supplierEmail,
        materialType: this.materialType,
        materialName: this.materialName,
        materialSKU: this.materialSKU,
        materialCategory: this.materialCategory,
        materialUnit: this.materialUnit,
        materialQuantity: this.materialQuantity,
        materialPrice: this.materialPrice,
        totalPrice: this.totalPrice,
        user: this.user.email,
        deliveryDate: this.moment(this.newPO.receptionDate).format("DD MMM YYYY")
      };
      emailjs.send('service_jdvh2ff', 'purchaseOrderPIM', this.templateParams, '5YzEHE9cu-TKgbGSd');
      this.showToast('Purchase Order sent to Finance Team. It will be reviewed shortly.' ,
        this.positions.TOP_RIGHT, 'info');
      this.rpService.deleteRP(this.existedRP.rpId).subscribe(() => {
        sessionStorage.removeItem("replenishmentProcess");
        this.materialService.replenishMaterial(this.existedMaterial.materialId).subscribe(() => {
          
        }, errorM => {
          this.showToast(errorM.error,
            this.positions.TOP_RIGHT, 'danger');
        })
      }, errorRP => {
        this.showToast(errorRP.error,
          this.positions.TOP_RIGHT, 'danger');
      });
      ref.close();
      this.router.navigateByUrl('/pim/procurement/purchase-orders');
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
  }

  deletePR(): void {
    this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      this.rpService.deleteRP(this.existedRP.rpId).subscribe(() => {
        sessionStorage.removeItem("replenishmentProcess");
        this.existedRP.step = 0;
        this.stepOneDone = false;
        this.stepTwoDone = false;
      }, errorRP => {
        this.showToast(errorRP.error,
          this.positions.TOP_RIGHT, 'danger');
      })
    }, errorPR => {
      this.showToast(errorPR.error,
        this.positions.TOP_RIGHT, 'danger');
    })
  }

  ngOnInit(): void {
    this.dateToday = new Date();
    this.user = JSON.parse(sessionStorage.getItem('auth-user'));
    this.materialService.getOneMaterial(this.router.url
      .replace('/pim/replenishment/', '')).subscribe((material) => {
        this.existedMaterial = material;
        if (this.existedMaterial.quantityStock >= this.existedMaterial.stockAlert) {
          this.showToast('Redirecting to materials in stock.' , this.positions.TOP_RIGHT, 'info');
          this.router.navigateByUrl("/pim/stock/in-stock");
        }
    });
    if (sessionStorage.getItem("replenishmentProcess")) {
      this.existedRP = JSON.parse(sessionStorage.getItem("replenishmentProcess"));
      this.existedPR = this.existedRP.pr;
      
      if (this.existedRP.step === 1) {
        this.stepOneDone = true;
        this.stepTwoDone = false;
      } else if (this.existedRP.step === 2) {
        this.stepOneDone = true;
        this.stepTwoDone = true;
      }
      this.prService.getOnePR(this.existedPR.purchaseRequisitionId).subscribe(pr => {
        this.existedPRMongo = pr;
        if (this.existedPRMongo.purchaseRequisitionStatus === 'Rejected' 
            || this.existedPRMongo.purchaseRequisitionStatus === 'Approved') {
          this.existedPR = this.existedPRMongo;
          sessionStorage.setItem("replenishmentProcess", JSON.stringify(this.existedRP));
          this.existedRP = JSON.parse(sessionStorage.getItem("replenishmentProcess"));
        }
        if (this.existedPRMongo.purchaseRequisitionStatus === 'Rejected' && this.existedRP.step === 1) {
          this.showToast('Purchase Requisition is REJECTED by the Finance Team.' , this.positions.TOP_RIGHT, 'danger');
        }
        if (this.existedPRMongo.purchaseRequisitionStatus === 'Approved' && this.existedRP.step === 1) {
          this.showToast('Purchase Requisition is APPROVED by the Finance Team.' , this.positions.TOP_RIGHT, 'success');
        }
      }, errorPR => {
        this.showToast(errorPR.error,
          this.positions.TOP_RIGHT, 'danger');
      })
    } else {
      this.existedRP.step = 0;
      this.stepOneDone = false;
      this.stepTwoDone = false;
    }
  }

}
