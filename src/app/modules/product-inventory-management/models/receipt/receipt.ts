import {PurchaseOrder} from "../purchaseOrder/purchase-order";

export class Receipt {
  
  private _receiptId: String;
  private _receiptRef: String;
  private _notes: String;
  private _receiptCreationDate: Date;
  private _receiptState: boolean;
  private _purchaseOrder: PurchaseOrder;
  private _receiptRate: number;
  
  get receiptId(): String {
    return this._receiptId;
  }

  set receiptId(value: String) {
    this._receiptId = value;
  }

  get receiptRef(): String {
    return this._receiptRef;
  }

  set receiptRef(value: String) {
    this._receiptRef = value;
  }

  get notes(): String {
    return this._notes;
  }

  set notes(value: String) {
    this._notes = value;
  }

  get receiptCreationDate(): Date {
    return this._receiptCreationDate;
  }

  set receiptCreationDate(value: Date) {
    this._receiptCreationDate = value;
  }

  get receiptState(): boolean {
    return this._receiptState;
  }

  set receiptState(value: boolean) {
    this._receiptState = value;
  }

  get purchaseOrder(): PurchaseOrder {
    return this._purchaseOrder;
  }

  set purchaseOrder(value: PurchaseOrder) {
    this._purchaseOrder = value;
  }

  get receiptRate(): number {
    return this._receiptRate;
  }

  set receiptRate(value: number) {
    this._receiptRate = value;
  }
}
