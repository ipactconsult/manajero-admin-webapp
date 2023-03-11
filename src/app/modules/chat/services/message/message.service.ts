import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Message} from "../../models/message/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllMessages(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/message/all`, this.httpOptions);
  }

  addNewMessage(message: Message): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/message/add`, message, this.httpOptions);
  }

  updateConversation(message: Message, messageId: String): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/message/update/${messageId}`, message, this.httpOptions);
  }
}
