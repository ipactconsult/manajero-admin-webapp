import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Skills } from '../../models/Skills';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<[Skills]> {
    return this.httpClient.get<[Skills]>(`${environment.employees_hcm}skills/all`);
  }

  add(skills : Skills) {
    return this.httpClient.post<Skills>(`${environment.employees_hcm}skills/create`,skills,this.httpOptions);
  }

  getSkill(id: string):Observable<Skills>{
    return this.httpClient.get<Skills>(`${environment.employees_hcm}skills/show/`+id  , this.httpOptions);
  }
  update(skills:Skills,id : string): Observable<Skills> {
    const path = `${environment.employees_hcm}skills/edit/`+id ;

    return this.httpClient.put<any>(path ,skills , this.httpOptions);
  }

  archive(skills: Skills, id: string): Observable<Skills>{
    const path = `${environment.employees_hcm}skills/archive/`+id ;

    return this.httpClient.put<any>(path ,skills , this.httpOptions);
  }

  restore(skills: Skills, id: string): Observable<Skills>{
    const path = `${environment.employees_hcm}skills/restore/`+id ;

    return this.httpClient.put<Skills>(path ,skills , this.httpOptions);
  }



}
