import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Material} from "../../../../models/material/material";
import moment from "moment";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {SupplierService} from "../../../../services/supplier/supplier.service";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {Supplier} from "../../../../models/supplier/supplier";
import {MaterialService} from "../../../../services/material/material.service";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-create-pr',
  templateUrl: './create-pr.component.html',
  styleUrls: ['./create-pr.component.scss']
})
export class CreatePrComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  newPR;
  userConnected;
  materials: Material[] = [];
  suppliers: Supplier[] = [];
  completedState1 = true;
  moment: any = moment;
  dateToday;
  saveBtnDisabled;
  quantityMat;
  existedMaterial: Material = new Material();
  materialTypeToGet: String = '';
  m: number = 0;
  existedPP;
  purchaseProcess;
  progressStatus = "danger";

  constructor(private prService: PurchaseRequisitionService, private supplierService: SupplierService, 
              private materialService: MaterialService, private dialogService: NbDialogService, 
              private toastrService: NbToastrService, private router: Router, 
              private location: Location, private ppService: PurchaseProcessService) {
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    sessionStorage.removeItem('materials');
  }
  
  open2(dialog: TemplateRef<any>, materialId) {
    this.dialogService.open(dialog);
    this.materialService.getOneMaterial(materialId).subscribe(material => {
      this.existedMaterial = material;
      this.materialTypeToGet = this.existedMaterial.materialType;
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
    sessionStorage.removeItem('materials');
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    sessionStorage.removeItem('materials');
    sessionStorage.removeItem("purchaseProcess");
    this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
      this.showToast("Purchase Cancelled" , this.positions.TOP_RIGHT, 'danger');
      this.router.navigateByUrl('/pim/procurement/materials');
    }, errorPP => {
      this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
    })
  }
  
  updateQuantity(ref): void {
    for (let m = 0; m < this.materials.length; m++) {
      if (this.materials[m].materialId === this.existedMaterial.materialId) {
        if (!this.quantityMat && this.materialTypeToGet !== 'Service') {
          this.showToast('Quantity cannot be NULL' , this.positions.TOP_RIGHT, 'danger');
        } else if (this.quantityMat && this.materialTypeToGet !== 'Service') {
          if (this.quantityMat < 0) {
            this.showToast('Quantity cannot be NEGATIVE' , this.positions.TOP_RIGHT, 'danger');
          } else {
            this.materials[m].materialQuantity = this.quantityMat;
            this.showToast('Material Updated Successfully' , this.positions.TOP_RIGHT, 'success');
            this.quantityMat = null;
            ref.close();
            if (this.materials[m].materialType === 'Finished Product' || this.materials[m].materialType === 'Raw Material') {
              this.m = this.m + 1;
            }
          }
        }
      }
      if (this.materials[m].materialType === 'Service') {
        this.m = this.m + 1;
      }
      /*if (this.materials[m].materialQuantity === 0 && this.materialTypeToGet !== 'Service') {
        this.saveBtnDisabled = true;
      }
      if (this.materials[m].materialQuantity > 0) {
        this.saveBtnDisabled = false;
      }*/
    }
    if (this.m >= this.materials.length) {
        this.saveBtnDisabled = false;
      } else {
        this.saveBtnDisabled = true;
      }
  }

  changeMaterialQuantity(materialQuantity): void {
    if (materialQuantity.target.value > this.existedMaterial.stockMax) {
      this.showToast(`Can't order ${materialQuantity.target.value} 
      ${this.existedMaterial.materialName}s while the Maximum Capacity should be ${this.existedMaterial.stockMax}!`,
        this.positions.TOP_RIGHT, 'danger');
    }
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "PR"+result;
  }

  createNewPR(): void {
      this.newPR = {
        material: this.materials,
        purchaseRequisitionNumber: CreatePrComponent.getRandomNumber(100000, 999999),
        addedBy: this.userConnected
      };
    this.prService.addNewPR(this.newPR).subscribe(
         result => {
           this.purchaseProcess = {
              step: 2,
              pr: result,
              materials: this.materials
            };
          this.ppService.firstEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess)
            .subscribe(purchaseProcess => {
          this.showToast('Purchase Requisition sent to Finance Team. It will be reviewed shortly.', 
            this.positions.TOP_RIGHT, 'info');
          sessionStorage.setItem("materials", JSON.stringify(this.materials));
          sessionStorage.setItem("purchase requisition", JSON.stringify(result));
          sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
          this.router.navigateByUrl('/pim/procurement/purchase-requisition/'+result.purchaseRequisitionId);
            }, errorPP => {
             this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
           })
      }, error => {
          this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
        },
    );
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.userConnected = JSON.parse(sessionStorage.getItem("auth-user"));
    this.supplierService.getAllSuppliers().subscribe(suppliers => {
      for (let s = 0; s < suppliers.length; s++) {
        if (suppliers[s].supplierState === true && suppliers[s].addedBy?.company === this.userConnected.company) {
          this.suppliers.push(suppliers[s]);
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
    this.materials = JSON.parse(sessionStorage.getItem("materials"));
    for (let m = 0; m < this.materials.length; m++) {
      if (!this.materials[m].materialQuantity && this.materials[m].materialType !== 'Service') {
        this.saveBtnDisabled = true;
      }
    }
    this.dateToday = new Date().toISOString().slice(0, 10);
  }

}
