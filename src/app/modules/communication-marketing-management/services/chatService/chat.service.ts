import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Auth } from '../../../auth/model/auth';
import { AuthService } from '../../../auth/service/auth.service';
import { TokenStorageService } from '../../../auth/service/token/token.service';
import {ChatMessage} from './../../models/chat-message';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

/*
  private socket: Socket;
  private url = 'http://localhost:3000'; // your server local path

  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  sendMessage(data): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
  }*/


/*
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
 
private apiServerUrl = environment.comMarketing;
chatMessage : ChatMessage = new ChatMessage();

chatMessages: Observable<ChatMessage[]>;

userName: Observable<string>;
userList: Auth [] = [];
search: string = '';
public currentUser;
public connectedUser;
constructor(
    private authService: AuthService , private tokenStorageService: TokenStorageService , private http: HttpClient
  ) {
    this.connectedUser = this.tokenStorageService.getUser();
  
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;
  
    });
    
  }

getUser() {
  this.connectedUser = this.tokenStorageService.getUser();
}

getUsers() {
  this.connectedUser = this.tokenStorageService.getUser();
  
  this.authService.getAllUsers().subscribe((data: Auth[]) => {
    this.userList = data;

  });
 
}

sendMessage(c : ChatMessage ) {
  this.connectedUser = this.tokenStorageService.getUser();
  const timestamp = this.getTimeStamp();
  const email = this.connectedUser.email;
  this.chatMessages = this.getMessages();
  this.chatMessage.userName = this.connectedUser.name; 
  this.chatMessage.email = this.connectedUser.email; 
  
  return this.http.post<ChatMessage>(`${environment.comMarketing}/message/add`, c, this.httpOptions);
 }

getMessages(): Observable<ChatMessage[]> {
  return this.http.get<[ChatMessage]>(`${environment.comMarketing}/message/all`);

}

getTimeStamp() {
  const now = new Date();
  const date = now.getUTCFullYear() + '/' +
               (now.getUTCMonth() + 1) + '/' +
               now.getUTCDate();
  const time = now.getUTCHours() + ':' +
               now.getUTCMinutes() + ':' +
               now.getUTCSeconds();

  return (date + ' ' + time);
}


*/




}
