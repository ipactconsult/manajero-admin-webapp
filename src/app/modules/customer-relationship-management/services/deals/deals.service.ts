import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Deals} from '../../models/Deals';
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
export class DealsService {
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  getAllDeals(): Observable<[Deals]> {
    return this.httpClient.get<[Deals]>(`${environment.crmUrl}deals/allDeals`);
  }

  addDeal(d: Deals) {
    return this.httpClient.post<Deals>(`${environment.crmUrl}deals/add`, d, this.httpOptions);
  }

  updateDeal(id: string, deals: Deals): Observable<Deals> {
    return this.httpClient.put<Deals>(
      `${environment.crmUrl}deals/update-deal/` + id,
      deals, this.httpOptions);
  }

  deleteDeal(deals: Deals | string): Observable<string> {
    const id = typeof deals === 'string' ? deals : deals.id;
    const url = `${environment.crmUrl}deals/delete/` + id;
    // @ts-ignore
    return this.httpClient.delete<string>(url, httpOptionsPlain);
  }

  getDealById(id: string): Observable<Deals> {
    return this.httpClient.get<Deals>(`${environment.crmUrl}deals/deal-by-id/` + id);
  }
    
  getDealByArchive(): Observable<[Deals]> {
    return this.httpClient.get<[Deals]>(`${environment.crmUrl}deals/deals-by-archive/True` );
  }   
  getDealNotArchived(): Observable<[Deals]> {
    return this.httpClient.get<[Deals]>(`${environment.crmUrl}deals/deals-by-archive/False` );
  }

  cancelArchiveDeals(deals: Deals, id: string): Observable<Deals> {
    return this.httpClient.put<Deals>(
      `${environment.crmUrl}deals/cancel-archive-deal/` + id,
      deals, this.httpOptions);
  }

  archiveDeals(deals: Deals, id: string): Observable<Deals> {
    return this.httpClient.put<Deals>(
      `${environment.crmUrl}deals/archive-deal/` + id,
      deals, this.httpOptions);
  }
  
  getAllDealsByCustomerNonArchived(visitCustomer: Customer |string): Observable<[Deals]> {
    return this.httpClient.get<[Deals]>(`${environment.crmUrl}deals/deals-by-customer-desc/`+visitCustomer+'/False');
  }

}
