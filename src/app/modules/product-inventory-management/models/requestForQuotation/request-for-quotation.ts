import {PurchaseRequisition} from "../purchaseRequisition/purchase-requisition";
import {Supplier} from "../supplier/supplier";
import {Auth} from "../../../auth/model/Auth";

export class RequestForQuotation {
  
  private _rfqId: String;
  private _rfqNumber: String;
  private _pr: PurchaseRequisition;
  private _quotationDeadline: Date;
  private _rfqCreationDate: Date;
  private _suppliers: Supplier[];
  private _rfqState: boolean;
  private _user: Auth;


  get rfqId(): String {
    return this._rfqId;
  }

  set rfqId(value: String) {
    this._rfqId = value;
  }

  get rfqNumber(): String {
    return this._rfqNumber;
  }

  set rfqNumber(value: String) {
    this._rfqNumber = value;
  }

  get pr(): PurchaseRequisition {
    return this._pr;
  }

  set pr(value: PurchaseRequisition) {
    this._pr = value;
  }

  get quotationDeadline(): Date {
    return this._quotationDeadline;
  }

  set quotationDeadline(value: Date) {
    this._quotationDeadline = value;
  }

  get rfqCreationDate(): Date {
    return this._rfqCreationDate;
  }

  set rfqCreationDate(value: Date) {
    this._rfqCreationDate = value;
  }

  get suppliers(): Supplier[] {
    return this._suppliers;
  }

  set suppliers(value: Supplier[]) {
    this._suppliers = value;
  }

  get rfqState(): boolean {
    return this._rfqState;
  }

  set rfqState(value: boolean) {
    this._rfqState = value;
  }

  get user(): Auth {
    return this._user;
  }

  set user(value: Auth) {
    this._user = value;
  }
}
