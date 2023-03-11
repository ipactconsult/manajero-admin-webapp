import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LeaveRequest } from '../../models/LeaveRequest';
import { Observable } from 'rxjs';
import { Expenses } from '../../models/Expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient) { }

  findAllExpenses(): Observable<[Expenses]> {
    return this.httpclient.get<[Expenses]>(`${environment.employees_hcm}expenses/all`);
  }


  allValidate(): Observable<[Expenses]> {
    return this.httpclient.get<[Expenses]>(`${environment.employees_hcm}expenses/allvalidate`);
  }


  addExpense(expenses: Expenses)
  {
    return this.httpclient.post<Expenses>(`${environment.employees_hcm}expenses/create`, expenses, this.httpOptions);
  }

  saveDraft(expenses: Expenses)
  {
    return this.httpclient.post<Expenses>(`${environment.employees_hcm}expenses/saveAsDraft`, expenses, this.httpOptions);
  }

  getExpenses(id: string):Observable<Expenses>{
    return this.httpclient.get<Expenses>(`${environment.employees_hcm}expenses/get-expense/`+id  , this.httpOptions);
  }
  
  updateExpense(expenses:Expenses,id : string): Observable<Expenses> {
    const path = `${environment.employees_hcm}expenses/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<Expenses>(path ,expenses , this.httpOptions);
  }

  archiveExpense(expenses: Expenses, id: string): Observable<Expenses>{
    const path = `${environment.employees_hcm}expenses/archive-expense/`+id ;
    //@ts-ignore
    return this.httpclient.put<Expenses>(path ,expenses , this.httpOptions);
  }

  restoreExpense(expenses: Expenses, id: string): Observable<Expenses>{
    const path = `${environment.employees_hcm}expenses/restore-expense/`+id ;
    //@ts-ignore
    return this.httpclient.put<Expenses>(path ,expenses , this.httpOptions);
  }

  validateExpense(expenses: Expenses, id: string): Observable<Expenses>{
    const path = `${environment.employees_hcm}expenses/validate-expense/`+id ;
    //@ts-ignore
    return this.httpclient.put<Expenses>(path ,expenses , this.httpOptions);
  }

  rejectexpense(expenses: Expenses, id: string): Observable<Expenses>{
    const path = `${environment.employees_hcm}expenses/reject-expense/`+id ;
    //@ts-ignore
    return this.httpclient.put<Expenses>(path ,expenses , this.httpOptions);
  }

  cancelExpense(expenses: Expenses, id: string): Observable<Expenses>{
    const path = `${environment.employees_hcm}expense/cancel-expense/`+id ;
    //@ts-ignore
    return this.httpclient.put<Expenses>(path ,expenses , this.httpOptions);
  }

}
