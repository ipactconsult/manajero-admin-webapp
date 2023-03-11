import {AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {SalesService} from "../../../service/Sales/sales.service";
import {Router} from "@angular/router";
const pdfMake = require('pdfmake/build/pdfmake');

import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbStepperComponent,
  NbToastrService, NbWindowService
} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Quote} from "../../../models/Quote";
import {DatePipe} from "@angular/common";
import { PurchaseOrders } from '../../../models/PurchaseOrders';

import {BillOfLading} from "../../../models/BillOfLading";
import {SalesProcessHelperComponent} from "../utils/helpers/sales-process-helper/sales-process-helper.component";
import SignaturePad from "signature_pad";



@Component({
  selector: 'ngx-sales-process',
  templateUrl: './sales-process.component.html',
  styleUrls: ['./sales-process.component.scss']
})
export class SalesProcessComponent implements OnInit,AfterViewInit {
   
  quoteGroup : FormGroup= new FormGroup({});
  quote :Quote = new Quote()
  billOfLading:BillOfLading= new BillOfLading();
  billGroup: FormGroup= new FormGroup({});
  ok
  constructor( private ws :NbWindowService,private salesService:SalesService, private router:Router, private fb:FormBuilder, private toastrService: NbToastrService) {
    
    this.quoteGroup= new FormGroup(
      {
        propertyName : new FormControl(),
        propertySurface: new FormControl(''),
        propertyPieces: new FormControl('',Validators.min(0)),
        propertyRooms :new FormControl('',Validators.min(0)),
        propertyCity : new FormControl(''),
        propertyCountry: new FormControl(''),
        propertyPrice: new FormControl('',Validators.min(0)),
        customerName: new FormControl(''),
        customerEmail: new FormControl(''),
        customerAddress: new FormControl(''),
        customerPhone: new FormControl(''),
        quoteDate: new FormControl(''),
        taxRate: new FormControl('',Validators.min(0)),
        servicesFees: new FormControl('',Validators.min(0)),
        enterpriseName:new FormControl(''),
        enterpriseAddress:new FormControl(''),
        enterpriseCity:new FormControl(''),
        enterprisePostalCode:new FormControl(''),
        enterpriseTaxRegistrationNumber :new FormControl('')
        
        
        
      }
    )
    this.poGroup = fb.group({
        propertyName2 : new FormControl(''),
        propertySurface2: new FormControl(''),
        propertyPieces2: new FormControl('',Validators.min(0)),
        propertyRooms2 :new FormControl('',Validators.min(0)),
        propertyCity2 : new FormControl(''),
        propertyCountry2: new FormControl(''),
        propertyPrice2: new FormControl('',Validators.min(0)),
        customerName2: new FormControl(''),
        customerEmail2: new FormControl(''),
        customerAddress2: new FormControl(''),
        customerPhone2: new FormControl(''),
        purchaseOrderDate: new FormControl(''),
        taxRate2: new FormControl('',Validators.min(0)),
        servicesFees2: new FormControl('',Validators.min(0)),
        advancePayment : new FormControl('',Validators.min(0)),
        paymentMode: new FormControl(''),
        paymentMethod:new FormControl(''),
        dueDate: new FormControl(''),
        numberOfMonths: new FormControl('',Validators.min(0)),
      enterpriseName:new FormControl(''),
      enterpriseAddress:new FormControl(''),
      enterpriseCity:new FormControl(''),
      logop: new FormControl(''),
      enterprisePostalCode:new FormControl(''),
      enterpriseTaxRegistrationNumber :new FormControl('')
      
        



        


    })
    this.billGroup= new FormGroup({
      propertyName : new FormControl(''),
      propertyPrice: new FormControl('',Validators.min(0)),
      finalPrice: new FormControl('',Validators.min(0)),
      customerName: new FormControl(''),
      customerEmail: new FormControl(''),
      customerAddress: new FormControl(''),
      customerPhone:new FormControl(''),
      enterpriseName:new FormControl(''),
      enterpriseAddress:new FormControl(''),
      enterpriseCity:new FormControl(''),
      logo: new FormControl(''),
      orderDate: new FormControl(''),
      shipmentDate: new FormControl(''),
      deliveryDate: new FormControl(''),
      taxRate: new FormControl('',Validators.min(0)),
      servicesFees: new FormControl('',Validators.min(0)),
      advancePayment : new FormControl('',Validators.min(0)),
      enterprisePostalCode:new FormControl(''),
      enterpriseTaxRegistrationNumber :new FormControl('')



    })
  }
  @ViewChild("canvas", { static: true }) 
  canvas :ElementRef
  sig: SignaturePad;
  @ViewChild("canvas2", { static: true })
  canvas2 :ElementRef
  sig2: SignaturePad;
  @ViewChild("canvas3", { static: true })
  canvas3 :ElementRef
  sig3: SignaturePad;
  
  
  ngAfterViewInit(): void {
    }

 
  
