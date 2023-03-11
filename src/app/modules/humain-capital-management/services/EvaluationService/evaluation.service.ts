import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Evaluation } from '../../models/Evaluation';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<[Evaluation]> {
    return this.httpClient.get<[Evaluation]>(`${environment.employees_hcm}evaluation/all`);
  }

  add(evaluation : Evaluation, id: string) {
    return this.httpClient.post<Evaluation>(`${environment.employees_hcm}evaluation/add/`+id,evaluation,this.httpOptions);
  }

  update(evaluation:Evaluation,id : string): Observable<Evaluation> {
    const path = `${environment.employees_hcm}evaluation/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<any>(path ,skills , this.httpOptions);
  }

  archive(evaluation: Evaluation, id: string): Observable<Evaluation>{
    const path = `${environment.employees_hcm}evaluation/archive/`+id ;
    //@ts-ignore
    return this.httpclient.put<any>(path ,evaluation , this.httpOptions);
  }

  restore(evaluation: Evaluation, id: string): Observable<Evaluation>{
    const path = `${environment.employees_hcm}evaluation/restore/`+id ;
    //@ts-ignore
    return this.httpclient.put<Skills>(path ,evaluation , this.httpOptions);
  }
}
