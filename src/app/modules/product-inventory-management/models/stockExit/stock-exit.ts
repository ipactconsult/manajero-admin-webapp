import {Material} from "../material/material";

export class StockExit {
  
  private _stockExitId: String;
  private _stockExitRef: String;
  private _material: Material;
  private _quantityOut: number;
  private _stockExitState: boolean;
  private _stockExitDate: Date;
  
  get stockExitId(): String {
    return this._stockExitId;
  }

  set stockExitId(value: String) {
    this._stockExitId = value;
  }

  get stockExitRef(): String {
    return this._stockExitRef;
  }

  set stockExitRef(value: String) {
    this._stockExitRef = value;
  }

  get material(): Material {
    return this._material;
  }

  set material(value: Material) {
    this._material = value;
  }

  get quantityOut(): number {
    return this._quantityOut;
  }

  set quantityOut(value: number) {
    this._quantityOut = value;
  }

  get stockExitState(): boolean {
    return this._stockExitState;
  }

  set stockExitState(value: boolean) {
    this._stockExitState = value;
  }

  get stockExitDate(): Date {
    return this._stockExitDate;
  }

  set stockExitDate(value: Date) {
    this._stockExitDate = value;
  }
}