  source :Object[]
  quoSource :any;
  poSource;
  billSource;


  ngOnInit(): void {
    
    this.sig = new SignaturePad(this.canvas.nativeElement);
    this.sig2 = new SignaturePad(this.canvas2.nativeElement);
    this.sig3 = new SignaturePad(this.canvas3.nativeElement);


    this.salesService.getAllRequests().subscribe((data:Object[])=> {
      this.source=data;
      
     
      } 
      )
    this.salesService.getAllQuotes().subscribe((data:Quote[])=> {
      this.quoSource= data;
    })
    
    this.salesService.getAllOrders().subscribe((data)=>{
      this.poSource=data;
    })
    this.salesService.getBills().subscribe((data)=>{
      this.billSource=data;
    })


  }
  // step 1 table settings
  settings ={
    actions: {

      custom: [
        {
          name: 'view',
          title: '<i class="nb-checkmark"></i>',

        }],
      add :false,
      edit :false,
      delete: false},



    hideSubHeader: true ,

    columns :{
      'visit.property.propertyName': {
        title :'Property Name',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyName }


      },
      'visit.property.propertyReference': {
        title :'Property Reference',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyReference }


      },
      'visit.property.propertySurface': {
        title :'Property Surface',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertySurface }


      },
      'visit.property.propertyPieces': {
        title :'Number of pieces',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyPieces }


      },
      'visit.property.propertyRooms': {
        title :'Number of Rooms',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyRooms }


      },
      'visit.property.propertyCity': {
        title :'Property City',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyCity }


      },
      'visit.property.propertyCountry': {
        title :'Property Country',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyCountry }


      },

      'visit.property.price': {
        title :'Property Price',
        valuePrepareFunction: (cell, row) => {
          return row.visit.property.propertyPrice }


      },
      'visit.customer.name': {
        title :'Customer Name',
        valuePrepareFunction: (cell, row) => {
          return row.visit.customer.name }


      },
      'visit.customer.workEmail': {
        title :'Customer Email',
        valuePrepareFunction: (cell, row) => {
          return row.visit.customer.workEmail }


      },
      'visit.customer.address': {
        title :'Customer Address',
        valuePrepareFunction: (cell, row) => {
          return row.visit.customer.address }


      },
      'visit.customer.phone': {
        title :'Customer Phone',
        valuePrepareFunction: (cell, row) => {
          return row.visit.customer.phone }


      },

      comment : {
        title :'comment'
        ,
        valuePrepareFunction: (cell, row) => {
          return row.comment }
      },
      status : {
        title :'status'
        ,
        valuePrepareFunction: (cell, row) => {
          return row.status }
      },

      createdAt :{
        title :'createdAt'
        ,
        valuePrepareFunction: (cell, row) => {
          return row.createdAt}
      },

    },
    pager :{
      display :true,
      perPage: 5,
    }
  }
  
 
  
  propertyName:string ="";
  propertySurface:string="";
  propertyPieces:number;
  propertyRooms:number;
  propertyCity:string="";
  propertyCountry:string="";
  propertyPrice:number;

  name:string="";
  workEmail:string="";
  address:string="";
  phone:number;
  chosen:boolean=false;
  @ViewChild("stepper") 
  stepper: NbStepperComponent;

  goForward (event) :void {
    this.chosen=true;
    //property
    type ObjectKey = keyof typeof event.data.visit.property;

    const myVar1 = 'propertyName' as ObjectKey;
    this.propertyName =event.data.visit.property[myVar1];
    const myVar2 = 'propertySurface' as ObjectKey;
    this.propertySurface =event.data.visit.property[myVar2];
    const myVar3 = 'propertyPieces' as ObjectKey;
    this.propertyPieces =event.data.visit.property[myVar3];
    const myVar4 = 'propertyRooms' as ObjectKey;
    this.propertyRooms =event.data.visit.property[myVar4];
    const myVar5 = 'propertyCity' as ObjectKey;
    this.propertyCity =event.data.visit.property[myVar5];
    const myVar6 = 'propertyCountry' as ObjectKey;
    this.propertyCountry =event.data.visit.property[myVar6];
    const myVar7 = 'propertyPrice' as ObjectKey;
    this.propertyPrice =event.data.visit.property[myVar7];

    //customer
    type ObjectKey2 = keyof typeof event.data.visit.customer;
    const myVar8 = 'name' as ObjectKey2;
    this.name =event.data.visit.customer[myVar8];
    const myVar9 = 'workEmail' as ObjectKey2;
    this.workEmail =event.data.visit.customer[myVar9];
    const myVar10 = 'address' as ObjectKey2;
    this.address =event.data.visit.customer[myVar10];
    const myVar11 = 'phone' as ObjectKey2;
    this.phone =event.data.visit.customer[myVar11];
   

      this.quoteGroup.patchValue({
        propertyName : this.propertyName,
        propertySurface: this.propertySurface,
        propertyPieces: this.propertyPieces,
        propertyRooms :this.propertyRooms,
        propertyCity : this.propertyCity,
        propertyCountry: this.propertyCountry,
        propertyPrice: this.propertyPrice,
        customerName: this.name,
        customerEmail: this.workEmail,
        customerAddress: this.address,
        customerPhone: this.phone,
        
       


      })
    

    this.stepper.next()



  }
  //toast config 
  destroyByClick = true;
  duration = 6000;
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
  //addQuote
  dateForm (date)  {
    let raw = new Date(date);

    let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
    return formatted;
  }
  addQuote () {
     
     this.quote.image=this.cardImageBase64
    this.quote.signature=this.sig.toDataURL()
    this.salesService.addQuote(this.quote).subscribe(next => {
      this.action("success","Success", "Quote added");
      this.quote=next
        
      this.generatePDF()
        location.reload()

    },
      (err) => {
        if (err)
          this.action("danger", "Error", "An error has occured while adding the Quote !")



      },)
    this.sig.clear()
  }
  
  //PDF generation
