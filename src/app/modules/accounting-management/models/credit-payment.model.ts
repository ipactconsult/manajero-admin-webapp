import {Credit} from "./credit.model";

export class CreditPayment {
  id?: string;
  payment: number;
  period: number;
  interest: number;
  presentValue: number;
  balance: number;
  cumulativeInterest: number;
  taxValue: number;
  credit: Credit;
  createdAt: Date;
  
  
  
}
