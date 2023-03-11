import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../../../../environments/environment"
import { Journallines } from '../../models/journallines.model';
import {Observable} from "rxjs";
import {Journal} from "../../models/journal.model";

@Injectable({
  providedIn: 'root'
})
export class JournallinesService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<[Journallines]> {
    return this.http.get<[Journallines]>(`${environment.accountingUrl}journalLines/journalslines`);
  }
  addJournalLine(data : Journallines){
    return this.http.post(`${environment.accountingUrl}journalLines/add`, data);
  }
  getAllByJournal(id : string){
    return this.http.get(`${environment.accountingUrl}journalLines/journalslines/`+id);
  }
  exportByPDF(id: string): Observable<[Journallines]>{
    return this.http.get<[Journallines]>(`${environment.accountingUrl}journalLines/topdf/`+id);
  }
}
