import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilesProofService {

  constructor(private http: HttpClient) { }

  getAllTitles() {
    return this.http.get(`${environment.accountingUrl}filesproof/filesproofs`);
  }
}
