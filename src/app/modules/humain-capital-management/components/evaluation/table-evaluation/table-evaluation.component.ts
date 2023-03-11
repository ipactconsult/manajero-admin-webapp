import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table-evaluation',
  templateUrl: './table-evaluation.component.html',
  styleUrls: ['./table-evaluation.component.scss']
})
export class TableEvaluationComponent implements OnInit {

  searchbyfields : string ="";
  constructor() { }

  ngOnInit(): void {
  }

}
