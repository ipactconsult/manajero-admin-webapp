import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Comment } from '../models/Comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

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


  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiServerUrl}/Comment/all`);

  }

  public addComment(c: Comment): Observable<Comment> {
  
    return this.http.post<Comment>(`${this.apiServerUrl}/Comment/add`, c ,  this.httpOptions) ;
  }

  public updateComment(c: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiServerUrl}/Comment/update-comment`, c ,  this.httpOptions);
  }

  public  getCommentById(id : String ): Observable<Comment>{
    return this.http.get<Comment>(`${environment.comMarketing}/Comment/Comment-by-id/${id}`);
  }


  public deleteComment(id: String): Observable<void> {
    return this.http.delete<void>(`${environment.comMarketing}/Comment/delete/${id}`);

  
  }


  /*public deleteParternership(id: String): Observable<void> {
    return this.http.delete<void>(`${environment.comMarketing}/Parternership/delete/${id}`);

  
  }

  getPartnerById(id : String ): Observable<Parternership>{
    return this.http.get<Parternership>(`${environment.comMarketing}/Parternership/idParternership-by-id/${id}`);
  }

  findAllPartnerDesc(): Observable<Parternership[]> {
    return this.http.get<[Parternership]>(`${environment.comMarketing}/Parternership/descending`);
  }

  findAllPartnerAsc(): Observable<Parternership[]> {
    return this.http.get<[Parternership]>(`${environment.comMarketing}/Parternership/ascending`);
  }

 */

  
}
