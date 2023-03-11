import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Delivery} from '../../models/Delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
 httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  getAllDeliveries(): Observable<[Delivery]> {
    return this.httpClient.get<[Delivery]>(`${environment.crmUrl}delivery/allDeliveries`);
  }

  addDelivery(delivery: Delivery, idOrder: string) {
    return this.httpClient.post<Delivery>(`${environment.crmUrl}delivery/create-delivery/`+idOrder, delivery, this.httpOptions);
  }

  updateDelivery(id: string, delivery: Delivery): Observable<Delivery> {
    return this.httpClient.put<Delivery>(
      `${environment.crmUrl}delivery/update-delivery/` + id,
      delivery, this.httpOptions);
  }  

  validateDelivery(idOrder: string, delivery: Delivery): Observable<Delivery> {
    return this.httpClient.put<Delivery>(
      `${environment.crmUrl}delivery/validate-delivery/` + idOrder,
      delivery, this.httpOptions);
  }

  getDeliveryById(id: string): Observable<Delivery> {
    return this.httpClient.get<Delivery>(`${environment.crmUrl}delivery/delivery-by-id/` + id);
  }

  getDeliveryByArchive(): Observable<[Delivery]> {
    return this.httpClient.get<[Delivery]>(`${environment.crmUrl}delivery/deliveries-by-archive/True`);
  }

  getDeliveryNotArchived(): Observable<[Delivery]> {
    return this.httpClient.get<[Delivery]>(`${environment.crmUrl}delivery/deliveries-by-archive/False`);
  }

  cancelArchiveDeliveries(delivery: Delivery, id: string): Observable<Delivery> {
    return this.httpClient.put<Delivery>(
      `${environment.crmUrl}delivery/cancel-archive-delivery/` + id,
      delivery, this.httpOptions);
  }

  archiveDeliveries(delivery: Delivery, id: string): Observable<Delivery> {
    return this.httpClient.put<Delivery>(
      `${environment.crmUrl}delivery/archive-delivery/` + id,
      delivery, this.httpOptions);
  }
   
}
