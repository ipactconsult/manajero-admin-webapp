import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductQuote} from "../../models/ProductQuote";
import {ProductPurchaseOrder} from "../../models/ProductPurchaseOrder";
import {ProductBillOfLading} from "../../models/ProductBillOfLading";

@Injectable({
  providedIn: 'root'
})
export class ProductsSalesService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  private Url = 'https://manazelo-finance-back.herokuapp.com/sales';

  constructor(private httpclient:HttpClient) {

  }

  public addQuote(data): Observable<ProductQuote> {
    return this.httpclient.post<ProductQuote>(`${this.Url}/createProductsQuote/ `, data,this.httpOptions);
  }
  public getQuotes(): Observable<ProductQuote[]> {
    return this.httpclient.get<ProductQuote[]>(`${this.Url}/retrieveProductsQuotes`,this.httpOptions);
  }
  public addProductPurchaseOrder(data): Observable<ProductPurchaseOrder> {
    return this.httpclient.post<ProductPurchaseOrder>(`${this.Url}/createProductPurchaseOrder/ `, data,this.httpOptions);
  }
  public getProductPurchaseOrders(): Observable<ProductPurchaseOrder[]> {
    return this.httpclient.get<ProductPurchaseOrder[]>(`${this.Url}/retrieveProductsPurchaseOrders`,this.httpOptions);
  }
  public addProductBill(data): Observable<ProductBillOfLading> {
    return this.httpclient.post<ProductBillOfLading>(`${this.Url}/createProductBill`, data,this.httpOptions);
  }
  public getProductBills(): Observable<ProductBillOfLading[]> {
    return this.httpclient.get<ProductBillOfLading[]>(`${this.Url}/retrieveProductsBills`,this.httpOptions);
  }

  public removeQuote(id:string):Observable<any> {
    return this.httpclient.delete(`${this.Url}/removeProductQuote/`+id,{responseType: 'text'});
  }
  public removeOrder(id:string):Observable<any> {
    return this.httpclient.delete(`${this.Url}/removeProductPurchaseOrder/`+id,{responseType: 'text'});
  }
  public removeBill(id:string):Observable<any> {
    return this.httpclient.delete(`${this.Url}/removeProductBillOfLading/`+id,{responseType: 'text'});
  }

  public validateQuote(id:string):Observable<ProductQuote>{
    return this.httpclient.put<ProductQuote>(`${this.Url}/validateProductQuote/`+id,this.httpOptions)
  }
  public validateOrder(id:string):Observable<ProductPurchaseOrder>{
    return this.httpclient.put<ProductPurchaseOrder>(`${this.Url}/validateProductPurchaseOrder/`+id,this.httpOptions)
  }
  public validateBill(id:string):Observable<ProductBillOfLading>{
    return this.httpclient.put<ProductBillOfLading>(`${this.Url}/validateProductBill/`+id,this.httpOptions)
  }
}
