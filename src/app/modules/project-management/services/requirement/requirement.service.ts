import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Requirement } from '../../models/Requirement';
@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  //psUrl:project service url
  psUrl =environment.psUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }
  findAllActiveRequiremen(): Observable<[Requirement]> {
    return this.http.get<[Requirement]>(`${this.psUrl}requirement/AllActiveRequirement`);
  }
  findAllArchivedRequiremen(): Observable<[Requirement]> {
    return this.http.get<[Requirement]>(`${this.psUrl}requirement/AllArchivedRequirement`);
  }
  findAllActiveRequirementByProject(id: string): Observable<[Requirement]> {
    return this.http.get<[Requirement]>(`${this.psUrl}requirement/findAllRequirementByIdProject/${id}`);
  }
  findAllArchivedRequirementByProject(id: string): Observable<[Requirement]> {
    return this.http.get<[Requirement]>(`${this.psUrl}requirement/findAllArchivedRequirementByProject/${id}`);
  }
  findRequiremenById(id: string): Observable<Requirement> {
    return this.http.get<Requirement>(`${this.psUrl}requirement/findRequirementById/${id}`);
  }
  addRequiremen(requirement: Requirement): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.psUrl}requirement/addRequirement`,requirement,this.httpOptions);
  }
  updateRequiremen(requirement: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.psUrl}requirement/updateRequirement`,requirement,this.httpOptions);
  }
  archiveRequiremen(requirement: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.psUrl}requirement/archiveRequirement`,requirement,this.httpOptions);
  }
}
