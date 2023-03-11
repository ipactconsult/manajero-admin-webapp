import {Material} from "../material/material";

export class InventoryMovement {
  
  private _imId: String;
  private _imRef: String;
  private _material: Material;
  private _imCreationDate: Date;
  private _imState: boolean;

  get imId(): String {
    return this._imId;
  }

  set imId(value: String) {
    this._imId = value;
  }

  get imRef(): String {
    return this._imRef;
  }

  set imRef(value: String) {
    this._imRef = value;
  }

  get material(): Material {
    return this._material;
  }

  set material(value: Material) {
    this._material = value;
  }

  get imCreationDate(): Date {
    return this._imCreationDate;
  }

  set imCreationDate(value: Date) {
    this._imCreationDate = value;
  }

  get imState(): boolean {
    return this._imState;
  }

  set imState(value: boolean) {
    this._imState = value;
  }
}
