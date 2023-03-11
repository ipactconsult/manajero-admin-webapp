import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GlobalCharter } from '../models/global-charter';


@Injectable({
  providedIn: 'root'
})
export class GlobalCharterService {


  httpOptions = {
    headers: new HttpHeaders({
  
      'Content-Type': 'application/json',
    }),
  };
   


   
  constructor(private httpClient: HttpClient) { }
  private apiServerUrl = environment.comMarketing;

  findAll(): Observable<any> {
    return this.httpClient.get<any>
  (`${environment.comMarketing}/GlobalCharter/all`, this.httpOptions);
  }


  getAllGlobalCharters(): Observable<GlobalCharter[]> {
    return this.httpClient.get<[GlobalCharter]>(`${environment.comMarketing}/GlobalCharter/all`);
 
  }

  addGlobalCharter(c: GlobalCharter ) {
    return this.httpClient.post<GlobalCharter>(`${environment.comMarketing}/GlobalCharter/add`, c, this.httpOptions);
  }

   updateGlobalCharter( e: GlobalCharter): Observable<GlobalCharter>{
    return this.httpClient.put<GlobalCharter>( 
      `${environment.comMarketing}/GlobalCharter/update`,
      e , this.httpOptions);
  }
  
  public deleteGlobalCharter(id: String): Observable<void> {
    return this.httpClient.delete<void>(`${environment.comMarketing}/GlobalCharter/delete/${id}`);
  }


  getGlobalCharterById(id: String ): Observable<GlobalCharter>{
    return this.httpClient.get<GlobalCharter>(`${environment.comMarketing}/GlobalCharter/GlobalCharter-by-id/${id}`);
  }
  cancelArchiveGlobalCharter(e: GlobalCharter, id: string): Observable<GlobalCharter> {
    return this.httpClient.put<GlobalCharter>(
      `${environment.comMarketing}/GlobalCharter/cancelArchive-GlobalCharter/` + id,
      e, this.httpOptions);
  }

  archiveGlobalCharter(e: GlobalCharter, id: string): Observable<GlobalCharter> {
    return this.httpClient.put<GlobalCharter>(
      `${environment.comMarketing}/GlobalCharter/archive-GlobalCharter/` + id,
      e, this.httpOptions);
  }
  

}
