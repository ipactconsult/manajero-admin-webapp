import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { RentalRequest } from '../../models/RentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentatlRequestService {
  url = environment.rentalRequestUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  findAllActive(): Observable<[RentalRequest]> {
    return this.http.get<[RentalRequest]>(`${this.url}rentalRequest/AllActiveRentalRequests`);
  }
  findAllArchived(): Observable<[RentalRequest]> {
    return this.http.get<[RentalRequest]>(`${this.url}rentalRequest/AllArchivedRentalRequests`);
  }
  validation(rentalRequest: RentalRequest): Observable<RentalRequest> {
    return this.http.put<RentalRequest>(
      `${this.url}rentalRequest/validation`,
      rentalRequest,
      this.httpOptions
    );
  }
  archive(rentalRequest: RentalRequest): Observable<RentalRequest> {
    return this.http.put<RentalRequest>(
      `${this.url}rentalRequest/archive`,
      rentalRequest,
      this.httpOptions
    );
  }
  
  
  countPendings()
  {
    return this.http.get(`${this.url}rentalRequest/countrequests_pending`, this.httpOptions);
  }

  countApproved()
  {
    return this.http.get(`${this.url}rentalRequest/countrequests_approved`,this.httpOptions);
  }

  countUnderValidation()
  {
    return this.http.get(`${this.url}rentalRequest/countrequests_undervalidation`,this.httpOptions);
  }

  countDenied()
  {
    return this.http.get(`${this.url}rentalRequest/countrequests_denied`,this.httpOptions);
  }
  
}
