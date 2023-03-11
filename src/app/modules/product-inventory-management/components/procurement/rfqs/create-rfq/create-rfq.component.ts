import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../../models/material/material";
import moment from "moment";
import {Supplier} from "../../../../models/supplier/supplier";
import {PurchaseRequisitionService} from "../../../../services/purchaseRequisition/purchase-requisition.service";
import {SupplierService} from "../../../../services/supplier/supplier.service";
import {MaterialService} from "../../../../services/material/material.service";
import {Router} from "@angular/router";
import countries from '../../../../countries.json';
import {Location} from "@angular/common";
import {RequestForQuotationService} from "../../../../services/requestForQuotation/request-for-quotation.service";
import {PurchaseRequisition} from "../../../../models/purchaseRequisition/purchase-requisition";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import emailjs from '@emailjs/browser';
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-create-rfq',
  templateUrl: './create-rfq.component.html',
  styleUrls: ['./create-rfq.component.scss']
})
export class CreateRfqComponent implements OnInit {

  countries: any [] = [];
  positions = NbGlobalPhysicalPosition;
  supplierForm: FormGroup;
  rfqForm: FormGroup;
  newRFQ;
  materials: Material[] = [];
  selectedSuppliers: Supplier[] = [];
  suppliersByState: Supplier[] = [];
  selectedSupplier: Supplier = new Supplier();
  suppNbSelection: number = 0;
  completedState2 = true;
  completedState1 = true;
  moment: any = moment;
  dateToday;
  existedPR: PurchaseRequisition = new PurchaseRequisition();
  downloadURL: Observable<string>;
  supplierImage = '';
  templateParams;
  user;
  materialType = '';
  materialName = '';
  materialSKU = '';
  materialCategory = '';
  materialUnit = '';
  materialQuantity = '';
  purchaseProcess;
  existedPP;
  progressStatus = 'danger';

  constructor(private prService: PurchaseRequisitionService, private storage: AngularFireStorage,
              private rfqService: RequestForQuotationService, private supplierService: SupplierService, 
              private materialService: MaterialService, private dialogService: NbDialogService, 
              private toastrService: NbToastrService, private formBuilder: FormBuilder, 
              private router: Router, private location: Location,
              private ppService: PurchaseProcessService) {
    this.supplierForm = formBuilder.group({
      supplierFirstName: ['', Validators.required],
      supplierLastName: ['', Validators.required],
      supplierEmail: ['', Validators.required],
      supplierCompany: ['', Validators.required],
      supplierCountry: ['', Validators.required],
      supplierCurrency: ['', Validators.required],
      supplierImage: ['', Validators.required]
    });
    
    this.rfqForm = formBuilder.group({
      quotationDeadline: ['', Validators.required]
    })
  }

  cancelSelection(supplier) {
    this.selectedSuppliers.splice(this.selectedSuppliers.indexOf(supplier), 1);
    this.suppliersByState.push(supplier);
    this.suppNbSelection = this.suppNbSelection - 1;
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    this.prService.deletePR(this.existedPR.purchaseRequisitionId).subscribe(() => {
      this.ppService.deletePP(this.existedPP.purchaseProcessId).subscribe(() => {
        sessionStorage.removeItem('materials');
        sessionStorage.removeItem('purchase requisition');
        sessionStorage.removeItem('purchaseProcess');
        this.showToast("Purchase Cancelled" , this.positions.TOP_RIGHT, 'danger');
        this.router.navigateByUrl('/pim/procurement/materials');
      }, errorPP => {
        return errorPP.error;
      })
    }, error => {
      return error.error;
    })
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }

  selectSupplier(selectedSupplier): void {
    if (selectedSupplier !== null) {
      this.selectedSupplier = selectedSupplier;
      this.suppNbSelection = this.suppNbSelection + 1;
      this.selectedSuppliers.push(this.selectedSupplier);
      this.suppliersByState.splice(this.suppliersByState.indexOf(this.selectedSupplier), 1);
    } else {
      this.showToast("Creating New Supplier" , this.positions.TOP_RIGHT, 'info');
    }
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "RFQ"+result;
  }

  createNewRFQ(): void {
      this.newRFQ = {
        pr: this.existedPR,
        suppliers: this.selectedSuppliers,
        user: JSON.parse(sessionStorage.getItem('auth-user')),
        quotationDeadline: this.rfqForm.value.quotationDeadline,
        rfqNumber: CreateRfqComponent.getRandomNumber(100000, 999999)
      };
    this.rfqService.addNewRFQ(this.newRFQ).subscribe(
         result => {
           this.purchaseProcess = {
              step: 3,
              rfq: result
            };
            this.ppService.secondEditPP(this.existedPP.purchaseProcessId, this.purchaseProcess)
              .subscribe(purchaseProcess => {
              sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
              this.showToast('Request For Quotation Created Successfully.' , this.positions.TOP_RIGHT, 'success');
          sessionStorage.setItem("request for quotation", JSON.stringify(result));
          for (let m = 0; m < this.newRFQ.pr.material.length; m++) {
            this.materialType = `\n${this.materialType}`.concat(`${this.newRFQ.pr.material[m].materialType}\n\n\n`);
            this.materialName = `\n${this.materialName}`.concat(`${this.newRFQ.pr.material[m].materialName}\n\n\n`);
            this.materialSKU = `\n${this.materialSKU}`.concat(`${this.newRFQ.pr.material[m].materialSKU}\n\n\n`);
            this.materialCategory = `\n${this.materialCategory}`.concat(`${this.newRFQ.pr.material[m].materialCategory.categoryName}\n\n\n`);
            this.materialUnit = `\n${this.materialUnit}`.concat(`${this.newRFQ.pr.material[m].materialUnit}\n\n\n`);
            this.materialQuantity = `\n${this.materialQuantity}`.concat(`${this.newRFQ.pr.material[m].materialQuantity}\n\n\n`)
          }
          for (let s = 0; s < this.newRFQ.suppliers.length; s++) {
            this.templateParams = {
              supplierFirstName: result.suppliers[s].supplierFirstName,
              supplierLastName: result.suppliers[s].supplierLastName,
              supplierEmail: result.suppliers[s].supplierEmail,
              materialType: this.materialType,
              materialName: this.materialName,
              materialSKU: this.materialSKU,
              materialCategory: this.materialCategory,
              materialUnit: this.materialUnit,
              materialQuantity: this.materialQuantity,
              user: this.user.email
            };
            emailjs.send('gmail', 'requestForQuotationPIM', this.templateParams, 'hKe5Q_wImlLCq22-s')
          }
          this.showToast('Request For Quotation Sent to suppliers.' , this.positions.TOP_RIGHT, 'success');
          this.router.navigateByUrl('/pim/procurement/rfq/'+result.rfqId);
            }, errorPP => {
                this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
              })
          
      }, error => {
          this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
        },
    );
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem('purchaseProcess'));
    this.user = JSON.parse(sessionStorage.getItem('auth-user'));
    this.countries = countries;
    this.supplierService.getAllSuppliers().subscribe(suppliers => {
      for (let s = 0; s < suppliers.length; s++) {
        if (suppliers[s].supplierState === true && suppliers[s].addedBy?.company === this.user.company) {
          this.suppliersByState.push(suppliers[s]);
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
    this.existedPR = JSON.parse(sessionStorage.getItem("purchase requisition"));
    this.materials = this.existedPR.material;
    this.dateToday = new Date();
  }

}
