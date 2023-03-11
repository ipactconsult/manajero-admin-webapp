import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Visit} from '../../models/visit';
import {Customer} from '../../models/Customer';

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
export class VisitService {
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  getAllVisits(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/allVisits`);
  }

  getAllVisitsNonArchived(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/visits-non-archived/False`);
  }
  getAllVisitsArchived(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/visits-non-archived/True`);
  }

  getAllLastVisitsNonArchived(id: Customer |string): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/last-visits-by-customer-desc/False/`+id);
  }

  addVisit(visit: Visit, idProperty: string, idCustomer: string) {
    return this.httpClient.post<Visit>(`${environment.crmUrl}visits/add/` + idProperty+'/'+idCustomer, visit, this.httpOptions);
  }

  updateVisit(visit: Visit, idProperty: string): Observable<Visit> {
    return this.httpClient.put<Visit>(
      `${environment.crmUrl}visits/update-visit/` +  idProperty,
      visit, this.httpOptions);
  }

  deleteVisit(visit: Visit | string): Observable<string> {
    const id = typeof visit === 'string' ? visit : visit.id;
    const url = `${environment.crmUrl}visits/delete/` + id;
    // @ts-ignore
    return this.httpClient.delete<string>(url, httpOptionsPlain);
  }

  getVisitById(id: string): Observable<Visit> {
    return this.httpClient.get<Visit>(`${environment.crmUrl}visits/visit-by-id/` + id);
  }

  getVisitCountByCustomer(id: string) {
    return this.httpClient.get(`${environment.crmUrl}visits/visit-by-customer/` + id);
  }

  cancelArchiveVisit(visit: Visit, id: string): Observable<Visit> {
    return this.httpClient.put<Visit>(
      `${environment.crmUrl}visits/cancel-archive-visit/` + id,
      visit, this.httpOptions);
  }

  archiveVisit(visit: Visit, id: string): Observable<Visit> {
    return this.httpClient.put<Visit>(
      `${environment.crmUrl}visits/archive-visit/` + id,
      visit, this.httpOptions);
  }


  getVisitDescName(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/visits-descending-title/False`);
  }

  getVisitAscName(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/visits-asc-title/False`);
  }

  getVisitDescCreatedAt(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/visit-by-desc-created/False`);
  }

  getVisitAscCreatedAt(): Observable<[Visit]> {
    return this.httpClient.get<[Visit]>(`${environment.crmUrl}visits/visit-by-asc-created/False`);
  }


  findAllProperties() {
    return this.httpClient.get(`${environment.stockUrl}/property/all`);
  }
}
