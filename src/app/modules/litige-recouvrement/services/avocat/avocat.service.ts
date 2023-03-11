import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Avocat } from '../../models/Avocat';
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
export class AvocatService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  constructor(private httpClient: HttpClient) {

  }
  getAllAvocats(): Observable<[Avocat]> {
    return this.httpClient.get<[Avocat]>(`${environment.recoverydispute}avocat/all`);

  }
  
  addAvocat(c: Avocat) {
    return this.httpClient.post<Avocat>(`${environment.recoverydispute}avocat/add`, c, this.httpOptions);
  }

   updateAvocat( avocat: Avocat, id: string): Observable<Avocat>{
    return this.httpClient.put<Avocat>( 
      `${environment.recoverydispute}avocat/update/` + id,
      avocat, this.httpOptions);
  }
  getAvocatById(id: string): Observable<Avocat> {
    return this.httpClient.get<Avocat>(`${environment.recoverydispute}avocat/findbyid/` + id);
  }

  
 deleteAvocat(avocat: Avocat | string): Observable<string>{
    const id = typeof avocat === 'string' ? avocat : avocat.id;
    const url = `${environment.recoverydispute}avocat/delete/` + id;
    // @ts-ignore
   return this.httpClient.delete<string>(url, httpOptionsPlain);
  }

  cancelArchiveAvocat(avocat: Avocat, id: string): Observable<Avocat> {
    return this.httpClient.put<Avocat>(
      `${environment.recoverydispute}avocat/cancel-archive/` + id,
      avocat, this.httpOptions);
  }

  archiveAvocat(avocat: Avocat, id: string): Observable<Avocat> {
    return this.httpClient.put<Avocat>(
      `${environment.recoverydispute}avocat/archive/` + id,
      avocat, this.httpOptions);
  }
  findAllAvocatDesc(): Observable<[Avocat]> {
    return this.httpClient.get<[Avocat]>(`${environment.recoverydispute}avocat/all/descending`);
  }

  findAllAvocatAsc(): Observable<[Avocat]> {
    return this.httpClient.get<[Avocat]>(`${environment.recoverydispute}avocat/all/ascending`);
  }

  findNonArchivedAvocats() {
    return this.httpClient.get(`${environment.recoverydispute}avocat/non-archived/False`);
  }


}
