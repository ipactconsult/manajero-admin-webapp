import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment"
import { HttpClient } from '@angular/common/http';
import {Journal} from "../../models/journal.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) { }
  
  
  getAll() {
    return this.http.get(`${environment.accountingUrl}journal/journals`);
  }
  findAllJournalDesc(): Observable<[Journal]> {
    return this.http.get<[Journal]>(`${environment.accountingUrl}journal/journals/descending`);
  }
  findAllJournalAsc(): Observable<[Journal]> {
    return this.http.get<[Journal]>(`${environment.accountingUrl}journal/journals/ascending`);
  }
  addJournal(j: Journal) {
    return this.http.post<Journal>(`${environment.accountingUrl}journal/add`, j);
  }
  getJournalId(id: string):Observable<any>{
    return this.http.get<Journal>(`${environment.accountingUrl}journal/journal/`+id);
  }
  archiveJournal(id: string){
    return this.http.put(`${environment.accountingUrl}journal/archiver/`+id, null);
  }
}
