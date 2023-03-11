import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public user$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }
  
  socket = io(`${environment.socketServer}`);
  
  public connectNewUser(email) {
    this.socket.emit('new-user', email);
  }

  public getUser = () => {
    this.socket.on('new-user', name => {
      this.user$.next(`${name}`);
    });

    return this.user$.asObservable();
  }

  public disconnectUser() {
    this.socket.emit('disconnectUser');
  }

  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', data =>{
      this.message$.next(`${data.name} ${data.message}`);
    });
    
    return this.message$.asObservable();
  };
}
