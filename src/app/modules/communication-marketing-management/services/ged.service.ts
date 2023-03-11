import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Ged } from '../models/ged';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GedService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   
  private apiServerUrl = environment.comMarketing;

  constructor(private http: HttpClient){}

  findAll(): Observable<any> {
    return this.http.get<any>
  (`${this.apiServerUrl}/GED/allGEDs`, this.httpOptions);
  }


  public getGEDs(): Observable<Ged[]> {
    return this.http.get<Ged[]>(`${this.apiServerUrl}/GED/allGEDs`);

  }

  public addGED(ged: Ged): Observable<Ged> {
    console.log(ged);
    
    debugger
    return this.http.post<Ged>(`${this.apiServerUrl}/GED/add`, ged);
  }

  public updateGED(ged: Ged): Observable<Ged> {
    return this.http.put<Ged>(`${this.apiServerUrl}/GED/update-GED`, ged);
  }

  public deleteGED(id: String): Observable<any> {
    return this.http.delete<any>(`${environment.comMarketing}/GED/delete/${id}`, this.httpOptions);
  }

  getGedById(id: String ): Observable<Ged>{
    return this.http.get<Ged>(`${environment.comMarketing}/GED/GED-by-id/${id}`);
  }



  public cancelArchiveGED(e: Ged, id: string): Observable<Ged> {
    return this.http.put<Ged>(
      `${environment.comMarketing}/GED/cancelArchive-GED/` + id,
      e, this.httpOptions);
  }

  public archiveGED(e: Ged, id: string): Observable<Ged> {
    return this.http.put<Ged>(
      `${environment.comMarketing}/GED/archive-GED/` + id,
      e, this.httpOptions);
  }

}
