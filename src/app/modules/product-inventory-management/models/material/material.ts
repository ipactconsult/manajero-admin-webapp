import {Supplier} from "../supplier/supplier";
import {Warehouse} from "../warehouse/warehouse";
import {Category} from "../category/category";
import {Auth} from "../../../auth/model/Auth";

export class Material {
  
  private _materialId: String;
  private _materialType: String;
  private _materialName: String;
  private _materialSKU: String;
  private _materialCategory: Category;
  private _materialBarcode: String;
  private _materialPrice: number;
  private _sellingPrice: number;
  private _materialVAT: number;
  private _materialQuantity: number;
  private _materialCreationDate: Date;
  private _materialDeliveryDate: Date;
  private _materialState: boolean;
  private _quantityStock: number;
  private _quantityReel: number;
  private _quantityOut: number;
  private _stockAlert: number;
  private _stockMax: number;
  private _supplier: Supplier;
  private _warehouse: Warehouse;
  private _receiptState: boolean;
  private _stockState: boolean;
  private _sellState: boolean;
  private _replenished: boolean;
  private _addedBy: Auth;

  get materialId(): String {
    return this._materialId;
  }

  set materialId(value: String) {
    this._materialId = value;
  }

  get materialType(): String {
    return this._materialType;
  }

  set materialType(value: String) {
    this._materialType = value;
  }

  get materialName(): String {
    return this._materialName;
  }

  set materialName(value: String) {
    this._materialName = value;
  }

  get materialSKU(): String {
    return this._materialSKU;
  }

  set materialSKU(value: String) {
    this._materialSKU = value;
  }

  get materialCategory(): Category {
    return this._materialCategory;
  }

  set materialCategory(value: Category) {
    this._materialCategory = value;
  }

  get materialBarcode(): String {
    return this._materialBarcode;
  }

  set materialBarcode(value: String) {
    this._materialBarcode = value;
  }

  get materialPrice(): number {
    return this._materialPrice;
  }

  set materialPrice(value: number) {
    this._materialPrice = value;
  }

  get materialVAT(): number {
    return this._materialVAT;
  }

  set materialVAT(value: number) {
    this._materialVAT = value;
  }

  get materialQuantity(): number {
    return this._materialQuantity;
  }

  set materialQuantity(value: number) {
    this._materialQuantity = value;
  }

  get materialCreationDate(): Date {
    return this._materialCreationDate;
  }

  set materialCreationDate(value: Date) {
    this._materialCreationDate = value;
  }

  get materialDeliveryDate(): Date {
    return this._materialDeliveryDate;
  }

  set materialDeliveryDate(value: Date) {
    this._materialDeliveryDate = value;
  }

  get materialState(): boolean {
    return this._materialState;
  }

  set materialState(value: boolean) {
    this._materialState = value;
  }

  get quantityStock(): number {
    return this._quantityStock;
  }

  set quantityStock(value: number) {
    this._quantityStock = value;
  }

  get quantityOut(): number {
    return this._quantityOut;
  }

  set quantityOut(value: number) {
    this._quantityOut = value;
  }

  get quantityReel(): number {
    return this._quantityReel;
  }

  set quantityReel(value: number) {
    this._quantityReel = value;
  }

  get stockAlert(): number {
    return this._stockAlert;
  }

  set stockAlert(value: number) {
    this._stockAlert = value;
  }

  get stockMax(): number {
    return this._stockMax;
  }

  set stockMax(value: number) {
    this._stockMax = value;
  }
  
  get supplier(): Supplier {
    return this._supplier;
  }

  set supplier(value: Supplier) {
    this._supplier = value;
  }

  get warehouse(): Warehouse {
    return this._warehouse;
  }

  set warehouse(value: Warehouse) {
    this._warehouse = value;
  }

  get receiptState(): boolean {
    return this._receiptState;
  }

  set receiptState(value: boolean) {
    this._receiptState = value;
  }

  get stockState(): boolean {
    return this._stockState;
  }

  set stockState(value: boolean) {
    this._stockState = value;
  }

  get sellingPrice(): number {
    return this._sellingPrice;
  }

  set sellingPrice(value: number) {
    this._sellingPrice = value;
  }

  get sellState(): boolean {
    return this._sellState;
  }

  set sellState(value: boolean) {
    this._sellState = value;
  }

  get replenished(): boolean {
    return this._replenished;
  }

  set replenished(value: boolean) {
    this._replenished = value;
  }

  get addedBy(): Auth {
    return this._addedBy;
  }

  set addedBy(value: Auth) {
    this._addedBy = value;
  }
}
