import {Material} from "../material/material";

export class PurchaseReturn {
  
  private _purchaseReturnId: String;
  private _purchaseReturnRef: String;
  private _material: Material;
  private _reason: String;
  private _purchaseReturnDate: Date;
  private _purchaseReturnState: boolean;

  get purchaseReturnId(): String {
    return this._purchaseReturnId;
  }

  set purchaseReturnId(value: String) {
    this._purchaseReturnId = value;
  }

  get purchaseReturnRef(): String {
    return this._purchaseReturnRef;
  }

  set purchaseReturnRef(value: String) {
    this._purchaseReturnRef = value;
  }

  get material(): Material {
    return this._material;
  }

  set material(value: Material) {
    this._material = value;
  }

  get reason(): String {
    return this._reason;
  }

  set reason(value: String) {
    this._reason = value;
  }

  get purchaseReturnDate(): Date {
    return this._purchaseReturnDate;
  }

  set purchaseReturnDate(value: Date) {
    this._purchaseReturnDate = value;
  }

  get purchaseReturnState(): boolean {
    return this._purchaseReturnState;
  }

  set purchaseReturnState(value: boolean) {
    this._purchaseReturnState = value;
  }
}
