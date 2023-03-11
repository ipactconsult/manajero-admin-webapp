import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Litige } from '../../models/Litige';
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
export class LitigeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };
  constructor(private httpClient: HttpClient) {

  }
  getAllLitige(): Observable<[Litige]> {
    return this.httpClient.get<[Litige]>(`${environment.recoverydispute}litige/all`);
  }
  addLitige(c: Litige) {
    return this.httpClient.post<Litige>(`${environment.recoverydispute}litige/add`, c, this.httpOptions);
  }
  deleteLitige(id: string): Observable<Litige> {
    return this.httpClient.delete<Litige>(`http://localhost:8083/litige/delete/` + id, this.httpOptions);
  }
  getLitigeByid(id: string):Observable<Litige>{
    return this.httpClient.get<Litige>(`${environment.recoverydispute}litige/findbyid/`+id  , this.httpOptions);
  }

  updateLitige(id:string ,litige: Litige): Observable<Litige>{
    const path = `http://localhost:8083/litige/update/` +id ;
    //@ts-ignore
    return this.httpClient.put<Litige>(path ,litige , this.httpOptions);

  }
  MailSendingEnCours(id:string ):Observable<any>{
    const path = `http://localhost:8083/sendEmail/` +id ;
    //@ts-ignore
    return this.httpClient.post<any>(path  , this.httpOptions);

  }
  MailSendingResolu(id:string ):Observable<any>{
    const path = `http://localhost:8083/sendEmailApres/` +id ;
    //@ts-ignore
    return this.httpClient.post<any>(path  , this.httpOptions);

  }
}
