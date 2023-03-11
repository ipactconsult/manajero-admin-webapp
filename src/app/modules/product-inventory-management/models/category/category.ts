import {Auth} from "../../../auth/model/Auth";

export class Category {
  
  private _categoryId: String;
  private _categoryCode: String;
  private _categoryName: String;
  private _categoryDesc: String;
  private _categoryCreationDate: Date;
  private _categoryState: boolean;
  private _addedBy: Auth;


  get categoryId(): String {
    return this._categoryId;
  }

  set categoryId(value: String) {
    this._categoryId = value;
  }

  get categoryCode(): String {
    return this._categoryCode;
  }

  set categoryCode(value: String) {
    this._categoryCode = value;
  }

  get categoryName(): String {
    return this._categoryName;
  }

  set categoryName(value: String) {
    this._categoryName = value;
  }

  get categoryDesc(): String {
    return this._categoryDesc;
  }

  set categoryDesc(value: String) {
    this._categoryDesc = value;
  }

  get categoryCreationDate(): Date {
    return this._categoryCreationDate;
  }

  set categoryCreationDate(value: Date) {
    this._categoryCreationDate = value;
  }

  get categoryState(): boolean {
    return this._categoryState;
  }

  set categoryState(value: boolean) {
    this._categoryState = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
