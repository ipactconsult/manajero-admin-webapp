import {Supplier} from "../supplier/supplier";
import {RequestForQuotation} from "../requestForQuotation/request-for-quotation";

export class Quotation {
  
  private _quotationId: String;
  private _quotationNumber: String;
  private _quotationCreation: Date;
  private _quotationState: boolean;
  private _supplier: Supplier;
  private _rfq: RequestForQuotation;


  get quotationId(): String {
    return this._quotationId;
  }

  set quotationId(value: String) {
    this._quotationId = value;
  }

  get quotationNumber(): String {
    return this._quotationNumber;
  }

  set quotationNumber(value: String) {
    this._quotationNumber = value;
  }

  get quotationCreation(): Date {
    return this._quotationCreation;
  }

  set quotationCreation(value: Date) {
    this._quotationCreation = value;
  }

  get quotationState(): boolean {
    return this._quotationState;
  }

  set quotationState(value: boolean) {
    this._quotationState = value;
  }

  get supplier(): Supplier {
    return this._supplier;
  }

  set supplier(value: Supplier) {
    this._supplier = value;
  }

  get rfq(): RequestForQuotation {
    return this._rfq;
  }

  set rfq(value: RequestForQuotation) {
    this._rfq = value;
  }
}
