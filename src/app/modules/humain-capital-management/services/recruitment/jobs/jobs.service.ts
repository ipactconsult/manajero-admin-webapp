import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { JobOffer } from '../../../models/JobOffer';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient : HttpClient) { }

  findAll(): Observable<JobOffer[]>{
    return this.httpclient.get<JobOffer[]>(`${environment.recruitment_hcm}jobOffer/all`);
  }

  add(jobs: JobOffer) : Observable<JobOffer>
  {
    return this.httpclient.post<JobOffer>(`${environment.recruitment_hcm}jobOffer/create`, jobs, this.httpOptions);
  }

  edit(jobs: JobOffer, id : string) : Observable<JobOffer>
  {
    return this.httpclient.put<JobOffer>(`${environment.recruitment_hcm}jobOffer/update/${id}`, jobs, this.httpOptions);
  }

  archive(id : string)
  {

    return this.httpclient.delete<JobOffer>(`${environment.recruitment_hcm}jobOffer/archive/${id}`);
  }

  restore(id : string):Observable<JobOffer>
  {
    return this.httpclient.get<JobOffer>(`${environment.recruitment_hcm}jobOffer/restore/${id}`);
  }
  show(id : string):Observable<JobOffer>
  {
    return this.httpclient.get<JobOffer>(`${environment.recruitment_hcm}jobOffer/show/${id}`, this.httpOptions);
  }

  findAllAsc(): Observable<JobOffer[]>{
    return this.httpclient.get<JobOffer[]>(`${environment.recruitment_hcm}jobOffer/all/asc`);
  }

  findAllDesc(): Observable<JobOffer[]>{
    return this.httpclient.get<JobOffer[]>(`${environment.recruitment_hcm}jobOffer/all/desc`);
  }

  findAllAsc_Pos(): Observable<JobOffer[]>{
    return this.httpclient.get<JobOffer[]>(`${environment.recruitment_hcm}jobOffer/all/people_positions/asc`);
  }

  findAllDesc_Pos(): Observable<JobOffer[]>{
    return this.httpclient.get<JobOffer[]>(`${environment.recruitment_hcm}jobOffer/all/people_positions/desc`);
  }

}
