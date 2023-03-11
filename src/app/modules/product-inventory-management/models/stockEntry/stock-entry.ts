import {Material} from "../material/material";

export class StockEntry {
  
  private _stockEntryId: String;
  private _stockEntryRef: String;
  private _material: Material;
  private _quantityIn: number;
  private _stockEntryState: boolean;
  private _stockEntryDate: Date;
  
  get stockEntryId(): String {
    return this._stockEntryId;
  }

  set stockEntryId(value: String) {
    this._stockEntryId = value;
  }

  get stockEntryRef(): String {
    return this._stockEntryRef;
  }

  set stockEntryRef(value: String) {
    this._stockEntryRef = value;
  }

  get material(): Material {
    return this._material;
  }

  set material(value: Material) {
    this._material = value;
  }

  get quantityIn(): number {
    return this._quantityIn;
  }

  set quantityIn(value: number) {
    this._quantityIn = value;
  }

  get stockEntryState(): boolean {
    return this._stockEntryState;
  }

  set stockEntryState(value: boolean) {
    this._stockEntryState = value;
  }

  get stockEntryDate(): Date {
    return this._stockEntryDate;
  }

  set stockEntryDate(value: Date) {
    this._stockEntryDate = value;
  }
}
