import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GraphicalCharter } from '../models/graphical-charter';

@Injectable({
  providedIn: 'root'
})
export class GraphicalCharterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   
  private apiServerUrl = environment.comMarketing;

  constructor(private http: HttpClient){}

  findAll(): Observable<any> {
    return this.http.get<any>
  (`${this.apiServerUrl}/graphicalCharter/allgraphicalCharters`, this.httpOptions);
  }


  public getGraphicalCharter(): Observable<GraphicalCharter[]> {
    return this.http.get<GraphicalCharter[]>(`${this.apiServerUrl}/graphicalCharter/allParternerships`);

  }

  public addGraphicalCharter(g: GraphicalCharter): Observable<GraphicalCharter> {
  
    return this.http.post<GraphicalCharter>(`${this.apiServerUrl}/graphicalCharter/add`, g ,  this.httpOptions) ;
  }

  public updateGraphicalCharter(g: GraphicalCharter): Observable<GraphicalCharter> {
    return this.http.put<GraphicalCharter>(`${this.apiServerUrl}/graphicalCharter/update-graphicalCharter`, g ,  this.httpOptions);
  }

  public deleteGraphicalCharter(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/graphicalCharter/delete/${id}`);
  }

  public getGraphicalCharterById(id: String ): Observable<GraphicalCharter>{
    return this.http.get<GraphicalCharter>(`${environment.comMarketing}/graphicalCharter/graphicalCharter-by-id/${id}`);
  }

}
