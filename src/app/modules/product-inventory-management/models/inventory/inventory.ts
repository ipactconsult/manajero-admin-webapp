import {Material} from "../material/material";
import {Auth} from "../../../auth/model/Auth";

export class Inventory {
  
  private _inventoryId: String;
  private _inventoryRef: String;
  private _materials: Material[];
  private _inventoryDate: Date;
  private _inventoryCreationDate: Date;
  private _inventoryState: boolean;
  private _inventoryFixed: boolean;
  private _counting: number;
  private _addedBy: Auth;

  get inventoryId(): String {
    return this._inventoryId;
  }

  set inventoryId(value: String) {
    this._inventoryId = value;
  }

  get inventoryRef(): String {
    return this._inventoryRef;
  }

  set inventoryRef(value: String) {
    this._inventoryRef = value;
  }

  get materials(): Material[] {
    return this._materials;
  }

  set materials(value: Material[]) {
    this._materials = value;
  }

  get inventoryDate(): Date {
    return this._inventoryDate;
  }

  set inventoryDate(value: Date) {
    this._inventoryDate = value;
  }

  get inventoryCreationDate(): Date {
    return this._inventoryCreationDate;
  }

  set inventoryCreationDate(value: Date) {
    this._inventoryCreationDate = value;
  }

  get inventoryState(): boolean {
    return this._inventoryState;
  }

  set inventoryState(value: boolean) {
    this._inventoryState = value;
  }

  get inventoryFixed(): boolean {
    return this._inventoryFixed;
  }

  set inventoryFixed(value: boolean) {
    this._inventoryFixed = value;
  }

  get counting(): number {
    return this._counting;
  }

  set counting(value: number) {
    this._counting = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
