import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quote} from "../../models/Quote";
import {PurchaseOrders} from "../../models/PurchaseOrders";
import {BillOfLading} from "../../models/BillOfLading";
import {ProductBillOfLading} from "../../models/ProductBillOfLading";
import {ProductPurchaseOrder} from "../../models/ProductPurchaseOrder";


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  private Url = 'https://manazelo-finance-back.herokuapp.com/sales';

  constructor(private httpclient:HttpClient) {

  }

  public getAllRequests () : Observable<Object[]> {
    return this.httpclient.get<Object[]>(`${this.Url}/retrievePendingQuotations`, this.httpOptions);
  }
  
  public validateRequests(id:string, request:Object): Observable<Object> {
    return this.httpclient.put<Object>(`${this.Url}/updateRequest` + id,request,this.httpOptions);
    
    
  }
                          
                          
                          
  public addQuote(data): Observable<Quote> {
    return this.httpclient.post<Quote>(`${this.Url}/createQuote/ `, data,this.httpOptions);
  }
  public getAllQuotes () : Observable<Quote[]> {
    return this.httpclient.get<Quote[]>(`${this.Url}/retrieveAllQuotes`);
  }
  
  public deleteQuote(id:string):Observable<any>{
    return this.httpclient.delete(`${this.Url}/deleteQuote/`+id)
  }
  public validateQuote(id:string):Observable<Quote>{
    return this.httpclient.put<Quote>(`${this.Url}/updateQuoteStatus/`+id,this.httpOptions)
  }

  //purchase orders

  public addPurchaseOrder(data): Observable<PurchaseOrders> {
    return this.httpclient.post<PurchaseOrders>(`${this.Url}/createPurchaseOrder/ `, data,this.httpOptions)

  }
  public deleteOrder(id:string):Observable<any>{
    return this.httpclient.delete(`${this.Url}/deletePurchaseOrder/`+id)
  }

  public getAllOrders () : Observable<PurchaseOrders[]> {
    return this.httpclient.get<PurchaseOrders[]>(`${this.Url}/retrievePurchaseOrders`);
  }
  public validateOrder(id:string):Observable<BillOfLading>{
    return this.httpclient.put<BillOfLading>(`${this.Url}/validatePurchaseOrder/`+id,this.httpOptions)
  }
  //Bill Of Lading

  public addBill(data): Observable<BillOfLading> {
    return this.httpclient.post<BillOfLading>(`${this.Url}/createBill/`, data,this.httpOptions)

  }
  public deleteBill(id:string):Observable<any>{
    return this.httpclient.delete(`${this.Url}/deleteBill/`+id,{responseType:'text'})
  }

  public getBills () : Observable<BillOfLading[]> {
    return this.httpclient.get<BillOfLading[]>(`${this.Url}/retrieveBills`);
  }
  public validateBill(id:string):Observable<BillOfLading>{
    return this.httpclient.put<BillOfLading>(`${this.Url}/validateBill/`+id,this.httpOptions)
  }

//risk management
  public getUndeliveredPropertyBills () : Observable<BillOfLading[]> {
    return this.httpclient.get<BillOfLading[]>(`${this.Url}/retrieveUndeliveredBills`);
  } public getUnpaidOrders () : Observable<PurchaseOrders[]> {
    return this.httpclient.get<PurchaseOrders[]>(`${this.Url}/retrieveUnpaidPurchaseOrders`);
  } public getUndeliveredProductsBills () : Observable<ProductBillOfLading[]> {
    return this.httpclient.get<ProductBillOfLading[]>(`${this.Url}/retrieveUndeliveredProductsBills`);
  } public getUnpaidProductsOrders () : Observable<ProductPurchaseOrder[]> {
    return this.httpclient.get<ProductPurchaseOrder[]>(`${this.Url}/retrieveUnpaidProductsPurchaseOrders`);
  }
  public deliverPropertyBill(id:string):Observable<BillOfLading>{
    return this.httpclient.put<BillOfLading>(`${this.Url}/deliverBill/`+id,this.httpOptions)
  }
  public deliverProductBill(id:string):Observable<ProductBillOfLading>{
    return this.httpclient.put<ProductBillOfLading>(`${this.Url}/deliverProductBill/`+id,this.httpOptions)
  }
  public payPropertyOrder(id:string):Observable<PurchaseOrders>{
    return this.httpclient.put<PurchaseOrders>(`${this.Url}/payOrder/`+id,this.httpOptions)
  }
  public payProductOrder(id:string):Observable<ProductPurchaseOrder>{
    return this.httpclient.put<ProductPurchaseOrder>(`${this.Url}/payProductOrder/`+id,this.httpOptions)
  }
  
  
  //insights
  public countUnpaidOrders () : Observable<Number> {
    return this.httpclient.get<Number>(`${this.Url}/countUnpaidCommands`);
  }
  public countUndeliveredBills () : Observable<Number> {
    return this.httpclient.get<Number>(`${this.Url}/countUndeliveredBills`);
  }
  

}


