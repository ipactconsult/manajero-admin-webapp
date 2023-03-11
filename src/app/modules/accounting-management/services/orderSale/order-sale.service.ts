import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderSale} from "../../models/order-sale.model";

@Injectable({
  providedIn: 'root'
})
export class OrderSaleService {

  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get('https://manazello-crm.herokuapp.com/api/orders/orders-sale');
  }
  getById(id: string){
    return this.http.get<OrderSale>('https://manazello-crm.herokuapp.com/api/orders/order-by-id/'+id);
  }
}
