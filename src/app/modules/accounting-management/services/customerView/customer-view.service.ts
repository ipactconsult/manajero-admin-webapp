import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerView} from "../../models/customer-view.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerViewService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('https://manazello-crm.herokuapp.com/api/customer/allCustomers');
  }
  getById(id: string){
    return this.http.get<CustomerView>('https://manazello-crm.herokuapp.com/api/customer/customer-by-id/'+id);
  }
}
