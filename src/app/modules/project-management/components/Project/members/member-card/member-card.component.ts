import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
enabled: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  enable()
  {this.enabled = !this.enabled ;}
}
