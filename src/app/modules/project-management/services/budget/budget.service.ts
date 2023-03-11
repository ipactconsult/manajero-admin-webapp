import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Budget } from '../../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  url = environment.psUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  
 
    
  findAllBudget(id: string): Observable<[Budget]> {
    return this.http.get<[Budget]>(`${this.url}budget/findAll/${id}`);
  }
  add(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(
      `${this.url}budget/add`,
      budget,
      this.httpOptions
    );
  }
  update(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(
      `${this.url}budget/update`,
      budget,
      this.httpOptions
    );
  }
  calculate (id: string): Observable<number> {
    return this.http.get<number>(`${this.url}budget/calculateBudgetTotal/${id}`);
  }
}
