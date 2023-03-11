import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/token/token.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
        this.user = this.tokenStorageService.getUser();

  }

}
