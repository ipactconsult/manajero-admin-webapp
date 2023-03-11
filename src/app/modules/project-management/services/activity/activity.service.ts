import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Activity } from '../../models/Activity';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url = environment.actionPlanUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  findAllByGoal(id: string): Observable<[Activity]> {
    return this.http.get<[Activity]>(`${this.url}activity/findAllByGoal/${id}`);
  }
  findAllById(id: string): Observable<Activity> {
    return this.http.get<Activity>(`${this.url}activity/findById/${id}`);
  }
  add(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(
      `${this.url}activity/add`,
      activity,
      this.httpOptions
    );
  }
  update(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(
      `${this.url}activity/update`,
      activity,
      this.httpOptions
    );
  }
}
