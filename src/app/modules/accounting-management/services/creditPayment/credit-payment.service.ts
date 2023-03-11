import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment"
import { HttpClient} from '@angular/common/http';
import {CreditPayment} from "../../models/credit-payment.model";

@Injectable({
  providedIn: 'root'
})
export class CreditPaymentService {

  constructor(private http: HttpClient) {}

  getAllByCredit(id : string){
    return this.http.get(`${environment.accountingUrl}creditpayment/getbycredit/`+id);
  }
}
