import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../models/material/material";
import {PurchaseReturnService} from "../../../services/purchaseReturn/purchase-return.service";
import {MaterialService} from "../../../services/material/material.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import moment from 'moment';
import {PurchaseProcessService} from "../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-create-purchase-return',
  templateUrl: './create-purchase-return.component.html',
  styleUrls: ['./create-purchase-return.component.scss']
})
export class CreatePurchaseReturnComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  purchaseReturnForm: FormGroup;
  newPurchaseReturn;
  existedMaterial: Material = new Material();
  materials : Material[] = [];
  moment: any = moment;
  materialId: String;
  existedPP;

  constructor(private purchaseReturnService: PurchaseReturnService, private materialService: MaterialService,
              private dialogService: NbDialogService, private toastrService: NbToastrService, 
              private formBuilder: FormBuilder, private router: Router, 
              private location: Location, private ppService: PurchaseProcessService) {
    this.purchaseReturnForm = formBuilder.group({
      reason: ['', Validators.required]
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
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "RETURN"+result;
  }
  
  createNewPurchaseReturn(): void {
    this.newPurchaseReturn = {
      reason: this.purchaseReturnForm.value.reason,
      material: this.existedMaterial,
      purchaseReturnRef: CreatePurchaseReturnComponent.getRandomNumber(100000, 999999)
    }
    this.materialService.returnMaterial(this.materialId).subscribe(() => {
      this.purchaseReturnService.addNewPurchaseReturn(this.newPurchaseReturn).subscribe(
      () => {
        this.materialService.revertMaterial(this.materialId).subscribe(() => {
          this.purchaseReturnForm.reset();
          this.showToast('Purchase Return Created Successfully' , this.positions.TOP_RIGHT, 'success');
          this.router.navigateByUrl('/pim/received-materials');
          if (this.existedPP) {
            this.ppService.seventhEditPP(this.existedPP.purchaseProcessId, this.materialId).subscribe(purchaseProcess => {
              this.ppService.finalEditPPNoService(this.existedPP.purchaseProcessId).subscribe(pp => {
                sessionStorage.setItem("purchaseProcess", JSON.stringify(pp));
              });
            }, errorPP => {
              this.showToast(errorPP.error , this.positions.TOP_RIGHT, 'danger');
            })
          }
        }, errorRevert => {
          this.showToast(errorRevert.error , this.positions.TOP_RIGHT, 'danger');
        })
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      }
    )
    }, errorReturn => {
      this.showToast(errorReturn.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

  ngOnInit(): void {
    this.existedPP = JSON.parse(sessionStorage.getItem("purchaseProcess"));
    this.materialId = this.router.url.replace('/pim/purchase-return/create/', '');
    this.materialService.getOneMaterial(this.materialId)
      .subscribe((material) => {
        this.existedMaterial = material;
      }, error => {
        return error.error;
      })
    this.materialService.getAllMaterials().subscribe((materials) => {
      this.materials = materials;
    }, errorM => {
      return errorM.error;
    })
  }

}
