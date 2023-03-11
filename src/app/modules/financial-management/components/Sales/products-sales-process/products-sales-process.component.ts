import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbStepperComponent,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {ProductQuote} from "../../../models/ProductQuote";
import {ProductsSalesService} from "../../../service/ProductsSales/products-sales.service";
import {DatePipe} from "@angular/common";
const pdfMake = require('pdfmake/build/pdfmake');

import {ProductPurchaseOrder} from "../../../models/ProductPurchaseOrder";
import {ProductBillOfLading} from "../../../models/ProductBillOfLading";
import {SalesProcessHelperComponent} from "../utils/helpers/sales-process-helper/sales-process-helper.component";
import SignaturePad from "signature_pad";


@Component({
  selector: 'ngx-products-sales-process',
  templateUrl: './products-sales-process.component.html',
  styleUrls: ['./products-sales-process.component.scss']
})
export class ProductsSalesProcessComponent implements OnInit {
  productQuote = new ProductQuote();
  productPurchaseOrder = new ProductPurchaseOrder();
  quoteGroup : FormGroup= new FormGroup({});
  orderGroup :FormGroup= new FormGroup({});
  billGroup:FormGroup=new FormGroup({});
  constructor(private ws : NbWindowService,private salesService: ProductsSalesService, private router:Router, private fb:FormBuilder, private toastrService: NbToastrService) {
    this.quoteGroup= new FormGroup(
      {
        quantity : new FormControl('',Validators.min(0)),
        unitPrice: new FormControl('',Validators.min(0)),
        productName: new FormControl(''),
        customerName : new FormControl(''),
        customerEmail: new FormControl(''),
        customerAddress: new FormControl(''),
        customerPhone: new FormControl(''),
        taxRate: new FormControl('',Validators.min(0)),
        servicesFees: new FormControl('',Validators.min(0)),
        creationDate: new FormControl(''),
        enterpriseName: new FormControl(''),
        enterpriseAddress: new FormControl(''),
        enterpriseCity: new FormControl(''),
        enterprisePostalCode: new FormControl(''),
        enterpriseTaxRegistrationNumber :new FormControl('')
        



      }
    )
    this.orderGroup= new FormGroup({
      quantity : new FormControl('',Validators.min(0)),
      unitPrice: new FormControl('',Validators.min(0)),
      productName: new FormControl(''),
      customerName : new FormControl(''),
      customerEmail: new FormControl(''),
      customerAddress: new FormControl(''),
      customerPhone: new FormControl(''),
      taxRate: new FormControl('',Validators.min(0)),
      servicesFees: new FormControl('',Validators.min(0)),
      creationDate: new FormControl(''),
      enterpriseName: new FormControl(''),
      enterpriseAddress: new FormControl(''),
      enterpriseCity: new FormControl(''),
      enterprisePostalCode: new FormControl(''),
      advancePayment: new FormControl('',Validators.min(0)),
      paymentMode : new FormControl(''),
      paymentMethod:new FormControl(''),
      numberOfMonths:new FormControl('',Validators.min(0)),
      instalmentAmount: new FormControl('',Validators.min(0)),
      dueDate: new FormControl(''),
      logo: new FormControl(''),
      enterpriseTaxRegistrationNumber :new FormControl('')
      
    })
    this.billGroup= new FormGroup({
      productName :new FormControl(''),
      quantity :new FormControl('',Validators.min(0)),
      finalPrice:new FormControl('',Validators.min(0)),
      customerName: new FormControl(''),
      customerEmail: new FormControl(''),
      customerAddress: new FormControl(''),
      customerPhone: new FormControl(''),
      enterpriseName: new FormControl(''),
      enterpriseAddress: new FormControl(''),
      enterpriseCity: new FormControl(''),
      enterprisePostalCode: new FormControl(''),
      orderDate: new FormControl(''),
      shipmentDate: new FormControl(''),
      deliveryDate: new FormControl(''),
      logo:new FormControl(''),
      taxRate: new FormControl('',Validators.min(0)),
      servicesFees: new FormControl('',Validators.min(0)),
      advancePayment : new FormControl('',Validators.min(0)),
      enterpriseTaxRegistrationNumber :new FormControl('')
      
    })
  }
quotes;
  orders;
  bills;
  @ViewChild("canvas", { static: true })
  canvas :ElementRef
  sig: SignaturePad;
  @ViewChild("canvas2", { static: true })
  canvas2 :ElementRef
  sig2: SignaturePad;
  @ViewChild("canvas3", { static: true })
  canvas3 :ElementRef
  sig3: SignaturePad;
  ngOnInit():
    void {
    this.sig = new SignaturePad(this.canvas.nativeElement);
    this.sig2 = new SignaturePad(this.canvas2.nativeElement);
    this.sig3 = new SignaturePad(this.canvas3.nativeElement);
    this.salesService.getQuotes().subscribe(result=>{
      this.quotes=result
      
    })
    this.salesService.getProductPurchaseOrders().subscribe(result=>{
      this.orders=result
    })
    this.salesService.getProductBills().subscribe(result=>{
      this.bills=result
    })
  }
  //upload image

