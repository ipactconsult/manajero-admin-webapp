export class ProductBillOfLading{
  id: string;
  //product 
  quantity:number;
  finalPrice:number;
  productName:string;
  advancePayment:number
  taxRate:number
  servicesFees:number
  //customer
  customerName:string;
  customerEmail:string;
  customerAddress:string;
  customerPhone:string;
  //bill
 
  reference:string;
  creationDate:Date;
  status:string
   orderDate:Date;
   shipmentDate:Date;
  deliveryDate:Date;
  //enterprise
  enterpriseName:string;
  enterpriseAddress:string;
  enterpriseCity:string;
  enterprisePostalCode:number
  image:string;
  signature:string
  enterpriseTaxRegistrationNumber :string;

}