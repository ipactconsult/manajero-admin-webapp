import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Claim} from '../../models/Claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
 httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };


  constructor(private httpClient: HttpClient) {
  }

  
   getAllClaimsNonArchived(): Observable<[Claim]> {
    return this.httpClient.get<[Claim]>(`${environment.crmUrl}claim/claims-non-archived/false`);
  }
   
   getAllClaimsArchived(): Observable<[Claim]> {
    return this.httpClient.get<[Claim]>(`${environment.crmUrl}claim/claims-non-archived/true`);
  }
  

  addClaim(claim: Claim, idEmployee: string) {
    return this.httpClient.post<Claim>(`${environment.crmUrl}claim/add/` + idEmployee , claim, this.httpOptions);
  }

  updateClaim(claim: Claim, idEmployee: string): Observable<Claim> {
    return this.httpClient.put<Claim>(
      `${environment.crmUrl}claim/update-claim/` + idEmployee ,
      claim, this.httpOptions);
  }

  deleteClaim(claim: Claim | string): Observable<string> {
    const id = typeof claim === 'string' ? claim : claim.id;
    const url = `${environment.crmUrl}claim/delete/` + id;
    // @ts-ignore
    return this.httpClient.delete<string>(url, httpOptionsPlain);
  }

  getClaimById(id: string): Observable<Claim> {
    return this.httpClient.get<Claim>(`${environment.crmUrl}claim/claim-by-id/` + id);
  }

  cancelArchiveClaim(claim: Claim, id: string): Observable<Claim> {
    return this.httpClient.put<Claim>(
      `${environment.crmUrl}claim/cancel-archive-claim/` + id,
      claim, this.httpOptions);
  }

  archiveClaim(claim: Claim, id: string): Observable<Claim> {
    return this.httpClient.put<Claim>(
      `${environment.crmUrl}claim/archive-claim/` + id,
      claim, this.httpOptions);
  }


  getClaimDescTitle(): Observable<[Claim]> {
    return this.httpClient.get<[Claim]>(`${environment.crmUrl}claim/claims-descending-title/False`);
  }

  getClaimAscTitle(): Observable<[Claim]> {
    return this.httpClient.get<[Claim]>(`${environment.crmUrl}claim/claims-asc-title/False`);
  }

  getClaimDescCreatedAt(): Observable<[Claim]> {
    return this.httpClient.get<[Claim]>(`${environment.crmUrl}claim/claim-by-desc-created/False`);
  }

  getClaimAscCreatedAt(): Observable<[Claim]> {
    return this.httpClient.get<[Claim]>(`${environment.crmUrl}claim/claim-by-asc-created/False`);
  }

}
