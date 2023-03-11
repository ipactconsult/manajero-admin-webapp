import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from '../../../../auth/model/auth';
import { AuthService } from '../../../../auth/service/auth.service';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { ChatService } from '../../../services/chatService/chat.service';

@Component({
  selector: 'ngx-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(

    private modalService: NgbModal,
  
    private tokenStorageService: TokenStorageService,
    private authService: AuthService

  ) { }
  userList: Auth [] = [];
  search: string = '';
  public currentUser;
  public connectedUser;
  //public userList;
  public showScreen = true;
  ngOnInit(): void {
    this.connectedUser = this.tokenStorageService.getUser();
  
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });


  }

}
