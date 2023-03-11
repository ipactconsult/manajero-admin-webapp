import { Component, OnInit } from '@angular/core';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;

}
@Component({
  selector: 'ngx-help-action-plan',
  templateUrl: './help-action-plan.component.html',
  styleUrls: ['./help-action-plan.component.scss']
})
export class HelpActionPlanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  customColumn = 'name';
  allColumns = [ this.customColumn ];

  data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Goals' },
      children: [
        { data: { name: 'Activity'}, 
        children: [
          { data: { name: 'Team'} },
          { data: { name: 'Resource'} },
        
    ] },
       
      
  ]
}
    ]
}
