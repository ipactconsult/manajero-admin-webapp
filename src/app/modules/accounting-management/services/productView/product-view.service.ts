import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductViewService {

  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get(`https://pim-manazello-backend.herokuapp.com/material/all`);
  }
}
