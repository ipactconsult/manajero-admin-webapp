import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CategorieDoc } from '../../models/CategorieDoc';

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
export class CategorieService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  constructor(private httpClient: HttpClient) {

  }
  getAllCategories(): Observable<[CategorieDoc]> {
    return this.httpClient.get<[CategorieDoc]>(`${environment.recoverydispute}categorie/all`);
  }
  addCategorie(c: CategorieDoc) {
    return this.httpClient.post<CategorieDoc>(`${environment.recoverydispute}categorie/add`, c, this.httpOptions);
  }

   updateCategorie(id:string ,categorie: CategorieDoc): Observable<CategorieDoc>{
    const path = `${environment.recoverydispute}categorie/update/` +id ;
    //@ts-ignore
    return this.httpClient.put<CategorieDoc>(path ,categorie , this.httpOptions);

  }
  
 deleteCategorie(categorie: CategorieDoc | string): Observable<string>{
    const id = typeof categorie === 'string' ? categorie : categorie.id;
    const url = `${environment.recoverydispute}categorie/delete/` + id;
    // @ts-ignore
   return this.httpClient.delete<string>(url, httpOptionsPlain);
  }
  getCategorieByid(id: string):Observable<CategorieDoc>{
    return this.httpClient.get<CategorieDoc>(`${environment.recoverydispute}categorie/findbyid/`+id  , this.httpOptions);
  }

  findAllCategorieAsc(): Observable<[CategorieDoc]> {
  return this.httpClient.get<[CategorieDoc]>(`${environment.recoverydispute}categorie/all/ascending`);
  }

  findAllCategorieDesc(): Observable<[CategorieDoc]> {
    return this.httpClient.get<[CategorieDoc]>(`${environment.recoverydispute}categorie/all/descending`);

  }

}
