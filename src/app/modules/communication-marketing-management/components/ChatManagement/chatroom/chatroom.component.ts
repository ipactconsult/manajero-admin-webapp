import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../../../../auth/model/auth';
import { AuthService } from '../../../../auth/service/auth.service';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { ChatService } from '../../../services/chatService/chat.service';

@Component({
  selector: 'ngx-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  @ViewChild('scroller') private feedContainer: ElementRef;
  public currentUser;
  public connectedUser;
  public userList;

  constructor(chat: ChatService  , private authService: AuthService , private tokenStorageService: TokenStorageService) { 

    this.connectedUser = this.tokenStorageService.getUser();
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });
    console.log("connectedUser id ",   this.connectedUser.id);
  }
  

  ngOnInit() {
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

}