  cardImageBase64: string = '';
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          this.cardImageBase64 = e.target.result;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  
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
  quantity:number;
  unitPrice:number;
  totalPrice:number;
  productName:string;
  //customer
  customerName:string;
  customerEmail:string;
  customerAddress:string;
  customerPhone:string;
  //quote
  taxRate:number;
  servicesFees:number;
  finalPrice:number;
  reference:string;
  creationDate:Date;
  
  enterpriseName:string
  enterpriseCity:string
  enterpriseAddress:string;
  dateForm (date)  {
    let raw = new Date(date);

    return new DatePipe('en-EN').transform(raw, 'mediumDate');
  }
  //generatePDF
  buildTableBody(data, columns) {
    let body = [];

    body.push(columns);

    data.forEach(function(row) {
      let dataRow = [];

      columns.forEach(function(column) {

        dataRow.push(row[column]);
      })

      body.push(dataRow);
    
    });

    return body;
  }
  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns),
        widths: [112.5,112.5,112.5,112.5],





      }
    };
  }
  generatePDF () {
    const thetable =[{Name:this.productName,Quantity:this.quantity,Price:this.unitPrice,Total:this.totalPrice}]
    const docDefinition = {
      content: [
        {
          columns: [
            [ { text :"Vendor",
              style: "header"
            },
              {
                width: 170,
                text:
                  this.enterpriseName +"\n"+
                  this.enterpriseAddress +"\n"+
                  this.enterpriseCity  +"\n"+
                  this.productQuote.enterprisePostalCode+"\n" +
                  this.productQuote.enterpriseTaxRegistrationNumber
                    },
            ],
            {
              width: 140,
              image:this.cardImageBase64   ,
              marginRight: 50},

            [ { text :"Customer",
              style: "header",
              marginLeft:70

            },
              {
                width: 190,
                text:
                  this.customerName +"\n" +
                  this.customerAddress +"\n"+
                  this.customerEmail +"\n"+
                  this.customerPhone,
                marginBottom: 100,
                marginLeft:70,


              }]
          ]
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        {
          text: "Quote Number : " + this.reference,
          style: 'header',
          tocItem: true,
          marginTop: 5

        },
        {
          text: "Date : " + this.dateForm(this.creationDate) ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom :30

        },


        this.table (thetable,['Name','Quantity','Price','Total']),
        {
          table: {
            headerRows: 1,


            widths:[170,170,170
            ],
            body :[
              [
                "","", {
                text :

                  "Total Price Without tax: " + this.totalPrice +"\n"+
                  "Tax Rate: " + this.taxRate +"\n"+
                  "Services Fees: " + this.servicesFees+ "\n"+
                  "-----------------------------------------"+"\n"+

                  "Price After Tax: "+ this.finalPrice,
                style :"results",
                margin: [ 0, 60, 0, 15 ],







              }]
            ]

          },
          layout: 'noBorders'

        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        {
          columns :[
            {
              text :"Date and enterprise's signature",
              style : "header",
              width:255,
              marginTop :60,

            },
            {
              text :"Date and customer's signature",
              style : "header",
              width:350,
              marginTop :60,
              decoration:'underline',
              marginLeft:130

            }

          ]
        },{
          image:this.productQuote.signature,
          width:150,
        }
      ],
      styles :{header: {
          bold:true,
          decoration: 'underline'




        },
        results: {
          bold:true
        }

      }

    }
    pdfMake.createPdf(docDefinition).open();

  }
  
  addQuote() {
    this.productQuote.image=this.cardImageBase64
    this.productQuote.signature=this.sig.toDataURL()
    
    this.salesService.addQuote(this.productQuote).subscribe(
      (result)=>{
        


        this.enterpriseName=this.quoteGroup.get('enterpriseName').value
        this.enterpriseAddress=this.quoteGroup.get('enterpriseAddress').value
        this.enterpriseCity=this.quoteGroup.get('enterpriseCity').value
        this.quantity=result.quantity
        this.unitPrice=result.unitPrice
        this.totalPrice=result.totalPrice
        this.productName=result.productName
        this.customerName=result.customerName
        this.customerEmail=result.customerEmail
        this.customerAddress=result.customerAddress
        this.customerPhone=result.customerPhone
        this.taxRate=result.taxRate
        this.servicesFees=result.servicesFees
        this.finalPrice=result.finalPrice
        this.reference=result.reference
        this.creationDate=result.creationDate
        this.productQuote.enterprisePostalCode= result.enterprisePostalCode
        
        
        this.action("success","Success","Quote Added")
        this.generatePDF()
        this.cardImageBase64=''
        location.reload()
        
        
      },
    (err)=>{
      this.action("danger","Error","An Error has occured")

    }
    )
  }

  quotetabSettings ={
    mode:'external',
    edit: {
      editButtonContent: '<i class="fas fa-eye small"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    actions :{
      add:false,



    },

    hideSubHeader: false ,

    columns :{


      creationDate: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          return new DatePipe('en-EN').transform(raw, 'mediumDate');
        },
        


      },
      reference: {
        title: 'Reference',
        type: 'string',

        

      },
      productName: {
        title: 'Product Name',
        type: 'string',
        
      },
      finalPrice: {
        title: 'Final Price',
        type: 'number'},
      
      customerName: {
        title: 'Customer Name',
        type: 'string',
       
      },
      status :{
        title :'Status',
        type :'html',
        valuePrepareFunction:(status)=> { switch (status) {
          case "Pending": {
            return `<h5><span class="badge badge-danger">${status} </span></h5>`;
          }
          case "Validated": {
            return `<h5><span class="badge badge-success">${status} </span></h5>`;
          }}
          
        },
      },
      },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  
  downloadQuoteFromTable(event) {
    this.enterpriseName=event.data.enterpriseName
    this.enterpriseAddress=event.data.enterpriseAddress
    this.enterpriseCity=event.data.enterpriseCity
    this.quantity=event.data.quantity
    this.unitPrice=event.data.unitPrice
    this.totalPrice=event.data.totalPrice
    this.productName=event.data.productName
    this.customerName=event.data.customerName
    this.customerEmail=event.data.customerEmail
    this.customerAddress=event.data.customerAddress
    this.customerPhone=event.data.customerPhone
    this.taxRate=event.data.taxRate
    this.servicesFees=event.data.servicesFees
    this.finalPrice=event.data.finalPrice
    this.reference=event.data.reference
    this.creationDate=event.data.creationDate
    this.cardImageBase64 =event.data.image
    this.productQuote.signature=event.data.signature
    this.productQuote.enterpriseTaxRegistrationNumber=event.data.enterpriseTaxRegistrationNumber
    this.productQuote.enterprisePostalCode=event.data.enterprisePostalCode
    this.generatePDF()
    
  }

  deleteQuote(event) {
    this.salesService.removeQuote(event.data.id).subscribe(()=>{
      this.action("success","Success","Quote Deleted")
      location.reload()


    },(err)=>{
      this.action("danger","Danger","An Error has occured")


    })
  }
  
  //Purchase Orders
  chosen:Boolean=false;
@ViewChild("stepper")
stepper: NbStepperComponent;
  paymentModes =["Check","Direct Debit","Cash"]
  paymentMethod =["All Amount","Installment Payement"]
  selectedMethod(value) {

    if (value =="All Amount") {
      this.orderGroup.patchValue (
        {numberOfMonths : 1}

      )
      this.orderGroup.controls['numberOfMonths'].disable();

    }
    else {
      this.orderGroup.controls['numberOfMonths'].enable();
      this.orderGroup.patchValue (
        {numberOfMonths : null}

      )


    }


  }
  eventcontent : string[] = [ 'quantity',
    'unitPrice',
    'taxRate',
    'servicesFees' ,
    'customerName',
    'customerEmail',
    'customerAddress',
    'customerPhone',
    'productName',
    'enterpriseName',
    'enterpriseAddress',
    'enterpriseCity',
    'enterprisePostalCode',
    'enterpriseTaxRegistrationNumber'
   
  ]
  moveToSecondStep(event) {
    this.eventcontent.forEach(obj => {
      type ObjectKey = keyof typeof event.data;
      const myVar1 = obj as ObjectKey;

      this.orderGroup.get(obj).setValue(event.data[myVar1])

    })
    type ObjectKey14 = keyof typeof event.data.image;
    const myVar14 = 'image' as ObjectKey14;
    this.cardImageBase64 = event.data[myVar14];

    this.orderGroup.controls['logo'].disable();
    this.salesService.validateQuote(event.data.id).subscribe(()=>{
      this.action("success","Success","Quote Validated!")

    },()=>{
      this.action("danger","Error","An error has occured !")

    });

    this.stepper.next();
  }
  instalmentAmount;
  addProductPurchaseOrder(){
    if ( this.cardImageBase64!= undefined) {
    this.productPurchaseOrder.image=this.cardImageBase64}
    this.productPurchaseOrder.signature=this.sig2.toDataURL()

    this.salesService.addProductPurchaseOrder(this.productPurchaseOrder).subscribe(result=>{
      this.action("success","Success","Purchase Order Added")
      this.productPurchaseOrder.totalPrice = result.totalPrice
      this.productPurchaseOrder.finalPrice =result.finalPrice
      this.productPurchaseOrder.instalmentAmount=result.instalmentAmount
      this.productPurchaseOrder.creationDate=result.creationDate
      this.productPurchaseOrder.reference=result.reference
      this.productPurchaseOrder.image=result.image
      
      this.createOrderPDF()
      location.reload()


    }, (err) => {
      this.action("danger","Error","An Error has occured")

    })
  } 
  
  //Order PDF

  buildTableBody2(data, columns) {
    let body = [];

    body.push(columns);

    data.forEach(function(row) {
      let dataRow = [];

      columns.forEach(function(column) {
        dataRow.push(row[column.replace(/\s/g, "")]);

      })

      body.push(dataRow);

    });

    return body;
  }


  table2(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody2(data, columns),
        widths: [150,150,150],




      }
    };
  }
  table3(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody2(data, columns),
        widths: [83,83,83,83,83,83],
        style :'table'


      }
    };
  }
  viewOrderFromTable (event){
 
    this.productPurchaseOrder=event.data
    this.createOrderPDF()
   
  }


  createOrderPDF () {
    const thetable1 =[{ProductName: this.productPurchaseOrder.productName, Quantity : this.productPurchaseOrder.quantity, UnitPrice:this.productPurchaseOrder.unitPrice,TotalPrice: this.productPurchaseOrder.totalPrice,}]
    const thetable2 =[{PaymentMode: this.productPurchaseOrder.paymentMode, PaymentMethod : this.productPurchaseOrder.paymentMethod,InstalmentsNumber: this.productPurchaseOrder.numberOfMonths}]


    const thetable3 =[{ TaxRate : this.productPurchaseOrder.taxRate+"%",ServicesFees: this.productPurchaseOrder.servicesFees,Advance: this.productPurchaseOrder.advancePayment , FinalPrice: this.productPurchaseOrder.finalPrice, Instalment : this.productPurchaseOrder.instalmentAmount,DueDate: this.dateForm(this.productPurchaseOrder.dueDate)}]
    const docDefinition2 = {


      content: [
        {
          columns: [
            [ { text :"Vendor",
              style: "header"
            },
              {
                width: 170,
                text:
                  this.productPurchaseOrder.enterpriseName +"\n"+
                  this.productPurchaseOrder.enterpriseAddress +"\n"+
                  this.productPurchaseOrder.enterpriseCity  +"\n"+
                  this.productPurchaseOrder.enterprisePostalCode+"\n" +
                  this.productPurchaseOrder.enterpriseTaxRegistrationNumber
              },
            ],
            {
              width: 110,
              image:this.productPurchaseOrder.image   ,
              marginRight: 50},

            [ { text :"Customer",
              style: "header",
              marginLeft:70

            },
              {
                width: 190,
                text:
                  this.productPurchaseOrder.customerName +"\n" +
                  this.productPurchaseOrder.customerAddress +"\n"+
                  this.productPurchaseOrder.customerEmail +"\n"+
                  this.productPurchaseOrder.customerPhone,
                marginBottom: 70,
                marginLeft:70,


              }]
          ]
        },
        {
          text: "Purchase Order Number : " + this.productPurchaseOrder.reference,
          style: 'header',
          tocItem: true,
          marginTop: 40,
          decoration: 'underline'

        },
        {
          text: "Date : " + this.dateForm(this.productPurchaseOrder.creationDate) ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom: 20,
          decoration: 'underline'

        },

        this.table (thetable1,['ProductName','Quantity','UnitPrice','TotalPrice']),
        {
          text: " "  ,

          marginBottom: 20,




        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},


        {
          text: "Payment Reglementations: "  ,
          style: 'header',
          tocItem: true,
          marginTop: 20,
          marginBottom: 20,
          decoration: 'underline'
          


        },


        this.table2 (thetable2,['PaymentMode','PaymentMethod','InstalmentsNumber']),{
          text: "Fees Details: "  ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom: 20,
          decoration: 'underline'



        },
        this.table3 (thetable3,['TaxRate','ServicesFees','Advance','FinalPrice','Instalment','DueDate']),
        {
          text: " "  ,
         
          marginBottom: 20,
          



        },
        
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          columns :[
            {
              text :"Date and enterprise's signature",
              style : "header",
              width:200,
              marginTop :75,
              decoration:'underline'

            },
            {
              text :"Date and customer's signature",
              style : "header",
              width:350,
              marginTop :75,
              decoration:'underline',
              marginLeft:130

            }

          ]
        }
        ,{
          image:this.productPurchaseOrder.signature,
          width:150,
        }









      ],
      
      styles :{header: {
          bold: true,},

      }

    }
    pdfMake.createPdf(docDefinition2).open();

  }
  eventcontent2 : string[] = [ 'quantity',
    'finalPrice',
    'servicesFees',
    'advancePayment',
    'taxRate',
    'customerName',
    'customerEmail',
    'customerAddress',
    'customerPhone',
    'productName',
    'enterpriseName',
    'enterpriseAddress',
    'enterpriseCity',
    'enterprisePostalCode',
    'enterpriseTaxRegistrationNumber'

  ]
  moveToThirdStep(event) {
    this.eventcontent2.forEach(obj => {
      type ObjectKey = keyof typeof event.data;
      const myVar1 = obj as ObjectKey;

      this.billGroup.get(obj).setValue(event.data[myVar1])

    })
    type ObjectKey14 = keyof typeof event.data.image;
    const myVar14 = 'image' as ObjectKey14;
    this.cardImageBase64 = event.data[myVar14];

    this.billGroup.controls['logo'].disable();
    this.salesService.validateOrder(event.data.id).subscribe(()=>{
      this.action("success","Success","Order Validated !")

    },()=>{
      this.action("danger","Error","An error has occured !")

    })

    this.stepper.next();
  }
  deleteOrder(event) {
    this.salesService.removeOrder(event.data.id).subscribe(()=>{
      this.action("success","Success","Order Deleted")
      location.reload()

    },(err)=>{
      this.action("danger","Danger","An Error has occured")


    })
  }
 
  //bill of lading
  productBillOfLading : ProductBillOfLading= new ProductBillOfLading();
  
  createBillOfLading() {
    if ( this.cardImageBase64!= undefined) {
      this.productBillOfLading.image=this.cardImageBase64}
    this.productBillOfLading.signature=this.sig3.toDataURL()

    this.salesService.addProductBill(this.productBillOfLading).subscribe(result=>{
      this.action("success","Success","Bill Added")
     
      this.productBillOfLading.finalPrice=result.finalPrice
      this.productBillOfLading.reference=result.reference
      this.productBillOfLading.creationDate=result.creationDate
      this.createBillPDF();
      location.reload()



    },(err)=>{
      this.action("danger","Error","An Error has occured")


    })
  }
  
  createBillPDF () {
    const thetable1 =[{ProductName: this.productBillOfLading.productName, Quantity : this.productBillOfLading.quantity,ServicesFees: this.productBillOfLading.servicesFees,TaxRate: this.productBillOfLading.taxRate +'%',AdvancePayment:this.productBillOfLading.advancePayment,FinalPrice: this.productBillOfLading.finalPrice,}]


    const thetable3 =[{Order:this.dateForm(this.productBillOfLading.orderDate) , Shipment:this.dateForm(this.productBillOfLading.shipmentDate), Delivery:this.dateForm(this.productBillOfLading.deliveryDate)}]
    const docDefinition2 = {


      content: [
        {
          columns: [
            [ { text :"Vendor",
              style: "header"
            },
              {
                width: 170,
                text:
                  this.productBillOfLading.enterpriseName +"\n"+
                  this.productBillOfLading.enterpriseAddress +"\n"+
                  this.productBillOfLading.enterpriseCity  +"\n"+
                  this.productBillOfLading.enterprisePostalCode+"\n" +
                  this.productBillOfLading.enterpriseTaxRegistrationNumber
              },
            ],
            {
              width: 110,
              image:this.productBillOfLading.image   ,
              marginRight: 50},

            [ { text :"Customer",
              style: "header",
              marginLeft:70

            },
              {
                width: 190,
                text:
                  this.productBillOfLading.customerName +"\n" +
                  this.productBillOfLading.customerAddress +"\n"+
                  this.productBillOfLading.customerEmail +"\n"+
                  this.productBillOfLading.customerPhone,
                marginBottom: 70,
                marginLeft:70,


              }]
          ]
        },
        {
          text: "Bill Of Lading Number : " + this.productBillOfLading.reference,
          style: 'header',
          tocItem: true,
          marginTop: 40,
          decoration: 'underline'

        },
        {
          text: "Date : " + this.dateForm(this.productBillOfLading.creationDate) ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom: 20,
          decoration: 'underline'

        },

        this.table3 (thetable1,['Product Name','Quantity','Services Fees','Tax Rate','Advance Payment','Final Price']),
        {
          text: " "  ,

          marginBottom: 20,




        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},


        {
          text: "Distribution Dates: "  ,
          style: 'header',
          tocItem: true,
          marginTop: 20,
          marginBottom: 20,
          decoration: 'underline'



        },


        this.table2 (thetable3,['Order','Shipment','Delivery']),
        {
          text :"",
          marginTop:20

        },
       

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          columns :[
            {
              text :"Date and enterprise's signature",
              style : "header",
              width:200,
              marginTop :75,
              decoration:'underline'

            },
            {
              text :"Date and customer's signature",
              style : "header",
              width:350,
              marginTop :75,
              decoration:'underline',
              marginLeft:130

            }

          ]
        }
        ,{
          image:this.productBillOfLading.signature,
          width:150,
        }









      ],

      styles :{header: {
          bold: true,},

      }

    }
    pdfMake.createPdf(docDefinition2).open();

  }
  billsSettings ={
    mode:'external',
    edit: {
      editButtonContent: '<i class="fas fa-eye small"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave :false

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    actions :{
      add:false,



    },

    hideSubHeader: false ,

    columns :{


      creationDate: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          
          let raw = new Date(date);

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        }},
        deliveryDate: {
          title: 'Delivery Date',
          type: 'Date',
          valuePrepareFunction: (date) => {
            let raw = new Date(date);

            let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
            return formatted;
          },},



     
      reference: {
        title: 'Reference',
        type: 'string',



      },
      productName: {
        title: 'Product Name',
        type: 'string',

      },
      finalPrice: {
        title: 'Final Price',
        type: 'number'},

      customerName: {
        title: 'Customer Name',
        type: 'string',

      },
      status :{
        title :'Status',
        type :'html',
        valuePrepareFunction:(status)=> { switch (status) {
          case "Pending": {
            return `<h5><span class="badge badge-danger">${status} </span></h5>`;
          }
          case "Validated": {
            return `<h5><span class="badge badge-success">${status} </span></h5>`;
          }}

        },
      },
    },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  viewBillFromTable(event) {
    this.productBillOfLading=event.data
    this.createBillPDF()
  }
  deleteBIll(event) {
    this.salesService.removeBill(event.data.id).subscribe(()=>{
      this.action("success","Success","Bill Deleted")
      location.reload()      
      
    },()=>{
      this.action("danger","Danger","An Error has occured")


    })
  }
  validateBill(event) {
    this.salesService.validateBill(event.data.id).subscribe(()=>{
      this.action("success","Success","Bill Validated !")

    },()=>{
      this.action("danger","Error","An error has occured !")

    })

  }
openWindow(){
    this.ws.open(SalesProcessHelperComponent,{ title: `Help` })
}
}
