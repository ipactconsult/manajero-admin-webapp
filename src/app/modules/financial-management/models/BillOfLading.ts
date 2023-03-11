export class BillOfLading{
  id:string
  reference:string;
  customerName:string;
  customerEmail:string;
  customerAddress:string;
  customerPhone:string;
  image:String
  enterpriseName:String
  enterpriseAddress:String
  enterpriseCity: String
  enterprisePostalCode:number
  propertyName:string ;
  propertyPrice:number;
  finalPrice:number;
  creationDate:Date;
  status:string
  orderDate:Date;
  shipmentDate:Date;
  deliveryDate:Date;
  taxRate:number
  servicesFees:number
  advancePayment:number
  signature:string
  enterpriseTaxRegistrationNumber :string;

}