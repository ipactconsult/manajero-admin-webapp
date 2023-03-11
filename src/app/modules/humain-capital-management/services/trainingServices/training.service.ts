import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import {Training} from '../../models/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<[Training]> {
    return this.httpClient.get<[any]>(`${environment.employees_hcm}training/all`);
  }


  findRecommended(id: string): Observable<[any]> {
    return this.httpClient.get<[any]>(`${environment.pmo}activity/classificationEmployee/${id}`);
  }

  add(training : Training) {
    return this.httpClient.post<Training>(`${environment.employees_hcm}training/create`,training,this.httpOptions);
  }


  getTraining(id: string):Observable<Training>{
    return this.httpClient.get<Training>(`${environment.employees_hcm}training/show/`+id  , this.httpOptions);
  }

  update(training:Training,id : string): Observable<Training> {
    const path = `${environment.employees_hcm}training/edit/`+id ;

    return this.httpClient.put<Training>(path ,training , this.httpOptions);
  }

  archive(training: Training, id: string): Observable<Training>{
    const path = `${environment.employees_hcm}training/archive/`+id ;

    return this.httpClient.put<Training>(path ,training , this.httpOptions);
  }

  restore(training: Training, id: string): Observable<any>{
    const path = `${environment.employees_hcm}training/restore/`+id ;
   
    return this.httpClient.put<any>(path ,training , this.httpOptions);
  }
}
