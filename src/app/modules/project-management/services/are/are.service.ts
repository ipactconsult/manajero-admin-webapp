import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Are } from '../../models/Are';
@Injectable({
  providedIn: 'root'
})
export class AreService {
  pmoUrl =environment.pmo;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient) { }
  addAre(are: Are): Observable<Are> {
    return this.http.post<Are>(`${this.pmoUrl}are/addAre`,are,this.httpOptions);
  }
  deleteAre(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.pmoUrl}are/deleteAre/${id}`);
  }

}
