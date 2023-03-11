import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder} from "@angular/forms";
import moment from "moment";
import {Material} from "../../../../models/material/material";
import {Category} from "../../../../models/category/category";
import {MaterialService} from "../../../../services/material/material.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {PurchaseProcessService} from "../../../../services/purchaseProcess/purchase-process.service";

@Component({
  selector: 'ngx-buy-material',
  templateUrl: './buy-material.component.html',
  styleUrls: ['./buy-material.component.scss']
})
export class BuyMaterialComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  selectedMaterial;
  materials: Material[] = [];
  categories: Category[] = [];
  selectedMaterials: Material[] = [];
  moment: any = moment;
  purchaseProcess;
  progressStatus = "basic";
  userConnected;

  constructor(private materialService: MaterialService, private dialogService: NbDialogService, 
              private toastrService: NbToastrService, 
              private formBuilder: FormBuilder, private router: Router, 
              private location: Location, private ppService: PurchaseProcessService) {
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  cancelProcess(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }
  
  cancelWithToast(ref) {
    ref.close();
    this.showToast("Purchase Cancelled" , this.positions.TOP_RIGHT, 'danger');
    this.router.navigateByUrl('/pim/procurement/materials');
  }
  
  cancelSelection(material) {
    this.selectedMaterials.splice(this.selectedMaterials.indexOf(material), 1);
    this.materials.push(material);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  goToPurchaseRequisition(): void {
    this.purchaseProcess = {
      materials: this.selectedMaterials,
      step: 1,
      addedBy: this.userConnected
    };
    this.ppService.createPurchaseProcess(this.purchaseProcess).subscribe(purchaseProcess => {
      sessionStorage.setItem("purchaseProcess", JSON.stringify(purchaseProcess));
      sessionStorage.setItem("materials", JSON.stringify(this.selectedMaterials));
      this.router.navigateByUrl('/pim/procurement/purchase-requisition/create');
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }
  
  selectMaterial(selectedMaterial): void {
    if (selectedMaterial !== null) {
      this.selectedMaterial = selectedMaterial;
      this.selectedMaterials.push(this.selectedMaterial);
      this.materials.splice(this.materials.indexOf(this.selectedMaterial), 1);
    }
  }

  ngOnInit(): void {
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
    this.materialService.getAllMaterials().subscribe(materials => {
      for (let m = 0; m < materials.length; m++) {
        if (!materials[m].supplier && materials[m].materialState === true && materials[m].addedBy?.email === this.userConnected.email) {
          this.materials.push(materials[m]);
        }
      }
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    });
  }

}
