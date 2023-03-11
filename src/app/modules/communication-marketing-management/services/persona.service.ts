import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Persona } from '../models/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   
  private apiServerUrl = environment.comMarketing;

  constructor(private http: HttpClient){}

  findAll(): Observable<any> {
    return this.http.get<any>
  (`${this.apiServerUrl}/Persona/allPersonas`, this.httpOptions);
  }


  public getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiServerUrl}/Persona/allPersonas`);

  }

  public addPersona(p: Persona): Observable<Persona> {
  
    return this.http.post<Persona>(`${this.apiServerUrl}/Persona/add`, p ,  this.httpOptions) ;
  }

  public updatePersona(p: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiServerUrl}/Persona/update-Persona`, p ,  this.httpOptions);
  }

  public deletePersona(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Persona/delete/${id}`);
  }

  public getPersonaById(id: string ): Observable<Persona>{
    return this.http.get<Persona>(`${environment.comMarketing}/Persona/Persona-by-id/${id}`);
  }


  public cancelArchivePersona(e: Persona, id: string): Observable<Persona> {
    return this.http.put<Persona>(
      `${environment.comMarketing}/Persona/cancelArchive-Persona/` + id,
      e, this.httpOptions);
  }

  public archivePersona(e: Persona, id: string): Observable<Persona> {
    return this.http.put<Persona>(
      `${environment.comMarketing}/Persona/archive-Persona/` + id,
      e, this.httpOptions);
  }



  findAllPartnerNomDesc(): Observable<Persona[]> {
    return this.http.get<[Persona]>(`${environment.comMarketing}/Persona/descending`);
  }

  findAllPartnerNomAsc(): Observable<Persona[]> {
    return this.http.get<[Persona]>(`${environment.comMarketing}/Persona/ascending`);
  }

  findAllPartnerPrenomDesc(): Observable<Persona[]> {
    return this.http.get<[Persona]>(`${environment.comMarketing}/Persona/descendingPrenom`);
  }

  findAllPartnerPrenomAsc(): Observable<Persona[]> {
    return this.http.get<[Persona]>(`${environment.comMarketing}/Persona/ascendingPrenom`);
  }



  public updateProduct(p, productId): Observable<any> {
    return this.http.put<any>(`${environment.stockUrl}/material/update-personnas/${productId} `, p ,  this.httpOptions);
  }



  public getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.stockUrl}/material/finished-products`);

  }

}
