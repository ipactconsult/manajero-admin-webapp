export class ProductQuote {
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
  //quote
  taxRate:number;
  servicesFees:number;
  finalPrice:number;
  reference:string;
  creationDate:Date;
  status:string
  //enterprise
  enterpriseName:string;
  enterpriseAddress:string;
  enterpriseCity:string;
  enterprisePostalCode;
  image:string;
  signature:string
  enterpriseTaxRegistrationNumber :string;




}



