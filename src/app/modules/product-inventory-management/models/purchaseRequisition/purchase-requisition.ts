import {Material} from "../material/material";
import {Auth} from "../../../auth/model/Auth";

export class PurchaseRequisition {
  
  private _purchaseRequisitionId: String;
  private _purchaseRequisitionNumber: String;
  private _material: Material[];
  private _purchaseRequisitionStatus: String;
  private _purchaseRequisitionState: boolean;
  private _purchaseRequisitionCreationDate: Date;
  private _addedBy: Auth;


  get purchaseRequisitionId(): String {
    return this._purchaseRequisitionId;
  }

  set purchaseRequisitionId(value: String) {
    this._purchaseRequisitionId = value;
  }

  get purchaseRequisitionNumber(): String {
    return this._purchaseRequisitionNumber;
  }

  set purchaseRequisitionNumber(value: String) {
    this._purchaseRequisitionNumber = value;
  }

  get material(): Material[] {
    return this._material;
  }

  set material(value: Material[]) {
    this._material = value;
  }

  get purchaseRequisitionStatus(): String {
    return this._purchaseRequisitionStatus;
  }

  set purchaseRequisitionStatus(value: String) {
    this._purchaseRequisitionStatus = value;
  }

  get purchaseRequisitionState(): boolean {
    return this._purchaseRequisitionState;
  }

  set purchaseRequisitionState(value: boolean) {
    this._purchaseRequisitionState = value;
  }

  get purchaseRequisitionCreationDate(): Date {
    return this._purchaseRequisitionCreationDate;
  }

  set purchaseRequisitionCreationDate(value: Date) {
    this._purchaseRequisitionCreationDate = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
