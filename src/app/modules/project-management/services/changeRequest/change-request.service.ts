import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ChangeRequest } from '../../models/ChangeRequest';

@Injectable({
  providedIn: 'root'
})
export class ChangeRequestService {
 psUrl =environment.psUrl;
 httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
   }),
 };
 constructor(private http: HttpClient) { }
 findAllActiveChangeRequest(id:string): Observable<[ChangeRequest]> {
   return this.http.get<[ChangeRequest]>(`${this.psUrl}changeRequest/AllActiveChangeRequest/${id}`);
 }
 findAllArchivedChangeRequest(id:string): Observable<[ChangeRequest]> {
   return this.http.get<[ChangeRequest]>(`${this.psUrl}changeRequest/AllArchivedChangeRequest/${id}`);
 }
 findChangeRequestById(id: string): Observable<ChangeRequest> {
   return this.http.get<ChangeRequest>(`${this.psUrl}changeRequest/findRequestById/${id}`);
 }
 findChangeRequestByUser(id: string,email: string): Observable<ChangeRequest> {
  return this.http.get<ChangeRequest>(`${this.psUrl}changeRequest/findChangeRequestByRequestor/${id}/${email}`);
}
 addChangeRequest(changeRequest: ChangeRequest): Observable<ChangeRequest> {
   return this.http.post<ChangeRequest>(`${this.psUrl}changeRequest/addChangeRequest`,changeRequest,this.httpOptions);
 }
 updateChangeRequest(changeRequest: ChangeRequest): Observable<ChangeRequest> {
   return this.http.put<ChangeRequest>(`${this.psUrl}changeRequest/updateChangeRequest`,changeRequest,this.httpOptions);
 }
 archiveChangeRequest(changeRequest: ChangeRequest): Observable<ChangeRequest> {
   return this.http.put<ChangeRequest>(`${this.psUrl}changeRequest/archiveChangeRequest`,changeRequest,this.httpOptions);
 }

}
