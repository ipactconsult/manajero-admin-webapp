import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LeaveRequest } from '../../models/LeaveRequest';
import { Observable } from 'rxjs';
import { Employee } from '../../models/Employee';

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

export class LeaveRequestService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient) { }

  findAllRequests(): Observable<[LeaveRequest]> {
    return this.httpclient.get<[LeaveRequest]>(`${environment.employees_hcm}leave-request/all`);
  }

  findAllRequestsAsc(): Observable<[LeaveRequest]> {
    return this.httpclient.get<[LeaveRequest]>(`${environment.employees_hcm}leave-request/all/ascending`);
  }

  findAllRequestsDesc(): Observable<[LeaveRequest]> {
    return this.httpclient.get<[LeaveRequest]>(`${environment.employees_hcm}leave-request/all/descending`);
  }

  allValidate(): Observable<[LeaveRequest]> {
    return this.httpclient.get<[LeaveRequest]>(`${environment.employees_hcm}leave-request/allvalidate`);
  }

  allByEmployee(id: Employee|string): Observable<[LeaveRequest]> {
    return this.httpclient.get<[LeaveRequest]>(`${environment.employees_hcm}leave-request/allByEmployee/${id}`);
  }


  addLeaveRequest(leave: LeaveRequest)
  {
    return this.httpclient.post<LeaveRequest>(`${environment.employees_hcm}leave-request/create`, leave, this.httpOptions);
  }

  saveDraft(leave: LeaveRequest)
  {
    return this.httpclient.post<LeaveRequest>(`${environment.employees_hcm}leave-request/saveAsDraft`, leave, this.httpOptions);
  }

  getLeaveRequest(id: string):Observable<LeaveRequest>{
    return this.httpclient.get<LeaveRequest>(`${environment.employees_hcm}leave-request/get-request/`+id  , this.httpOptions);
  }
  
  updateRequest(leave:LeaveRequest,id : string): Observable<LeaveRequest> {
    const path = `${environment.employees_hcm}leave-request/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  archiveRequest(leave: LeaveRequest, id: string): Observable<LeaveRequest>{
    const path = `${environment.employees_hcm}leave-request/archive-request/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  restoreRequest(leave: LeaveRequest, id: string): Observable<LeaveRequest>{
    const path = `${environment.employees_hcm}leave-request/restore-request/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  validateRequest(leave: LeaveRequest, id: string): Observable<LeaveRequest>{
    const path = `${environment.employees_hcm}leave-request/validate-request/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  rejectRequest(leave: LeaveRequest, id: string): Observable<LeaveRequest>{
    const path = `${environment.employees_hcm}leave-request/reject-request/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  cancelRequest(leave: LeaveRequest, id: string): Observable<LeaveRequest>{
    const path = `${environment.employees_hcm}leave-request/cancel-request/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  deleteRequest(leave: LeaveRequest | string): Observable<string>
  {
    const id = typeof leave === 'string' ? leave : leave.id;
    const path = `${environment.employees_hcm}leave-request/delete-request/`+id;
    //@ts-ignore
    return this.httpclient.delete<string>(path, httpOptionsPlain);
  }

}
