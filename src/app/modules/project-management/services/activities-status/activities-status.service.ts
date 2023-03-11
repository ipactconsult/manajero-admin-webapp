import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ActivityStatus } from '../../models/ActivityStatus';
@Injectable({
  providedIn: 'root'
})
export class ActivitiesStatusService {

  url = environment.actionPlanUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  findAllByProject(id: string): Observable<[ActivityStatus]> {
    return this.http.get<[ActivityStatus]>(`${this.url}statusActivity/findAllByProject/${id}`);
  }
  findAllById(id: string): Observable<ActivityStatus> {
    return this.http.get<ActivityStatus>(`${this.url}statusActivity/findById/${id}`);
  }
  add(statusActivity: ActivityStatus): Observable<ActivityStatus> {
    return this.http.post<ActivityStatus>(
      `${this.url}statusActivity/add`,
      statusActivity,
      this.httpOptions
    );
  }
  update(statusActivity: ActivityStatus): Observable<ActivityStatus> {
    return this.http.put<ActivityStatus>(
      `${this.url}statusActivity/update`,
      statusActivity,
      this.httpOptions
    );
  }
  changePosition(statusActivity: ActivityStatus[]): Observable<[ActivityStatus]> {
    return this.http.put<[ActivityStatus]>(
      `${this.url}statusActivity/changePositon`,
      statusActivity,
      this.httpOptions
    );
  }
}
