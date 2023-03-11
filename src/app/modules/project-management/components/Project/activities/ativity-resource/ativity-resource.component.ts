import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ativity-resource',
  templateUrl: './ativity-resource.component.html',
  styleUrls: ['./ativity-resource.component.scss']
})
export class AtivityResourceComponent implements OnInit {
@Input() selectedItem;
  constructor() { }

  ngOnInit(): void {
  }

}
