import {Auth} from "../../../auth/model/Auth";

export class Supplier {
  
  private _supplierId: String;
  private _supplierFirstName: String;
  private _supplierLastName: String;
  private _supplierEmail: String;
  private _supplierPhone: number;
  private _supplierCountry: String;
  private _supplierCompany: String;
  private _supplierCreationDate: Date;
  private _supplierState: boolean;
  private _supplierCurrency: String;
  private _supplierImage: String;
  private _addedBy: Auth;

  get supplierId(): String {
    return this._supplierId;
  }

  set supplierId(value: String) {
    this._supplierId = value;
  }

  get supplierFirstName(): String {
    return this._supplierFirstName;
  }

  set supplierFirstName(value: String) {
    this._supplierFirstName = value;
  }

  get supplierLastName(): String {
    return this._supplierLastName;
  }

  set supplierLastName(value: String) {
    this._supplierLastName = value;
  }

  get supplierEmail(): String {
    return this._supplierEmail;
  }

  set supplierEmail(value: String) {
    this._supplierEmail = value;
  }

  get supplierPhone(): number {
    return this._supplierPhone;
  }

  set supplierPhone(value: number) {
    this._supplierPhone = value;
  }

  get supplierCountry(): String {
    return this._supplierCountry;
  }

  set supplierCountry(value: String) {
    this._supplierCountry = value;
  }

  get supplierCompany(): String {
    return this._supplierCompany;
  }

  set supplierCompany(value: String) {
    this._supplierCompany = value;
  }

  get supplierCreationDate(): Date {
    return this._supplierCreationDate;
  }

  set supplierCreationDate(value: Date) {
    this._supplierCreationDate = value;
  }

  get supplierState(): boolean {
    return this._supplierState;
  }

  set supplierState(value: boolean) {
    this._supplierState = value;
  }

  get supplierCurrency(): String {
    return this._supplierCurrency;
  }

  set supplierCurrency(value: String) {
    this._supplierCurrency = value;
  }

  get supplierImage(): String {
    return this._supplierImage;
  }

  set supplierImage(value: String) {
    this._supplierImage = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
