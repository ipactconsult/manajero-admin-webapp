import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  text:string="hello";
  constructor() { }

  ngOnInit(): void {
  }

}
