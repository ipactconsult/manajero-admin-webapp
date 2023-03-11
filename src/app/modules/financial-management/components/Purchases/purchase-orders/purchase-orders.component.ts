import {Component, OnInit} from '@angular/core';
import {PurchasesService} from "../../../service/Purchases/purchases.service";
import {DatePipe} from "@angular/common";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  constructor(
    private ps :PurchasesService, private toastrService: NbToastrService
  ) { }
  source :Object[]
  ngOnInit(): void {
    this.ps.retrievePendingQuotes().subscribe(data =>{
      this.source=data;
    })
  }
  tabSettings ={
    mode:'external',
    actions: {
      add :false,
      },
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    delete: {
      deleteButtonContent: '<i class="nb-close"></i>',
      confirmDelete: false,
    },


    columns :{
      poNumber: {
        title: 'Number',
        type: 'string',
      },
      'selectedSupplier.supplierEmail' :{
        title:'Supplier Email',

        valuePrepareFunction: (cell, row) => {
          return row.selectedSupplier.supplierEmail }



      },
      'selectedSupplier.supplierCompany' :{
        title :'Supplier Company',
        valuePrepareFunction: (cell, row) => {
          return row.selectedSupplier.supplierCompany }



      },
    
    'material[0].materialType' :{
      title:'Product Type',

      valuePrepareFunction: (cell, row) => {
        return row.materials[0].materialType }



    },
    'material.materialName' :{
      title :'Product Name',
      valuePrepareFunction: (cell, row) => {
        return row.materials[0].materialName }



    },
      'material.materialCategory.categoryName' :{
        title :'Product Category',
        valuePrepareFunction: (cell, row) => {
          return row.materials[0].materialCategory.categoryName }




      },
      'materials.materialQuantity' :{
        title :'Quantity',
        valuePrepareFunction: (cell, row) => {
          return row.materials[0].materialQuantity }




      },
      poCreationDate: {
        title :'Purchase Order Creation Date',
        type :'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },
      }

    },
  

    

    pager: {
      display: true,
      perPage :15,
    }
  }
  //toast config 
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  private action (state:NbComponentStatus, title :string, message: string)
  {
    const config ={
      status : state,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    this.toastrService.show( message,title, config);
  }
  //end toast config
  approvePo(event) {
    this.ps.approveOrder(event.data.poId).subscribe(()=>{
      this.action("success", "Success", "Order Approved")
      location.reload()
    
  } ,(error)=>{
      this.action("success", "Success", "Order Approved")
      location.reload()

    }
  )
  }
  rejectPo(event) {
    this.ps.rejectOrder(event.data.poId).subscribe(()=>{
        this.action("success", "Success", "Order Rejected")
      location.reload()


      } ,()=>{
      this.action("success", "Success", "Order Approved")
      location.reload()

      }
    )
  }
  
}



