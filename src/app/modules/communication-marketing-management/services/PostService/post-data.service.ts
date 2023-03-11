import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PostData } from '../../models/post-data';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   
  private apiServerUrl = environment.comMarketing;

  constructor(private http: HttpClient){}

  findAll(): Observable<any> {
    return this.http.get<any>
  (`${this.apiServerUrl}/Parternership/all`, this.httpOptions);
  }


  public getPosts(): Observable<PostData[]> {
    return this.http.get<PostData[]>(`${this.apiServerUrl}/PostData/all`);

  }

  public addPost(p: PostData): Observable<PostData> {
  
    return this.http.post<PostData>(`${this.apiServerUrl}/PostData/add`, p ,  this.httpOptions) ;
  }

  public updatePost(p: PostData): Observable<PostData> {
    return this.http.put<PostData>(`${this.apiServerUrl}/PostData/update-Post`, p ,  this.httpOptions);
  }

  public deletePost(id : String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/PostData/delete/${id}`);
  }

  getPostById(id : String ): Observable<PostData>{
    return this.http.get<PostData>(`${environment.comMarketing}/PostData/Post-by-id/${id}`);
  }

  findAllPostDesc(): Observable<any> {
    return this.http.get<any>(`${environment.comMarketing}/PostData/descending`, this.httpOptions);
  }

  findAllPostAsc(): Observable<PostData[]> {
    return this.http.get<PostData[]>(`${environment.comMarketing}/PostData/ascending`);
  }

 



}
