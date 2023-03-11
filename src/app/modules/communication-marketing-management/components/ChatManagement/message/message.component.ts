import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/service/auth.service';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { ChatMessage } from '../../../models/chat-message';

@Component({
  selector: 'ngx-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  public connectedUser;
  public userList;

  constructor(private authService: AuthService  ,  private tokenStorageService: TokenStorageService) {
    this.connectedUser = this.tokenStorageService.getUser();
    this.ownEmail = this.connectedUser.email;
    this.isOwnMessage = this.ownEmail === this.userEmail;

/*    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });*/

  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }

}
