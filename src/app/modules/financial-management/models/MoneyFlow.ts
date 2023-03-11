export class MoneyFlow{
     id : string;
   
     category:string;
     actual:number;
     budget:number;
     difference:number;
     direction:string;
     subCategory: string;
     private _year:number;
     private _month:string;
     private _type:string;


  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get month(): string {
    return this._month;
  }

  set month(value: string) {
    this._month = value;
  }
}