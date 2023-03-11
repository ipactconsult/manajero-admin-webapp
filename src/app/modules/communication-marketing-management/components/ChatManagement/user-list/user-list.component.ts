import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../../auth/model/auth';
import { AuthService } from '../../../../auth/service/auth.service';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { ChatService } from '../../../services/chatService/chat.service';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  {

  //users: User[];
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
}
