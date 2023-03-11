import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  Like  } from '../models/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   
  private apiServerUrl = environment.comMarketing;

  constructor(private http: HttpClient){}

  findAll(): Observable<any> {
    return this.http.get<any>
  (`${this.apiServerUrl}/Comment/all`, this.httpOptions);
  }


  public getLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.apiServerUrl}/Like/all`);

  }

  public addLike(l: Like): Observable<Like> {
  
    return this.http.post<Like>(`${this.apiServerUrl}/Like/add`, l ,  this.httpOptions) ;
  }

    public dislike(id: String): Observable<void> {
    return this.http.delete<void>(`${environment.comMarketing}/Like/delete/${id}`);

  
  }




}
