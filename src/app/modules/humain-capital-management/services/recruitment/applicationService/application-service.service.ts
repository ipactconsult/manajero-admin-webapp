import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Application } from '../../../models/Application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient : HttpClient) { }

  findAll(): Observable<Application[]> {
    return this.httpclient.get<Application[]>(`${environment.recruitment_hcm}application/list-applications`);
  }

  findAllBYScreening(): Observable<Application[]> {
    return this.httpclient.get<Application[]>(`${environment.recruitment_hcm}application/screening-applications`);
  }

  getApplication(id : string): Observable<Application>{
    return this.httpclient.get<Application>(`${environment.recruitment_hcm}application/app/${id}`, this.httpOptions);
  }

  screen(application:Application, id : string): Observable<Application> {
    const path = `${environment.recruitment_hcm}application/screen/`+id ;
    //@ts-ignore
    return this.httpclient.put<Application>(path ,application , this.httpOptions);
  }

  validate(application:Application, id : string): Observable<Application> {
    const path = `${environment.recruitment_hcm}application/validate/`+id ;
    //@ts-ignore
    return this.httpclient.put<Application>(path ,application , this.httpOptions);
  }

  reject(application:Application, id : string): Observable<Application> {
    const path = `${environment.recruitment_hcm}application/reject/`+id ;
    //@ts-ignore
    return this.httpclient.put<Application>(path ,application , this.httpOptions);
  }

}
