import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Project } from '../../models/Project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //psUrl:project service url
  psUrl =environment.psUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }
  findAllActiveProject(): Observable<[Project]> {
    return this.http.get<[Project]>(`${this.psUrl}project/AllActiveProjects`);
  }
  findAllArchivedProject(): Observable<[Project]> {
    return this.http.get<[Project]>(`${this.psUrl}project/AllArchivedProjects`);
  }
  findProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.psUrl}project/findProjectById/${id}`);
  }
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.psUrl}project/addProject`,project,this.httpOptions);
  }
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.psUrl}project/updateProject`,project,this.httpOptions);
  }
  archiveProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.psUrl}project/archiveProject`,project,this.httpOptions);
  }
  findProjectByMember(manager: string): Observable<[Project]> {
    return this.http.get<[Project]>(`${this.psUrl}project/findProjectByMember/${manager}`);
  }
  findProjectByManager(manager: string): Observable<[Project]> {
    return this.http.get<[Project]>(`${this.psUrl}project/findProjectByManager/${manager}`);
  }
}
