import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {Supplier} from "../../../../models/supplier/supplier";
import {Router} from "@angular/router";
import {QuotationService} from "../../../../services/quotation/quotation.service";
import {Quotation} from "../../../../models/quotation/quotation";
import {Material} from "../../../../models/material/material";
import {PurchaseOrderService} from "../../../../services/purchaseOrder/purchase-order.service";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Location} from "@angular/common";
import moment from "moment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestForQuotation} from "../../../../models/requestForQuotation/request-for-quotation";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent implements OnInit {
  
  selectedSupplier: Supplier;
  existedRFQ: RequestForQuotation = new RequestForQuotation();
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  allQuotations: Quotation[] = [];
  quotationsByQN: Quotation[] = [];
  materials: Material[] = [];
  newPO;
  positions = NbGlobalPhysicalPosition;
  completedState5 = true;
  completedState4 = true;
  completedState3 = true;
  completedState2 = true;
  completedState1 = true;
  moment: any = moment;
  poMadeState = false;
  poForm: FormGroup;
  dateToday;
  purchaseProcess;
  existedPP;
  user;
  progressStatus = "success";
  disableFinishBtn = false;
  progressValue = 90;

  constructor(private prService: PurchaseRequisitionService, private rfqService: RequestForQuotationService,
              private quotationService: QuotationService, private poService: PurchaseOrderService,
              private location: Location, private dialogService: NbDialogService,
              private toastrService: NbToastrService, private router: Router,
              private formBuilder: FormBuilder, private ppService: PurchaseProcessService) {
    this.poForm = formBuilder.group({
      receptionDate: ['', Validators.required]
    }) 
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      sessionStorage.removeItem('selectedSupplier');
  }
  
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    for (let q = 0; q < this.quotationsByQN.length; q++) {
      this.quotationService.deleteQuotation(this.quotationsByQN[q].quotationId).subscribe(() => {
        
      }, errorQ => {
        return errorQ.error;
      })
    }
    this.rfqService.deleteRFQ(this.existedRFQ.rfqId).subscribe(() => {
      this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
        this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
          sessionStorage.removeItem('materials');
          sessionStorage.removeItem('purchase requisition');
          sessionStorage.removeItem('request for quotation');
          sessionStorage.removeItem('quotations');
          sessionStorage.removeItem('selectedSupplier');
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
      sessionStorage.removeItem('selectedSupplier');
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "PO"+result;
  }
  
  addNewPO(ref): void {
    this.newPO = {
      selectedSupplier: this.selectedSupplier,
      materials: this.materials,
      receptionDate: this.poForm.value.receptionDate,
      poNumber: CreatePoComponent.getRandomNumber(100000, 999999),
      addedBy: JSON.parse(sessionStorage.getItem('auth-user'))
    };
    this.poService.addNewPO(this.newPO).subscribe(result => {
      this.purchaseProcess = {
        step: 6,
        po: result
      };
      this.ppService.fifthEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess).subscribe(purchaseProcess => {
        sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
      }, errorPP => {
        this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
      });
      this.showToast('Purchase Order sent to Finance Team. It will be reviewed shortly.' , 
        this.positions.TOP_RIGHT, 'info');
      this.poMadeState = true;
      sessionStorage.removeItem('purchase requisition');
      sessionStorage.removeItem('request for quotation');
      sessionStorage.removeItem('quotations');
      sessionStorage.removeItem('materials');
      sessionStorage.removeItem('selectedSupplier');
      ref.close();
      this.disableFinishBtn = true;
      this.progressValue = 100;
      setTimeout(() => {
        this.router.navigateByUrl('/pim/procurement/purchase-orders');
      }, 1000);
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      this.poMadeState = false;
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('auth-user'));
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.existedRFQ = JSON.parse(sessionStorage.getItem("request for quotation"));
    this.existedPR = JSON.parse(sessionStorage.getItem("purchase requisition"));
    this.selectedSupplier = JSON.parse(sessionStorage.getItem('selectedSupplier'));
    this.quotationsByQN = JSON.parse(sessionStorage.getItem('quotations'));
    this.quotationService.getAllQuotations().subscribe(quotations => {
      this.allQuotations = quotations;
      for (let q = 0; q < this.quotationsByQN.length; q++) {
        for (let m = 0; m < this.quotationsByQN[q].rfq?.pr?.material?.length; m++) {
          if (this.quotationsByQN[q].supplier?.supplierId === this.selectedSupplier.supplierId) {
            this.materials.push(this.quotationsByQN[q].rfq?.pr?.material[m]);
          }
        }
      }
    });
    this.dateToday = new Date();
  }

}
