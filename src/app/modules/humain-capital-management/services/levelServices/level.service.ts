import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Level} from "../../models/Level";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient : HttpClient) { }
  
  addLevel (level : Level){
    return this.httpclient.post<Level>(`${environment.employees_hcm}level/create`, level, this.httpOptions);
  }
  
  findAll(): Observable<[Level]> {
    return this.httpclient.get<[Level]>(`${environment.employees_hcm}level/all`);
  }
}
