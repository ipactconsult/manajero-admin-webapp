import {Auth} from "../../../auth/model/Auth";

export class Warehouse {
  
  private _warehouseId: String;
  private _warehouseCode: String;
  private _warehouseLocation: String;
  private _warehouseDesc: String;
  private _warehouseAddress: String;
  private _warehousePostalCode: String;
  private _warehouseCity: String;
  private _warehouseCountry: String;
  private _warehousePhone: String;
  private _warehouseCreationDate: Date;
  private _warehouseState: boolean;
  private _addedBy: Auth;

  get warehouseId(): String {
    return this._warehouseId;
  }

  set warehouseId(value: String) {
    this._warehouseId = value;
  }

  get warehouseCode(): String {
    return this._warehouseCode;
  }

  set warehouseCode(value: String) {
    this._warehouseCode = value;
  }

  get warehouseLocation(): String {
    return this._warehouseLocation;
  }

  set warehouseLocation(value: String) {
    this._warehouseLocation = value;
  }

  get warehouseDesc(): String {
    return this._warehouseDesc;
  }

  set warehouseDesc(value: String) {
    this._warehouseDesc = value;
  }

  get warehouseAddress(): String {
    return this._warehouseAddress;
  }

  set warehouseAddress(value: String) {
    this._warehouseAddress = value;
  }

  get warehousePostalCode(): String {
    return this._warehousePostalCode;
  }

  set warehousePostalCode(value: String) {
    this._warehousePostalCode = value;
  }

  get warehouseCity(): String {
    return this._warehouseCity;
  }

  set warehouseCity(value: String) {
    this._warehouseCity = value;
  }

  get warehouseCountry(): String {
    return this._warehouseCountry;
  }

  set warehouseCountry(value: String) {
    this._warehouseCountry = value;
  }

  get warehousePhone(): String {
    return this._warehousePhone;
  }

  set warehousePhone(value: String) {
    this._warehousePhone = value;
  }

  get warehouseCreationDate(): Date {
    return this._warehouseCreationDate;
  }

  set warehouseCreationDate(value: Date) {
    this._warehouseCreationDate = value;
  }

  get warehouseState(): boolean {
    return this._warehouseState;
  }

  set warehouseState(value: boolean) {
    this._warehouseState = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
