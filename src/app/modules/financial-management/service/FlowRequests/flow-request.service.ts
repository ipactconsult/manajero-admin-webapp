import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlowRequest } from '../../models/FlowRequest';



@Injectable({
  providedIn: 'root'
})
export class FlowRequestService {

  httpOptions = {
    headers: new HttpHeaders({
  
      'Content-Type': 'application/json;  charset=utf-8 ',      
    }),
  };

  private Url = 'http://localhost:8091/FlowRequest';

  constructor(private httpclient:HttpClient) {  }

  public addFlowRequest(flowRequest: FlowRequest): Observable<FlowRequest> {
    return this.httpclient.post<FlowRequest>(`${this.Url}/createFlowRequest/ `, flowRequest,this.httpOptions);
  }
 public getAllRequests () : Observable<FlowRequest[]> {
   return this.httpclient.get<FlowRequest[]>(`${this.Url}/retrieveAllFlowRequests`);
 }
}
