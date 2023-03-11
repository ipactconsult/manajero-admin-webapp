import {Component, OnInit} from '@angular/core';
import {SalesService} from "../../../service/Sales/sales.service";
import {DatePipe} from "@angular/common";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-sales-risk',
  templateUrl: './sales-risk.component.html',
  styleUrls: ['./sales-risk.component.scss']
})
export class SalesRiskComponent implements OnInit {

  constructor( private ss :SalesService, private toastrService: NbToastrService) { }
  unpaidPropertyOrders =[]
  unpaidProductOrders=[]
  undeliveredPropertyBills=[]
  undeliveredProductBills=[]
  paymentCheck ="Unchecked"
  deliveryCheck="Unchecked"
 now : Date= new Date()
  ngOnInit(): void {
    this.ss.getUnpaidOrders().subscribe(result=>{
      this.unpaidPropertyOrders=result
      this.unpaidPropertyOrders.forEach(ele=>{
        if(new Date(ele.dueDate).toISOString()<this.now.toISOString()) {
          this.paymentCheck="Checked"
        }
      })
    })
    this.ss.getUnpaidProductsOrders().subscribe(result=>{
      this.unpaidProductOrders=result
      this.unpaidProductOrders.forEach(ele=>{
        if(new Date(ele.dueDate).toISOString()<this.now.toISOString()) {
          this.paymentCheck="Checked"
        }
      })
    })
    this.ss.getUndeliveredPropertyBills().subscribe(result=>{
      this.undeliveredPropertyBills=result
      this.undeliveredPropertyBills.forEach(ele=>{
        if(new Date(ele.deliveryDate).toISOString()<this.now.toISOString()) {
          this.deliveryCheck="Checked"
        }
      })
    })
    this.ss.getUndeliveredProductsBills().subscribe(result=>{
      this.undeliveredProductBills=result
      this.undeliveredProductBills.forEach(ele=>{
        if(new Date(ele.deliveryDate).toISOString()<this.now.toISOString()) {
          this.deliveryCheck="Checked"
        }
      })
    })
    
  }
  unpaidPropertiesTab ={

    mode:'external',
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
   
    actions: {
      add:false,
      delete:false


    }
    ,
    hideSubHeader: false ,
    pager :{
      display :true,
      perPage: 5,
    },
    columns :{


      orderDate: {
        title: 'Order Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },
        //filter : { type :'custom', component:DateFilterComponent},




      },
      propertyName: {
        title: 'Property Name',
        type: 'string',




      },
      

      reference: {
        title: 'Order reference',
        type: 'number',




      },
      paymentStatus: {
        title: 'Payment Status',
        type: 'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Unpaid": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Paid": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}


        },

      }
      ,
      dueDate: {
        title: 'Due Date',
        type: 'html',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);
          let now = new Date();

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          if (raw.toISOString()>= now.toISOString()) {
            return `<h5><span class="badge badge-success"> ${formatted} </span></h5>`;

          }
          else {            return `<h5><span class="badge badge-danger"> ${formatted} </span></h5>`;
          }
          
        },

      }


    }}
  unpaidProductsTab ={

    mode:'external',
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    
    actions: {
      add:false,
      delete:false


    }
    ,
    hideSubHeader: false ,
    pager :{
      display :true,
      perPage: 5,
    },
    columns :{


      creationDate: {
        title: 'Order Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },




      },
      productName: {
        title: 'Property Name',
        type: 'string',




      },


      reference: {
        title: 'Order reference',
        type: 'number',




      },
      paymentStatus: {
        title: 'Payment Status',
        type: 'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Unpaid": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Paid": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}


        },

      }
      ,
      dueDate: {
        title: 'Due Date',
        type: 'html',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);
          let now = new Date();

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          if (raw.toISOString()>= now.toISOString()) {
            return `<h5><span class="badge badge-success"> ${formatted} </span></h5>`;

          }
          else {            return `<h5><span class="badge badge-danger"> ${formatted} </span></h5>`;
          }

        },

      }


    }}
  undeliveredPropertiesTab ={

    mode:'external',
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    
    actions: {
      add:false,
      delete:false


    }
    ,
    hideSubHeader: false ,
    pager :{
      display :true,
      perPage: 5,
    },
    columns :{


      orderDate: {
        title: 'Order Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        }




      },
      propertyName: {
        title: 'Property Name',
        type: 'string',




      },


      reference: {
        title: 'Order reference',
        type: 'number',




      },
      deliveryStatus: {
        title :'Delivery Status',
        type :'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Undelivered": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Delivered": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}


        },
        
      },
      deliveryDate: {
        title: 'Delivery Date',
        type: 'html',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);
          let now = new Date();

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          if (raw.toISOString()>= now.toISOString()) {
            return `<h5><span class="badge badge-success"> ${formatted} </span></h5>`;

          }
          else {            return `<h5><span class="badge badge-danger"> ${formatted} </span></h5>`;
          }

        },




      },
     

  


    }}
  undeliveredProductsTab ={

    mode:'external',
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
   
    actions: {
      add:false,
      delete:false


    }
    ,
    hideSubHeader: false ,
    pager :{
      display :true,
      perPage: 5,
    },
    columns :{


      creationDate: {
        title: 'Bill Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },
        //filter : { type :'custom', component:DateFilterComponent},




      },
      productName: {
        title: 'Property Name',
        type: 'string',




      },


      reference: {
        title: 'Order reference',
        type: 'number',




      },
      deliveryStatus: {
        title :'Delivery Status',
        type :'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Undelivered": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Delivered": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}


        },

      },
      deliveryDate: {
        title: 'Delivery Date',
        type: 'html',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);
          let now = new Date();

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          if (raw.toISOString()>= now.toISOString()) {
            return `<h5><span class="badge badge-success"> ${formatted} </span></h5>`;

          }
          else {            return `<h5><span class="badge badge-danger"> ${formatted} </span></h5>`;
          }

        },




      },





    }}
  //toast config 
  destroyByClick = true;
  duration = 2000;
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

  
  deliverBill (event) {
    this.ss.deliverPropertyBill(event.data.id).subscribe(()=>{
        this.action("success","Success", "Bill Delivered");
        location.reload()


      },
      ()=>{
        this.action("danger","Success", "an error has occured!");


      }
    )
  }
  deliverProdBill (event) {
    this.ss.deliverProductBill(event.data.id).subscribe(()=>{
        this.action("success","Success", "Bill Delivered");
        location.reload()


      },
      ()=>{
        this.action("danger","Success", "an error has occured!");


      }
    )
  }
  payOrder (event) {
    this.ss.payPropertyOrder(event.data.id).subscribe(()=>{
        this.action("success","Success", "Order Payed !");
        location.reload()


      },
      ()=>{
        this.action("danger","Success", "an error has occured!");


      }
    )
  }
  payProdOrder (event) {
    this.ss.payProductOrder(event.data.id).subscribe(()=>{
        this.action("success","Success", "Order Payed !");
        location.reload()


      },
      ()=>{
        this.action("danger","Success", "an error has occured!");


      }
    )
  }

}
