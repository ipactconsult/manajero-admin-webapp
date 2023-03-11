import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-budget-estimated-table',
  templateUrl: './budget-estimated-table.component.html',
  styleUrls: ['./budget-estimated-table.component.scss']
})
export class BudgetEstimatedTableComponent implements OnInit {
  @Input() budgetList;
  constructor() { }
  settings = {
    mode: "external",
    actions: { edit: false,delete: false,add: false},
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      area: {
        title: "Area",
        type: "string",
      },
      amount: {
        title: "Amount",
        type: "string",
      },
    },
  };
  ngOnInit(): void {
  }

}
