import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Category} from "../../models/category/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllCategories(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/category/all`, this.httpOptions);
  }
  
  getAllCategoriesASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/category/all/asc`, this.httpOptions);
  }
  
  getAllCategoriesDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/category/all/desc`, this.httpOptions);
  }

  getAllCategoriesASCRef(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/category/all/ref/asc`, this.httpOptions);
  }

  getAllCategoriesDESCRef(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/category/all/ref/desc`, this.httpOptions);
  }

  getOneCategory(categoryId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/category/show/${categoryId}`, this.httpOptions);
  }

  addNewCategory(category: Category): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/category/create`, category, this.httpOptions);
  }

  archiveCategory(categoryId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/category/archive/${categoryId}`, this.httpOptions);
  }
  
  restoreCategory(categoryId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/category/restore/${categoryId}`, this.httpOptions);
  }
  
}
