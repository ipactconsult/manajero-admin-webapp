import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Relance } from '../models/Relance';
import { SMS } from '../models/SMS';
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
export class RelanceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  constructor(private httpClient: HttpClient) {

  }
  getAllRelance(ar:string ,clo:boolean): Observable<[Relance]> {
    return this.httpClient.get<[Relance]>(`${environment.recoverydispute}relance/allrelances/${ar}/${clo}`);
  }
  addRelance(c: Relance) {
    return this.httpClient.post<Relance>(`${environment.recoverydispute}relance/add`, c, this.httpOptions);
  }
  getAllRelanceNonArchived(): Observable<[Relance]> {
    return this.httpClient.get<[Relance]>(`${environment.recoverydispute}relance/relance-non-archived/False`);
  }
  archiveRelance(relance: Relance, id: string): Observable<Relance> {
    return this.httpClient.put<Relance>(
      `${environment.recoverydispute}relance/archive/` + id,
      relance, this.httpOptions);
  }
  getRelanceById(id: string): Observable<Relance> {
    return this.httpClient.get<Relance>(`${environment.recoverydispute}relance/findbyid/` + id);
  }

   /*updateCategorie(id:string ,categorie: CategorieDoc): Observable<CategorieDoc>{
    const path = `${environment.recoverydispute}categorie/update/` +id ;
    //@ts-ignore
    return this.httpClient.put<CategorieDoc>(path ,categorie , this.httpOptions);

  }*/
  
 /*deleteCategorie(categorie: CategorieDoc | string): Observable<string>{
    const id = typeof categorie === 'string' ? categorie : categorie.id;
    const url = `${environment.recoverydispute}categorie/delete/` + id;
    // @ts-ignore
   return this.httpClient.delete<string>(url, httpOptionsPlain);
  }*/
  getRelanceByid(id: string):Observable<any>{
    return this.httpClient.get<any>(`${environment.recoverydispute}relance/findbyid/`+id  , this.httpOptions);
  }
  updateRelance(id:string ,relance: Relance): Observable<Relance>{
    const path = `${environment.recoverydispute}relance/update/` +id ;
    //@ts-ignore
    return this.httpClient.put<Relance>(path ,relance , this.httpOptions);

  }

  sendSMS(sms: SMS,id:string): Observable<SMS>{
    const path = `${environment.recoverydispute}sms/sendSms/` +id ;
    //@ts-ignore
    return this.httpClient.post<SMS>(path ,sms , this.httpOptions);

  }
  
}
