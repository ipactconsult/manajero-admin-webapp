import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Stakeholder } from '../../models/document/project/Stakeholder';
@Injectable({
  providedIn: 'root'
})
export class StakeholderService {
  pmoUrl =environment.pmo;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient) { }
  findAllByProjectCharter(id:string): Observable<[Stakeholder]> {
    return this.http.get<[Stakeholder]>(`${this.pmoUrl}stakeholder/allStakeholderByProjectcharter/${id}`);
  }
  addStakeholderToCharter(risk: Stakeholder): Observable<Stakeholder> {
    return this.http.post<Stakeholder>(`${this.pmoUrl}stakeholder/addStakeholder`,risk,this.httpOptions);
  }
  deleteStakeholder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.pmoUrl}stakeholder/deleteStakeholder/${id}`);
  }
}
