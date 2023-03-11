import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProjectCharter } from '../../models/ProjectCharter';

@Injectable({
  providedIn: 'root'
})
export class ProjectCharterService {
   pmoUrl =environment.pmo;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { 

  }
  findAllProjectCharter(archived: boolean): Observable<[ProjectCharter]> {
    return this.http.get<[ProjectCharter]>(`${this.pmoUrl}charter/allCharter/${archived}`);
  }
  findAllProjectCharterByUser(archived: boolean,email: string): Observable<[ProjectCharter]> {
    return this.http.get<[ProjectCharter]>(`${this.pmoUrl}charter/allCharter/${archived}/${email}`);
  }
  findProjectCharterById(id: string): Observable<ProjectCharter> {
    return this.http.get<ProjectCharter>(`${this.pmoUrl}charter/findByIdCharter/${id}`);
  }
  addProjectCharter(projectCharter: ProjectCharter,email:string): Observable<ProjectCharter> {
    return this.http.post<ProjectCharter>(`${this.pmoUrl}charter/addCharter/${email}`,projectCharter,this.httpOptions);
  }
  updateProjectCharter(projectCharter: ProjectCharter): Observable<ProjectCharter> {
    return this.http.put<ProjectCharter>(`${this.pmoUrl}charter/updateCharter`,projectCharter,this.httpOptions);
  }
  archiveProjectCharter(id: string): Observable<ProjectCharter> {
    return this.http.put<ProjectCharter>(`${this.pmoUrl}charter/archiveCharter/${id}`,this.httpOptions);
  }
  deleteProjectCharter(id: string): Observable<ProjectCharter> {
    return this.http.delete<ProjectCharter>(`${this.pmoUrl}charter/deleteCharter/${id}`);
  }
}
