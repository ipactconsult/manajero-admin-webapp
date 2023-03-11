import {Material} from "../material/material";

export class StockMovement {
  
  private _smId: String;
  private _smCode: String;
  private _smLabel: String;
  private _dateSM: Date;
  private _quantitySM: number;
  private _material: Material;
  private _activeState: boolean;


  get smId(): String {
    return this._smId;
  }

  set smId(value: String) {
    this._smId = value;
  }

  get smCode(): String {
    return this._smCode;
  }

  set smCode(value: String) {
    this._smCode = value;
  }

  get smLabel(): String {
    return this._smLabel;
  }

  set smLabel(value: String) {
    this._smLabel = value;
  }

  get dateSM(): Date {
    return this._dateSM;
  }

  set dateSM(value: Date) {
    this._dateSM = value;
  }

  get quantitySM(): number {
    return this._quantitySM;
  }

  set quantitySM(value: number) {
    this._quantitySM = value;
  }

  get material(): Material {
    return this._material;
  }

  set material(value: Material) {
    this._material = value;
  }

  get activeState(): boolean {
    return this._activeState;
  }

  set activeState(value: boolean) {
    this._activeState = value;
  }
}
