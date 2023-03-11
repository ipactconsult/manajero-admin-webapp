import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dossier } from '../models/Dossier';

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

export class DossierjuridiqueService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };


  
  
constructor(private httpClient: HttpClient) {

  }

  addDossier(d: Dossier) {
    return this.httpClient.post<Dossier>(`http://localhost:8083/dossier/add`, d, this.httpOptions);

  }
  updateDossier(id:string ,dossier: Dossier): Observable<Dossier>{
    const path = `http://localhost:8083/dossier/update/` +id ;
    //@ts-ignore
    return this.httpClient.put<Dossier>(path ,dossier , this.httpOptions);

  }
  getDossierById(id: string): Observable<Dossier> {
    return this.httpClient.get<Dossier>(`http://localhost:8083/dossier/findby/` + id);
  }
}
