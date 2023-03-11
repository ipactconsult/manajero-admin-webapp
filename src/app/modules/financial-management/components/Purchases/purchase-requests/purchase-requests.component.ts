import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {PurchasesService} from "../../../service/Purchases/purchases.service";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-purchase-requests',
  templateUrl: './purchase-requests.component.html',
  styleUrls: ['./purchase-requests.component.scss']
})
export class PurchaseRequestsComponent implements OnInit {

  constructor(
     private ps :PurchasesService,private toastrService: NbToastrService
  ) { }
 source :Object[]
  ngOnInit(): void {
    this.ps.retrievePendingRequests().subscribe(data =>{
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
      purchaseRequisitionNumber: {
        title: 'Number',
        type: 'string',
      },
      'material[0].materialType' :{
        title:'Product Type',
        
        valuePrepareFunction: (cell, row) => {
          return row.material[0].materialType }


     
      },
      'material.materialName' :{
        title :'Product Name',
        valuePrepareFunction: (cell, row) => {
          return row.material[0].materialName }


      
      },
      'material.materialCategory.categoryName' :{
        title :'Category',
        valuePrepareFunction: (cell, row) => {
          return row.material[0].materialCategory.categoryName }



      
      },
      'material.materialQuantity' :{
        title :'Quantity',
        valuePrepareFunction: (cell, row) => {
          return row.material[0].materialQuantity }



      
      },
      purchaseRequisitionCreationDate: {
        title :'Request Creation Date',
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
  approveRequest(event) {

    this.ps.approveRequest(event.data.purchaseRequisitionId).subscribe(()=>{
        this.action("success", "Success", "Request Approved")
      location.reload()


      } ,()=>{
      this.action("success", "Success", "Order Approved")
      location.reload()

      }
    )
  }
  rejectRequest(event) {
    this.ps.rejectRequest(event.data.purchaseRequisitionId).subscribe(()=>{
        this.action("success", "Success", "Request Rejected")
      location.reload()


      } ,()=>{
      this.action("success", "Success", "Order Approved")
      location.reload()

      }
    )
  }

}
