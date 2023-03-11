import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from "moment";
import {Supplier} from "../../../../models/supplier/supplier";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";
import {QuotationService} from "../../../../services/quotation/quotation.service";
import {MaterialService} from "../../../../services/material/material.service";
import {Material} from "../../../../models/material/material";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {Quotation} from "../../../../models/quotation/quotation";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-maintain-quotation',
  templateUrl: './maintain-quotation.component.html',
  styleUrls: ['./maintain-quotation.component.scss']
})
export class MaintainQuotationComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  newQuotation;
  suppliers: Supplier[] = [];
  selectedSupplier: Supplier = new Supplier();
  suppNbSelection: number = 0;
  completedState3 = true;
  completedState2 = true;
  completedState1 = true;
  disableSelect = false;
  disableSave = true;
  moment: any = moment;
  priceMat = 0;
  vatMat = 0;
  existedRFQ: RequestForQuotation = new RequestForQuotation();
  existedMaterial: Material = new Material();
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  rfqId;
  selectedQuotations: Quotation[] = [];
  quotationStorage;
  p = 0;
  purchaseProcess;
  existedPP;
  disabledEdit = false;
  progressStatus = "warning";

  constructor(private prService: PurchaseRequisitionService, private rfqService: RequestForQuotationService,
              private quotationService: QuotationService, private materialService: MaterialService,
              private dialogService: NbDialogService, private toastrService: NbToastrService, 
              private router: Router, private location: Location, private ppService: PurchaseProcessService) {
  }
  
  goToVendorSelection(): void {
    this.purchaseProcess = {
      step: 4,
      quotations: this.selectedQuotations
    }
    this.ppService.thirdEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess)
      .subscribe(purchaseProcess => {
        sessionStorage.setItem("quotations", JSON.stringify(this.selectedQuotations));
        sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
        this.router.navigateByUrl('/pim/procurement/decide-vendor/rfq/'+this.rfqId);
      }, errorPP => {
        this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
      })
  }
  
  open2(dialog: TemplateRef<any>, materialId) {
    if (this.suppNbSelection < this.existedRFQ.suppliers.length) {
      this.dialogService.open(dialog);
      this.materialService.getOneMaterial(materialId).subscribe(material => {
      for (let p = 0; p < this.existedPR.material.length; p++) {
        if (this.existedPR.material[p].materialId === material.materialId) {
          this.existedMaterial = this.existedPR.material[p];
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
    } else {
      this.showToast('Editing Price is no more Possible.' , this.positions.TOP_RIGHT, 'danger');
    }
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    this.rfqService.deleteRFQ(this.existedRFQ.rfqId).subscribe(() => {
      this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
        this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
          sessionStorage.removeItem('materials');
          sessionStorage.removeItem('purchase requisition');
          sessionStorage.removeItem('request for quotation');
          sessionStorage.removeItem('purchaseProcess');
          this.showToast("Purchase Cancelled" , this.positions.TOP_RIGHT, 'danger');
          this.router.navigateByUrl('/pim/procurement/materials');
        }, errorPP => {
          return errorPP.error;
        })
    }, error => {
      return error.error;
    })
    }, err => {
      return err.error;
    })
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
    for (let q = 0; q < this.selectedQuotations.length; q++) {
      this.quotationService.deleteQuotation(this.selectedQuotations[q].quotationId).subscribe(() => {
        sessionStorage.removeItem('quotations');
      }, errorQ => {
        this.showToast(errorQ.error, this.positions.TOP_RIGHT, 'danger');
      })
    }
  }

  selectSupplier(selectedSupplier): void {
      this.selectedSupplier = selectedSupplier;
      this.disabledEdit = false;
  }
  
  updatePrice(ref): void {
    for (let m = 0; m < this.existedRFQ.pr.material.length; m++) {
      if (this.existedRFQ.pr.material[m].materialId === this.existedMaterial.materialId) {
        if (!this.priceMat || !this.vatMat) {
          this.showToast('Price and/or VAT cannot be NULL' , this.positions.TOP_RIGHT, 'danger');
        } else {
          this.existedRFQ.pr.material[m].materialPrice = this.priceMat;
          this.existedRFQ.pr.material[m].materialVAT = this.vatMat;
          this.showToast('Material Updated Successfully' , this.positions.TOP_RIGHT, 'success');
          this.priceMat = null;
          this.vatMat = null;
          ref.close();
          this.p = this.p + 1;
        }
      }
    }
    this.disableSelect = true;
    this.disableSave = false;
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "Q"+result;
  }

  createNewQuotation(): void {
      this.newQuotation = {
        rfq: this.existedRFQ,
        supplier: this.selectedSupplier,
        quotationNumber: MaintainQuotationComponent.getRandomNumber(100000, 999999)
      };
    this.quotationService.addNewQuotation(this.newQuotation).subscribe(
         result => {
          this.showToast(`Quotation For Supplier ${this.selectedSupplier.supplierFirstName} 
          ${this.selectedSupplier.supplierLastName}
          Created Successfully.`, 
            this.positions.TOP_RIGHT, 'success');
            this.disabledEdit = true;
          this.suppliers.splice(this.suppliers.indexOf(this.selectedSupplier), 1);
          this.disableSelect = false;
          this.disableSave = true;
          if (this.p === this.existedPR.material.length) {
            this.p = 0;
          }
          this.suppNbSelection = this.suppNbSelection + 1;
          this.existedRFQ = JSON.parse(sessionStorage.getItem("request for quotation"));
          this.rfqId = result.rfq.rfqId;
          this.quotationStorage = {
            quotationId: result.quotationId,
            quotationNumber: result.quotationNumber,
            quotationCreation: result.quotationCreation,
            supplier: result.supplier,
            rfq: result.rfq
          }
          this.selectedQuotations.push(this.quotationStorage);
      }, error => {
          this.showToast(error , this.positions.TOP_RIGHT, 'danger');
        },
    );
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.existedRFQ = JSON.parse(sessionStorage.getItem("request for quotation"));
    this.existedPR = JSON.parse(sessionStorage.getItem("purchase requisition"));
    this.suppliers = this.existedRFQ.suppliers;
    for (let p = 0; p < this.existedPR.material.length; p++) {
      if (this.existedPR.material[p].materialPrice === null) {
        this.disableSave = true;
      }
    }
  }

}
