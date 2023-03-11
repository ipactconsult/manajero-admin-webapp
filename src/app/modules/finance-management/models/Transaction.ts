import { Time } from "@angular/common";

export class Transaction {
  id : string;
  description: string;
  date : Date;
  time : Time;
  category : string;
  types: string;
  income : number;
  expense : number;


}