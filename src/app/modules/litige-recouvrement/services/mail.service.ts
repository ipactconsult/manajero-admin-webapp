import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '../models/Mail';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MailService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  constructor(private httpClient: HttpClient) { }


  addMail(c: Mail) {
    return this.httpClient.post<Mail>(`${environment.recoverydispute}email/sendEmail`, c, this.httpOptions);
  }
}