buildTableBody(data, columns) {
    let body = [];

    body.push(columns);

    data.forEach(function(row) {
      let dataRow = [];

      columns.forEach(function(column) {
        
        dataRow.push(row[column]);
      })

      body.push(dataRow);
      body.forEach(ele=> {
       
        ele.forEach(ok => {
          type ObjectKey = keyof typeof ok;

          const myVar1 = 'fillColor' as ObjectKey;
          //ok[myVar1]='#0000FF'
       

        })
        
        
      })
    });

    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody4(data, columns),
        widths: [75, 75,75,75,75,75],
       
        
     


      }
    };
  }
  
 
  
  //upload image

  cardImageBase64: string = '';
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
 
  generatePDF () {
    const thetable =[{Name: this.quote.propertyName, Surface : this.quote.propertySurface, Pieces: this.quote.propertyPieces, Rooms: this.quote.propertyRooms,City: this.quote.propertyCity,Country: this.quote.propertyCountry}]
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
                this.quote.enterpriseName+"\n" +
                this.quote.enterpriseAddress+"\n" +
                this.quote.enterpriseCity   +"\n" +
            this.quote.enterprisePostalCode+"\n" +
            this.quote.enterpriseTaxRegistrationNumber},
           ],
            {
              width: 110,
              image:this.quote.image   ,
            marginRight: 50},

            [ { text :"Customer",
              style: "header",
              marginLeft:70

            },
            {
              width: 190,
              text:"Customer" +"\n"+
                this.quote.customerName +"\n" +
                this.quote.customerAddress +"\n"+
                this.quote.customerEmail +"\n"+
                this.quote.customerPhone,
              marginBottom: 70,
              marginLeft:70


            }]
          ]
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        {
          text: "Quote Reference : " + this.quote.reference,
          style: 'header',
          tocItem: true,
          marginTop: 5
          
        },
        {
          text: "Date : " + this.dateForm(this.quote.quoteDate) ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom :30

        },


        this.table (thetable,['Name','Surface','Pieces','Rooms', 'City','Country']),
        {
          table: {
            headerRows: 1,


            widths:[170,170,170
            ],
            body :[
              [
              "","", {
              text :
                
                "Total Price Without tax: " + this.quote.propertyPrice +"\n"+
                "Tax Rate: " + this.quote.taxRate +"\n"+
                "Services Fees: " + this.quote.servicesFees+ "\n"+
                "-----------------------------------------"+"\n"+

                "Price After Tax: "+ this.quote.finalPrice,
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
              text :"Enterprise Signature",
              style : "header",
              image:this.quote.signature,
              width:150, 
              marginTop :60,
              

            },
            
            {
              text :"Date and customer's signature",
              style : "header",
              width:350,
              marginTop :60,
              decoration:'underline',
              marginLeft:170

            }
            
          ]
        },{
          image:this.quote.signature,
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
  // end PDF generation
  
  
  
  quoSettings ={
   
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
    actions: {
      add:false,
      
      
    }
    ,
    hideSubHeader: false ,
    pager :{
      display :true,
      perPage: 5,
    },
    columns :{


      quoteDate: {
        title: 'Quote Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        },
        //filter : { type :'custom', component:DateFilterComponent},




      },
      propertyName: {
        title: 'Property Name',
        type: 'string',
       



      },
      propertyPrice: {
        title: 'Price without tax',
        type: 'number',

      },
      
      reference: {
        title: 'Quote refeerence',
        type: 'number',
        



      },
      status: {
        title: 'Quote Status',
        type: 'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Pending": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Validated": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}

        
      },
        
      }
      ,
      finalPrice: {
        title: 'Price with tax',
        type: 'number',

      }


    }}
  
  viewQuoteFromTable(event) {
    this.quote= event.data
    this.generatePDF()
  }
  deleteQuote(event) {
    this.salesService.deleteQuote(event.data.id).subscribe(()=>{
      this.action("success","Success","Quote Deleted")
      location.reload()

    },(err)=>{
      this.action("danger","Error","An error has occured")
    })
  }
    

    //purchase Orders Step 3
    poGroup : FormGroup= new FormGroup({});

    purchaseOrder : PurchaseOrders = new PurchaseOrders()
    paymentModes =["Check","Direct Debit","Cash"]
    paymentMethod =["All Amount","Installment Payement"]

    selectedMethod(value) {
      
      if (value =="All Amount") {
        this.poGroup.patchValue (
          {numberOfMonths : 1}

        )
        this.poGroup.controls['numberOfMonths'].disable();

      }
      else {
        this.poGroup.controls['numberOfMonths'].enable();
        this.poGroup.patchValue (
          {numberOfMonths : null}

        )


      }
      

    }
    

    eventcontent : string[] = [ "propertyName2",
    "propertySurface2",
    "propertyPieces2",
    "propertyRooms2",
    "propertyCity2" ,
    "propertyCountry2",
    "propertyPrice2",
    "customerName2",
    "customerEmail2",
    "customerAddress2",
    "customerPhone2",
    
    "taxRate2",
    "servicesFees2",
    "enterpriseName",
      "enterpriseCity",
      "enterpriseAddress",
      "enterprisePostalCode",
      "enterpriseTaxRegistrationNumber"
    ]

    fromSecondtoThird (event) {

      this.eventcontent.forEach(obj=> {
        type ObjectKey = keyof typeof event.data;
        const myVar1 = obj.replace('2', '') as ObjectKey;

        this.poGroup.get(obj).setValue(event.data[myVar1])
        

      })
      type ObjectKey14 = keyof typeof event.data.image;
      const myVar14 = 'image' as ObjectKey14;
      this.purchaseOrder.image = event.data[myVar14];
      this.poGroup.controls['logop'].disable();
      this.salesService.validateQuote(event.data.id).subscribe(()=>{
        this.action("success","Success","Quote Validated!")

      },()=>{
        this.action("danger","Error","An error has occured !")

      });

      this.stepper.next();
      

      

    }
    addPurchaseOrder () {
      if(this.purchaseOrder.image ==undefined) {
      this.purchaseOrder.image=this.cardImageBase64}
      this.purchaseOrder.signature=this.sig2.toDataURL()
      this.salesService.addPurchaseOrder(this.purchaseOrder).subscribe(next=> {
        
        this.action("success","Success", "po added");
        this.purchaseOrder=next
        this.createPDF();
        location.reload()
      })
    }
    
    //PDF generation
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
        widths: [140,140,140],
        
        
        

      }
    };
  }
  table3(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody2(data, columns),
        widths: [60,60,60,60,60,60,60],
        style :'table'
        

      }
    };
  }
  
  
  createPDF () {
    const thetable1 =[{Name: this.purchaseOrder.propertyName, Surface : this.purchaseOrder.propertySurface, Pieces: this.purchaseOrder.propertyPieces, Rooms: this.purchaseOrder.propertyRooms,City: this.purchaseOrder.propertyCity,Country: this.purchaseOrder.propertyCountry}]
    const thetable2 =[{PaymentMode: this.purchaseOrder.paymentMode, PaymentMethod : this.purchaseOrder.paymentMethod,InstalmentsNumber: this.purchaseOrder.numberOfMonths}]
    
    
    const thetable3 =[{PropertyPrice: this.purchaseOrder.propertyPrice, TaxRate : this.purchaseOrder.taxRate+'%',ServicesFees: this.purchaseOrder.servicesFees,AdvanceAmount: this.purchaseOrder.advancePayment , FinalPrice: this.purchaseOrder.finalPrice, InstalmentAmount : this.purchaseOrder.instalmentAmount,DueDate: this.dateForm(this.purchaseOrder.dueDate)}]
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
                  this.purchaseOrder.enterpriseName +"\n"+
                  this.purchaseOrder.enterpriseAddress +"\n"+
                  this.purchaseOrder.enterpriseCity   +"\n" +
                  this.purchaseOrder.enterprisePostalCode+"\n" +
                  this.purchaseOrder.enterpriseTaxRegistrationNumber
              },
            ],
            {
              width: 110,
              image:this.purchaseOrder.image   ,
              marginRight: 60},

            [ { text :"Customer",
              style: "header",
              marginLeft:85

            },
              {
                width: 190,
                text:
                  this.purchaseOrder.customerName +"\n" +
                  this.purchaseOrder.customerAddress +"\n"+
                  this.purchaseOrder.customerEmail +"\n"+
                  this.purchaseOrder.customerPhone,
                marginBottom: 70,
                marginLeft:85,


              }]
          ]
        },
        {
          text: "Purchase Order Reference : " + this.purchaseOrder.reference,
          style: 'header',
          tocItem: true,
          marginTop: 15
          
        },
        {
          text: "Date : " + this.dateForm(this.purchaseOrder.orderDate) ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom: 20

        },
       
        this.table (thetable1,['Name','Surface','Pieces','Rooms', 'City','Country']),
        {
          text: " "  ,

          marginBottom: 20,




        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
       
        {
          text: "Payment Reglementations: "  ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom: 20,
          

        },


        this.table2 (thetable2,['Payment Mode','Payment Method','Instalments Number']),
        {
          text: " "  ,

          marginBottom: 20,




        },
        this.table3 (thetable3,['Property Price','Tax Rate','Services Fees','Advance Amount','Final Price','Instalment Amount','Due Date']),
        {
          text: " "  ,

          marginBottom: 20,




        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          columns :[
            {
              text :"Date and customer's signature",
              style : "header",
              width:200,
              marginTop :50,
              decoration:'underline'

            },
            ,
            {
              text :"Date and customer's signature",
              style : "header",
              width:350,
              marginTop :50,
              decoration:'underline',
              marginLeft:130

            }],
        },
        {
          image:this.purchaseOrder.signature,
          width:125,
        }
        

       
        
        
        
      ],
      
      styles :{header: {
          bold: true,
        decoration:'underline'},
        
      }

    }
    pdfMake.createPdf(docDefinition2).open();

  }
  // end PDF generation

  deletePurchaseOrder(event) {
    this.salesService.deleteOrder(event.data.id).subscribe(()=>{
      this.action("success","Success","Order Deleted")
      location.reload()
    },(err)=>{
      this.action("danger","Error","An error has occured")
    })
  }
  poSettings ={

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
    actions: {
      add:false,


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

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        },
        //filter : { type :'custom', component:DateFilterComponent},




      },
      propertyName: {
        title: 'Property Name',
        type: 'string',




      },
      propertyPrice: {
        title: 'Price without tax',
        type: 'number',

      },

      reference: {
        title: 'Order reference',
        type: 'number',




      },
      orderStatus: {
        title: 'Order Status',
        type: 'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Pending": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Validated": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}


        },

      }
      ,
      finalPrice: {
        title: 'Price with tax',
        type: 'number',

      }


    }}
  
  
  viewOrderFromTable(event){
      this.purchaseOrder=event.data
    this.createPDF();
      
  }
  deleteOrder(event) {
    this.salesService.deleteOrder(event.data.id).subscribe(()=>{
      this.action("success","Success","Order Deleted")
      location.reload();
      this.stepper.next();
      this.stepper.next();
    },(err)=>{
      this.action("danger","Error","An error has occured")
    })
  }
  
  //bills
  
  eventcontent3= [
    "propertyName",
    "propertyPrice",
    "finalPrice",
    "customerName",
    "customerEmail",
    "customerPhone",
    "customerAddress",
    "enterpriseName",
    "enterpriseAddress",
    "enterpriseCity",
    "enterprisePostalCode",
    "enterpriseTaxRegistrationNumber",
    "servicesFees",
    "advancePayment",
    "taxRate"
    
  ]
  
  fromThirdToFourth(event){
    this.eventcontent3.forEach(obj => {
      type ObjectKey = keyof typeof event.data;
      const myVar1 = obj as ObjectKey;

      this.billGroup.get(obj).setValue(event.data[myVar1])

    })
    type ObjectKey14 = keyof typeof event.data.image;
    const myVar14 = 'image' as ObjectKey14;
    this.cardImageBase64 = event.data[myVar14];
    this.salesService.validateOrder(event.data.id).subscribe(()=>{
      this.action("success","Success","Order Validated !")

    },()=>{
      this.action("danger","Error","An error has occured !")

    })

    this.billGroup.controls['logo'].disable();

    this.stepper.next();
      
  }
  
  createBill() {
      this.billOfLading.image=this.cardImageBase64
    this.billOfLading.signature=this.sig3.toDataURL()
      this.salesService.addBill(this.billOfLading).subscribe(result=>{
        this.action("success","Success","Bill Added !")
        this.billOfLading=result
        this.createBillPDF();
        location.reload()
      },(err)=>{
        this.action("danger","Error","An error has occured")
      })
  }

  buildTableBody4(data, columns) {
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


  table4(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody4(data, columns),
        widths: [150,150,150],




      }
    };
  }
  
  createBillPDF () {
    const thetable1 =[{PropertyName: this.billOfLading.propertyName, CrudePrice: this.billOfLading.propertyPrice,TaxRate:this.billOfLading.taxRate+"%",ServicesFees:this.billOfLading.servicesFees,AdvancePayment:this.billOfLading.advancePayment,FinalPrice: this.billOfLading.finalPrice,}]


    const thetable3 =[{Order:this.dateForm(this.billOfLading.orderDate) , Shipment:this.dateForm(this.billOfLading.shipmentDate), Delivery:this.dateForm(this.billOfLading.deliveryDate)}]
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
                  this.billOfLading.enterpriseName +"\n"+
                  this.billOfLading.enterpriseAddress +"\n"+
                  this.billOfLading.enterpriseCity   +"\n" +
                  this.billOfLading.enterprisePostalCode+"\n" +
                  this.billOfLading.enterpriseTaxRegistrationNumber
              },
            ],
            {
              width: 110,
              image:this.billOfLading.image   ,
              marginRight: 100,
            },

            [ { text :"Customer",
              style: "header",
              marginLeft:90

            },
              {
                width: 190,
                text:
                  this.billOfLading.customerName +"\n" +
                  this.billOfLading.customerAddress +"\n"+
                  this.billOfLading.customerEmail +"\n"+
                  this.billOfLading.customerPhone,
                marginBottom: 70,
                marginLeft:90,


              }]
          ]
        },
        {
          text: "Bill Of Lading Reference : " + this.billOfLading.reference,
          style: 'header',
          tocItem: true,
          marginTop: 40,
          decoration: 'underline'

        },
        {
          text: "Date : " + this.dateForm(this.billOfLading.creationDate) ,
          style: 'header',
          tocItem: true,
          marginTop: 5,
          marginBottom: 20,
          decoration: 'underline'

        },

        this.table (thetable1,['Property Name','Crude Price','Tax Rate','Services Fees','Advance Payment','Final Price']),
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


        this.table4 (thetable3,['Order','Shipment','Delivery']),
        {
          text :"",
          marginTop:20

        },


        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          columns :[
            {
              text :"Date and Enterprise's signature",
              style : "header",
              width:200,
              marginTop :60,
              decoration:'underline'

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
        }
        ,{
          image:this.billOfLading.signature,
          width:125,
        }









      ],

      styles :{header: {
          bold: true,},

      }

    }
    pdfMake.createPdf(docDefinition2).open();

  }
  billSettings ={

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
    actions: {
      add:false,


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

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        },
        //filter : { type :'custom', component:DateFilterComponent},




      },
      deliveryDate: {
        title: 'Delivery Date',
        type: 'Date',
        valuePrepareFunction: (date) => {
          let raw = new Date(date);

          let formatted = new DatePipe('en-EN').transform(raw, 'mediumDate' );
          return formatted;
        },
        //filter : { type :'custom', component:DateFilterComponent},




      },
      propertyName: {
        title: 'Property Name',
        type: 'string',




      },
      propertyPrice: {
        title: 'Price without tax',
        type: 'number',

      },

      reference: {
        title: 'Bill reference',
        type: 'number',




      },
      status: {
        title: 'Order Status',
        type: 'html',
        valuePrepareFunction: (status) => {
          switch (status) {
            case "Pending": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "Validated": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }}


        },

      }
      ,
      finalPrice: {
        title: 'Price with tax',
        type: 'number',

      }


    }}
  
  viewBillFromTable(event) {
      this.billOfLading=event.data
    this.createBillPDF()
  }
  deleteBill(event){
      this.salesService.deleteBill(event.data.id).subscribe(()=>{
        this.action("success","Success","Bill Deleted !")
        location.reload()

      },()=>{
        this.action("danger","Error","An error has occured !")

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
