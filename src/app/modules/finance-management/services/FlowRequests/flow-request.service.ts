import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FlowRequest} from "../../../financial-management/models/FlowRequest";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlowRequestService {
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };
  constructor(private httpclient:HttpClient) { }

   addFlowRequest(flowRequest: FlowRequest): Observable<FlowRequest> {
    return this.httpclient.post<FlowRequest>(`${environment.financeUrl}createFlowRequest/ `, flowRequest,this.httpOptions);
  }
   getAllRequests () : Observable<FlowRequest[]> {
    return this.httpclient.get<FlowRequest[]>(`${environment.financeUrl}retrieveAllFlowRequests`);
  }
}
