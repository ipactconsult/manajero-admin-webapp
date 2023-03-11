import { Component, OnInit } from '@angular/core';
import {CreditService} from "../../services/credit/credit.service";
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {CustomerView} from "../../models/customer-view.model";
import {CustomerViewService} from "../../services/customerView/customer-view.service";

@Component({
  selector: 'ngx-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent implements OnInit {

  creditForm!: FormGroup;
  creditToAdd;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  customer: CustomerView [];

  constructor(private cvs: CustomerViewService, private router: Router, private cs: CreditService,private formbuilder: FormBuilder,
              private toastrService: NbToastrService,
              private windowService: NbWindowService) {
    this.creditForm = formbuilder.group({
      interestRate: ['', Validators.required],
      inflationRate: ['', Validators.required],
      initialCapital: ['', Validators.required],
      clientName : ['', Validators.required],
      taxRate: ['', Validators.required],
      periods: ['', Validators.required],
      frequency: ['', Validators.required],
      currency: ['', Validators.required],
    })
  }


  ngOnInit(): void {

    this.cvs.getAll().subscribe(
      (data: CustomerView []) =>{
        this.customer = data;
      }
    )
    
  }
  submit() {
    this.creditToAdd = {
      clientName: this.creditForm.value.clientName.name,
      clientEmail: this.creditForm.value.clientName.workEmail,
      clientPhone: this.creditForm.value.clientName.phone,
      clientAddress: this.creditForm.value.clientName.address,
      interestRate: this.creditForm.value.interestRate / 100,
      inflationRate: this.creditForm.value.inflationRate / 100,
      initialCapital: this.creditForm.value.initialCapital,
      taxRate: this.creditForm.value.taxRate / 100,
      periods: this.creditForm.value.periods,
      frequency: this.creditForm.value.frequency,
      currency: this.creditForm.value.currency 
    }
    this.cs.addCredit(this.creditToAdd).subscribe(result => {

        this.showToast('success', 'Add ! ', 'New Credit Added !!');
        this.router.navigateByUrl('/accounting/creditlist').then(() => {
          this.router.navigate(['/accounting/creditlist']);
        });

      },
      (err) => {
        this.showToast('danger', 'Add ! ', err.error.message);

      },
    );
  }


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
