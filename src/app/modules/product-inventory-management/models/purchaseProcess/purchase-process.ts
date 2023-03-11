import {Material} from "../material/material";
import {PurchaseRequisition} from "../purchaseRequisition/purchase-requisition";
import {RequestForQuotation} from "../requestForQuotation/request-for-quotation";
import {Quotation} from "../quotation/quotation";
import {Supplier} from "../supplier/supplier";
import {PurchaseOrder} from "../purchaseOrder/purchase-order";
import {Auth} from "../../../auth/model/Auth";

export class PurchaseProcess {
  
  private _purchaseProcessId: String;
  private _materials: Material[];
  private _pr: PurchaseRequisition;
  private _rfq: RequestForQuotation;
  private _quotations: Quotation[];
  private _supplier: Supplier;
  private _po: PurchaseOrder;
  private _step: number;
  private _materialsStocked: number;
  private _addedBy: Auth;
  
  get purchaseProcessId(): String {
    return this._purchaseProcessId;
  }

  set purchaseProcessId(value: String) {
    this._purchaseProcessId = value;
  }

  get materials(): Material[] {
    return this._materials;
  }

  set materials(value: Material[]) {
    this._materials = value;
  }

  get pr(): PurchaseRequisition {
    return this._pr;
  }

  set pr(value: PurchaseRequisition) {
    this._pr = value;
  }

  get rfq(): RequestForQuotation {
    return this._rfq;
  }

  set rfq(value: RequestForQuotation) {
    this._rfq = value;
  }

  get quotations(): Quotation[] {
    return this._quotations;
  }

  set quotations(value: Quotation[]) {
    this._quotations = value;
  }

  get supplier(): Supplier {
    return this._supplier;
  }

  set supplier(value: Supplier) {
    this._supplier = value;
  }

  get po(): PurchaseOrder {
    return this._po;
  }

  set po(value: PurchaseOrder) {
    this._po = value;
  }

  get step(): number {
    return this._step;
  }

  set step(value: number) {
    this._step = value;
  }

  get materialsStocked(): number {
    return this._materialsStocked;
  }

  set materialsStocked(value: number) {
    this._materialsStocked = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
