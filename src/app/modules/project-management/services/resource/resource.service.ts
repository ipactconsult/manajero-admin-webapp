import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../models/Product';
import { ResourceRequest } from '../../models/ResourceRequest';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  url = environment.actionPlanUrl;
  stockUrl = environment.stockUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  
  findAllProduct(): Observable<[Product]> {
    return this.http.get<[Product]>(`${this.stockUrl}/material/stocked`);
  }
    
  findAllRequest(id: string): Observable<[ResourceRequest]> {
    return this.http.get<[ResourceRequest]>(`${this.url}resourceRequest/findByProject/${id}`);
  }
  sendRequest(request: ResourceRequest): Observable<ResourceRequest> {
    return this.http.post<ResourceRequest>(
      `${this.url}resourceRequest/add`,
      request,
      this.httpOptions
    );
  }
  update(request: ResourceRequest): Observable<ResourceRequest> {
    return this.http.put<ResourceRequest>(
      `${this.url}resourceRequest/update`,
      request,
      this.httpOptions
    );
  }
  deleteRequest(id: string): Observable<ResourceRequest> {
    return this.http.delete<ResourceRequest>(`${this.url}resourceRequest/delete/${id}`);
  }
 
  calculateBudget(id:string): Observable<number> {
    return this.http.get<number>(`${this.url}statusActivity/calculateBudgetResource/${id}`);
  }
  findAllResourceByProject(id:string): Observable<[Product]> {
    return this.http.get<[Product]>(`${this.url}statusActivity/findAllResource/${id}`);
  }
}
