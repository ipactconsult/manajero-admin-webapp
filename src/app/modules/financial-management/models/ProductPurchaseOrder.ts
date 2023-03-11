export class ProductPurchaseOrder {
  id: string;
  //product 
  quantity:number;
  unitPrice:number;
  totalPrice:number;
  productName:string;
  //customer
  customerName:string;
  customerEmail:string;
  customerAddress:string;
  customerPhone:string;
  //order
  taxRate:number;
  servicesFees:number;
  finalPrice:number;
  reference:string;
  creationDate:Date;
  status:string
  advancePayment:number
  paymentMode:string
  paymentMethod:string
  numberOfMonths:number
  instalmentAmount:number
  dueDate:Date
  //enterprise
  enterpriseName:string;
  enterpriseAddress:string;
  enterpriseCity:string;
  enterprisePostalCode:number
  image:string;
  signature:string
  enterpriseTaxRegistrationNumber :string;




}

