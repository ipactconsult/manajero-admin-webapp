import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/service/token/token.service';

@Component({
  selector: 'ngx-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  user: any;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
        this.user = this.tokenStorageService.getUser();

  }
}
