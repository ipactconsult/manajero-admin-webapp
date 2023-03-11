import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../../auth/model/auth';
import { AuthService } from '../../../../auth/service/auth.service';
import { TokenStorageService } from '../../../../auth/service/token/token.service';

@Component({
  selector: 'ngx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  //user: Observable<firebase.User>;
  userEmail: string;
  userName: Observable<string>;
userList: Auth [] = [];
search: string = '';
public currentUser;
public connectedUser;

  constructor(private authService: AuthService , private tokenStorageService: TokenStorageService ) { }

  ngOnInit() {
    this.connectedUser = this.tokenStorageService.getUser();
  
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;
      this.userEmail =  this.connectedUser.email;
  
    });

}
}