import {Supplier} from "../supplier/supplier";
import {Material} from "../material/material";
import {Auth} from "../../../auth/model/Auth";

export class PurchaseOrder {
  
  private _poId: String;
  private _poNumber: String;
  private _poCreationDate: Date;
  private _selectedSupplier: Supplier;
  private _materials: Material[];
  private _poStatus: String;
  private _poState: boolean;
  private _poReceiptState: boolean;
  private _receiptSupplier: boolean;
  private _receptionDate: Date;
  private _reelRD: Date;
  private _mailSent: boolean;
  private _addedBy: Auth;

  get poId(): String {
    return this._poId;
  }

  set poId(value: String) {
    this._poId = value;
  }

  get poNumber(): String {
    return this._poNumber;
  }

  set poNumber(value: String) {
    this._poNumber = value;
  }

  get poCreationDate(): Date {
    return this._poCreationDate;
  }

  set poCreationDate(value: Date) {
    this._poCreationDate = value;
  }

  get selectedSupplier(): Supplier {
    return this._selectedSupplier;
  }

  set selectedSupplier(value: Supplier) {
    this._selectedSupplier = value;
  }

  get materials(): Material[] {
    return this._materials;
  }

  set materials(value: Material[]) {
    this._materials = value;
  }

  get poStatus(): String {
    return this._poStatus;
  }

  set poStatus(value: String) {
    this._poStatus = value;
  }

  get poState(): boolean {
    return this._poState;
  }

  set poState(value: boolean) {
    this._poState = value;
  }

  get poReceiptState(): boolean {
    return this._poReceiptState;
  }

  set poReceiptState(value: boolean) {
    this._poReceiptState = value;
  }
  
  get receiptSupplier(): boolean {
    return this._receiptSupplier;
  }

  set receiptSupplier(value: boolean) {
    this._receiptSupplier = value;
  }

  get receptionDate(): Date {
    return this._receptionDate;
  }

  set receptionDate(value: Date) {
    this._receptionDate = value;
  }

  get reelRD(): Date {
    return this._reelRD;
  }

  set reelRD(value: Date) {
    this._reelRD = value;
  }

  get mailSent(): boolean {
    return this._mailSent;
  }

  set mailSent(value: boolean) {
    this._mailSent = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
