import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/service/auth.service';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Auth } from '../../../../auth/model/auth';
@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  idE;
  Auth: Auth = new Auth();



  constructor(  private tokenStorageService: TokenStorageService,   private authService: AuthService ,
 

    private activatedroute: ActivatedRoute   ) {
  }

  userList: Auth [] = [];
  search: string = '';
  public currentUser;
  public connectedUser;
  //public userList;
  public showScreen = true;
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.authService.getUserById(this.idE).subscribe(data => {
      this.Auth = data;
      error => console.log(error);
    });


    this.connectedUser = this.tokenStorageService.getUser();
  
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });



  }

}
