import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventMarketing } from '../models/event-marketing';

@Injectable({
  providedIn: 'root'
})
export class EventMarketingService {

  httpOptions = {
    headers: new HttpHeaders({
  
      'Content-Type': 'application/json',
    }),
  };
   


   
  constructor(private httpClient: HttpClient) { }
  private apiServerUrl = environment.comMarketing;

  findAll(): Observable<any> {
    return this.httpClient.get<any>
  (`${environment.comMarketing}/Event/allEvents`, this.httpOptions);
  }


  getAllEvents(): Observable<EventMarketing[]> {
    return this.httpClient.get<[EventMarketing]>(`${environment.comMarketing}/Event/allEvents`);
 
  }

  addEvent(c: EventMarketing ) {
    return this.httpClient.post<EventMarketing>(`${environment.comMarketing}/Event/add`, c, this.httpOptions);
  }

   updateEvent( e: EventMarketing): Observable<EventMarketing>{
    return this.httpClient.put<EventMarketing>( 
      `${environment.comMarketing}/Event/update-event`,
      e , this.httpOptions);
  }
  
  public deleteEvent(id: String): Observable<void> {
    return this.httpClient.delete<void>(`${environment.comMarketing}/Event/delete/${id}`);
  }


  getEventById(id: String ): Observable<EventMarketing>{
    return this.httpClient.get<EventMarketing>(`${environment.comMarketing}/Event/Event-by-id/${id}`);
  }
  countEvents() {
    return this.httpClient.get<number>(`${environment.comMarketing}/Event/count-Events`,this.httpOptions);
  }

  
  findAllEventDesc(): Observable<[EventMarketing]> {
    return this.httpClient.get<[EventMarketing]>(`${environment.comMarketing}/Event/descending`);
  }

  findAllEventAsc(): Observable<[EventMarketing]> {
    return this.httpClient.get<[EventMarketing]>(`${environment.comMarketing}/Event/ascending`);
  }


  cancelArchiveEvent(e: EventMarketing, id: string): Observable<EventMarketing> {
    return this.httpClient.put<EventMarketing>(
      `${environment.comMarketing}/Event/cancelArchive-Event/` + id,
      e, this.httpOptions);
  }

  archiveEvent(e: EventMarketing, id: string): Observable<EventMarketing> {
    return this.httpClient.put<EventMarketing>(
      `${environment.comMarketing}/Event/archive-Event/` + id,
      e, this.httpOptions);
  }


}
