import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Order} from '../../models/Order';
import {Material} from '../../../product-inventory-management/models/material/material';
import {Contract} from '../../models/Contract';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  getAllOrders(): Observable<[Order]> {
    return this.httpClient.get<[Order]>(`${environment.crmUrl}orders/allOrders`);
  }

  addOrder(order: Order, idProduct: string) {
    return this.httpClient.post<Order>(`${environment.crmUrl}orders/create-order/`+idProduct, order, this.httpOptions);
  }

  updateOrder(id: string, order: Order): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/update-order/` + id,
      order, this.httpOptions);
  }

  validateOrder(id: string, order: Order): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/validate-order/` + id,
      order, this.httpOptions);
  }
  
  saleOrder(id: string, order: Order): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/sale-order/` + id,
      order, this.httpOptions);
  } 
  progressOrder(id: string, order: Order): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/progress-order/` + id,
      order, this.httpOptions);
  }
  
  assignContractOrder( id: string, contract: Contract): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/assign-contract-order/` + id,
      contract, this.httpOptions);
  }  
  deliverOrder(  order: Order, id: string): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/deliver-order/` + id,
      order, this.httpOptions);
  }

  deleteOrder(orders: Order | string): Observable<string> {
    const id = typeof orders === 'string' ? orders : orders.id;
    const url = `${environment.crmUrl}orders/delete/` + id;
    // @ts-ignore
    return this.httpClient.delete<string>(url, httpOptionsPlain);
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.crmUrl}orders/order-by-id/` + id);
  }

  getOrderByArchive(): Observable<[Order]> {
    return this.httpClient.get<[Order]>(`${environment.crmUrl}orders/order-by-archive/True`);
  }

  getOrderNotArchived(): Observable<[Order]> {
    return this.httpClient.get<[Order]>(`${environment.crmUrl}orders/order-not-archived`);
  }

  getOrdersArchived(): Observable<[Order]> {
    return this.httpClient.get<[Order]>(`${environment.crmUrl}orders/orders-archived`);
  }

  cancelArchiveOrders(order: Order, id: string): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/cancel-archive-order/` + id,
      order, this.httpOptions);
  }

  archiveOrders(order: Order, id: string): Observable<Order> {
    return this.httpClient.put<Order>(
      `${environment.crmUrl}orders/archive-order/` + id,
      order, this.httpOptions);
  }
    
  findAllProducts() : Observable<[Material]>{
    return this.httpClient.get<[Material]>(`${environment.stockUrl}/material/finished-products`);
  }
}