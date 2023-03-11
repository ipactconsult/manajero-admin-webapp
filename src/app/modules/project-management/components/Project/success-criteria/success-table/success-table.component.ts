import { Component, OnInit } from '@angular/core';
import { truncate_with_ellipsis } from '../../../../utils/reutilizable-function';

@Component({
  selector: 'ngx-success-table',
  templateUrl: './success-table.component.html',
  styleUrls: ['./success-table.component.scss']
})
export class SuccessTableComponent implements OnInit {
  selectedItem=null;
  flippedState: boolean=false;

  constructor() { }
  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      succesCriteria: {
        title: "Project success criteria",
        type: "html",
        valuePrepareFunction: (succesCriteria) => {
          return truncate_with_ellipsis(succesCriteria);
        },      },
      description: {
        title: "description",
        type: "html",
        valuePrepareFunction: (description) => {
          return truncate_with_ellipsis(description);
        },
      },
    },
  };
  ngOnInit(): void {
  }
  onCreate(): void {
    this.selectedItem=null;
    this.flip();
  }
  onUserRowSelect(event): void {
    
    this.selectedItem = event.data.succesCriteria;
    
    this.flip();
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
}
