import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { JobsCategory } from '../../../models/JobsCategory';


const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};
@Injectable({
  providedIn: 'root'
})
export class JobsCategoryService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient : HttpClient) { }

  findAll(): Observable<JobsCategory[]>{
    return this.httpclient.get<JobsCategory[]>(`${environment.recruitment_hcm}recruitment/jobsCategory/all`);
  }

  add(category: JobsCategory)
  {
    return this.httpclient.post<JobsCategory>(`${environment.recruitment_hcm}recruitment/jobsCategory/create`, category, this.httpOptions);
  }

  edit(category: JobsCategory, id : string) : Observable<JobsCategory>
  {
    return this.httpclient.put<JobsCategory>(`${environment.recruitment_hcm}recruitment/jobsCategory/edit${id}`, category, this.httpOptions);
  }

  delete(category: JobsCategory | string)
  {
    const id = typeof category === 'string' ? category : category.id;

    return this.httpclient.delete<JobsCategory>(`${environment.recruitment_hcm}recruitment/jobsCategory/delete/${id}`);
  }

  show(id : string):Observable<JobsCategory>
  {
    return this.httpclient.get<JobsCategory>(`${environment.recruitment_hcm}recruitment/jobsCategory/show/${id}`, this.httpOptions);
  }




}
