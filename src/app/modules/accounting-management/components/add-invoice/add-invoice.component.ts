import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Invoice} from "../../models/invoice.model";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {Router} from "@angular/router";
import {CustomerView} from "../../models/customer-view.model";
import {CustomerViewService} from "../../services/customerView/customer-view.service";


@Component({
  selector: 'ngx-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;
  invoiceToAdd: Invoice;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  dateToday: Date;

  customer: CustomerView [];




  constructor(private router: Router,private formbuilder: FormBuilder,
              private toastrService: NbToastrService,
              private windowService: NbWindowService, private is: InvoiceService, private cs: CustomerViewService) {
    this.invoiceForm = formbuilder.group({
      title: ['', Validators.required],
      clientName : ['', Validators.required],
      code : ['', Validators.required],
      dueDate : ['', Validators.required],
      invoiceNumber : ['', Validators.required],
      currency : ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.cs.getAll().subscribe(
      (data: CustomerView []) =>{
        this.customer = data;
      }
    )
    this.dateToday = new Date();
  }

  submit() {

    this.invoiceToAdd = {
      title: this.invoiceForm.value.title,
      clientName: this.invoiceForm.value.clientName.name,
      clientEmail: this.invoiceForm.value.clientName.workEmail,
      clientPhone: this.invoiceForm.value.clientName.phone,
      clientAddress: this.invoiceForm.value.clientName.address,
      code: this.invoiceForm.value.code,
      dueDate: this.invoiceForm.value.dueDate,
      invoiceNumber: this.invoiceForm.value.invoiceNumber,
      currency: this.invoiceForm.value.currency
    }
    this.is.addInvoice(this.invoiceToAdd).subscribe(result => {

        this.showToast('success', 'Add ! ', 'New Invoice Added !!');

        this.router.navigateByUrl('/accounting/addinvoiceitems/'+ result.id).then(() => {
          this.router.navigate(['/accounting/addinvoiceitems/'+ result.id]);
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
