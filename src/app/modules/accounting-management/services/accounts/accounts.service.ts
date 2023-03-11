import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../../../../environments/environment"
import {Account} from "../../models/account.model";


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.accountingUrl}account/accounts`);
  }
  addAccount(j: Account) {
    return this.http.post<Account>(`${environment.accountingUrl}account/add`, j);
  }
  
}
