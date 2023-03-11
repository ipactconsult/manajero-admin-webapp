import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class RecommendedTrainingService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http : HttpClient) { }

  findAll(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.actionPlanUrl}recomandedTraining/findAll`);
  }


  getById(id : string): Observable<any> {
    return this.http.get<any>(`${environment.actionPlanUrl}activity/classificationEmployee/${id}`, this.httpOptions);
  }


}
