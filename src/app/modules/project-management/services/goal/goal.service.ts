import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Goal } from '../../models/Goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  url = environment.actionPlanUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  findAllByProject(id: string): Observable<[Goal]> {
    return this.http.get<[Goal]>(`${this.url}goal/AllGoalByProject/${id}`);
  }
  add(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(
      `${this.url}goal/addGoal`,
      goal,
      this.httpOptions
    );
  }
  update(goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(
      `${this.url}goal/updateGoal`,
      goal,
      this.httpOptions
    );
  }
  archive(goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(
      `${this.url}goal/archiveGoal`,
      goal,
      this.httpOptions
    );
  }
}
