import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Publication} from '../models/publication';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  httpOptions = {
    headers: new HttpHeaders({
  
      'Content-Type': 'application/json',
    }),
  };
   


   
  constructor(private httpClient: HttpClient) { }
  private apiServerUrl = environment.comMarketing;

  findAll(): Observable<any> {
    return this.httpClient.get<any>
  (`${environment.comMarketing}/Publication/allPublications`, this.httpOptions);
  }


  getAllPublications(): Observable<Publication[]> {
    return this.httpClient.get<[Publication]>(`${environment.comMarketing}/Publication/allPublications`);
 
  }

  addPublication(c: Publication ) {
    return this.httpClient.post<Publication>(`${environment.comMarketing}/Publication/add`, c, this.httpOptions);
  }

   updatePublication( e: Publication): Observable<Publication>{
    return this.httpClient.put<Publication>( 
      `${environment.comMarketing}/Publication/update-publication`,
      e , this.httpOptions);
  }
  
  public deletePublication(id: String): Observable<void> {
    return this.httpClient.delete<void>(`${environment.comMarketing}/Publication/delete/${id}`);
  }


  getPublicationById(id: String ): Observable<Publication>{
    return this.httpClient.get<Publication>(`${environment.comMarketing}/Publication/Publication-by-id/${id}`);
  }
  countPublications() {
    return this.httpClient.get<number>(`${environment.comMarketing}/Publication/count-Publications`,this.httpOptions);
  }

  findAllPublicationDesc(): Observable<[Publication]> {
    return this.httpClient.get<[Publication]>(`${environment.comMarketing}/Publication/descending`);
  }

  findAllPublicationAsc(): Observable<[Publication]> {
    return this.httpClient.get<[Publication]>(`${environment.comMarketing}/Publication/ascending`);
  }


  public cancelArchivePublication(p: Publication, id: string): Observable<Publication> {
    return this.httpClient.put<Publication>(
      `${environment.comMarketing}/Publication/cancelArchive-Publication/` + id,
      p, this.httpOptions);
  }

  public archivePublication(p: Publication, id: string): Observable<Publication> {
    return this.httpClient.put<Publication>(
      `${environment.comMarketing}/Publication/archive-Publication/` + id,
      p, this.httpOptions);
  }
  

}
