import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment"
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credit } from '../../models/credit.model';


@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private http: HttpClient) { }

  addCredit(data : Credit){

    return this.http.post(`${environment.accountingUrl}credit/add`, data);
  }
  getAll() {
    return this.http.get(`${environment.accountingUrl}credit/credits`);
  }
  getCreditId(id: string){
    return this.http.get<Credit>(`${environment.accountingUrl}credit/findByIdCredit/`+id);
  }
  archiveCredit(id: string){
    return this.http.put(`${environment.accountingUrl}credit/archiver/`+id, null);
  }
}
