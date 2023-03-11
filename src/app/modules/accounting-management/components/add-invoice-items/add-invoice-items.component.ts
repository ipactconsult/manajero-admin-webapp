import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition, NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductView} from "../../models/product-view.model";
import {ProductViewService} from "../../services/productView/product-view.service";
import {InvoiceItem} from "../../models/invoice-item.model";
import {InvoiceItemService} from "../../services/invoiceItem/invoice-item.service";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {Invoice} from "../../models/invoice.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-add-invoice-items',
  templateUrl: './add-invoice-items.component.html',
  styleUrls: ['./add-invoice-items.component.scss']
})
export class AddInvoiceItemsComponent implements OnInit {

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

  date: Date;
  
  idUri: string = '';
  totalInvoice: number = 0;
  tagTotalInvoice: string="Total: 0 $";

  positions = NbGlobalPhysicalPosition;
  selectedInvoiceItem;
  
  invoiceItemsForm: FormGroup;
  newInvoiceItems: InvoiceItem;
  invoice: Invoice;
  
  
  productViews: ProductView [] = [];
  invoiceItems: InvoiceItem [] = [];
  selectedInvoiceItems: InvoiceItem [] = [];

  constructor(private datePipe: DatePipe,private activatedroute: ActivatedRoute,private dialogService: NbDialogService, private toastrService: NbToastrService,
              private formBuilder: FormBuilder, private router: Router,private ps: ProductViewService,private iis: InvoiceItemService, private is:InvoiceService) { 
    this.invoiceItemsForm = formBuilder.group({
      description: ['', Validators.required],
      quantity: ['', Validators.required],
    })
  }

  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  createNewInvoiceItem(): void {
    console.log(this.invoiceItemsForm.value.description.sellingPrice);
    this.newInvoiceItems = {
      description: this.invoiceItemsForm.value.description.materialName,
      quantity: this.invoiceItemsForm.value.quantity,
      unitPrice: this.invoiceItemsForm.value.description.sellingPrice,
      invoice: {
        id: this.idUri,
      }
    }
    this.iis.addInvoice(this.newInvoiceItems).subscribe(
      () => {
        this.invoiceItemsForm.reset();
        this.showToast('success', 'Add ! ', 'New Invoice Line Added !!');
        this.invoiceItems.push(this.newInvoiceItems);
      }, error => {
        this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
      }
    )
  }

  cancelSelection(invoiceitem) {
    this.selectedInvoiceItems.splice(this.selectedInvoiceItems.indexOf(invoiceitem), 1);
    this.invoiceItems.push(invoiceitem);
    this.totalInvoice -= invoiceitem.unitPrice * invoiceitem.quantity;
    this.tagTotalInvoice = "Total:"+ this.totalInvoice +" $";
  }


  selectInvoiceItems(selectedInvoiceItem): void {
    if (selectedInvoiceItem !== null) {
      this.selectedInvoiceItem = selectedInvoiceItem;
      this.selectedInvoiceItems.push(this.selectedInvoiceItem);
      this.invoiceItems.splice(this.invoiceItems.indexOf(this.selectedInvoiceItem), 1);
      this.totalInvoice += this.selectedInvoiceItem.unitPrice *this.selectedInvoiceItem.quantity;
      this.tagTotalInvoice = "Total:"+ this.totalInvoice +" $";
    }
  }
  
  addSelectedInvoiceItems(invoiceItems: InvoiceItem []): void {
    for (let i = 0; i < invoiceItems.length ; i++){
      this.iis.addInvoice(invoiceItems[i]).subscribe();
    }
    this.router.navigateByUrl('/accounting/invoicedetail/'+ this.invoice.id).then(() => {
      this.router.navigate(['/accounting/invoicedetail/'+ this.invoice.id]);
    });
    
  }


  ngOnInit(): void {

    this.date = new Date();
    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });
    
    this.is.getInvoiceId(this.idUri).subscribe(result =>{
      this.invoice = result;
    }
  )
    
    this.ps.getAll().subscribe((products: ProductView []) => {
      this.productViews = products;

    })

    this.date = this.invoice.dueDate;
    
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
