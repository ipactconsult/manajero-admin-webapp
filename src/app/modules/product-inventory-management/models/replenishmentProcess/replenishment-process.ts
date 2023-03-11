import { PurchaseRequisition } from '../purchaseRequisition/purchase-requisition';

export class ReplenishmentProcess {

    private _rpId: String;
    private _rpRef: String;
    private _pr: PurchaseRequisition;
    private _step: number;
    private _rpCreation: Date;

    get rpId(): String {
      return this._rpId;
    }
    
    set rpId(value: String) {
      this._rpId = value;
    }

    get rpRef(): String {
      return this._rpRef;
    }

    set rpRef(value: String) {
      this._rpRef = value;
    }

    get pr(): PurchaseRequisition {
      return this._pr;
    }
      
    set pr(value: PurchaseRequisition) {
      this._pr = value;
    }

    get step(): number {
      return this._step;
    }
      
    set step(value: number) {
      this._step = value;
    }

  get rpCreation(): Date {
    return this._rpCreation;
  }

  set rpCreation(value: Date) {
    this._rpCreation = value;
  }

}
