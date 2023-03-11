import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../models/Project';
import { ProjectService } from '../../../../services/project/project.service';

@Component({
  selector: 'ngx-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {
id: string;
project: Project;
resourceBudget=0;
estimatedBudget=0;
additionelBudget=0;

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.projectService.findProjectById(this.id).subscribe({
        next: (result: any) => {
          this.project = result;
          console.log(this.project);
          
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  })
}
refreshEstimated(event){
 this.estimatedBudget=event;
  
}
refreshResource(event){
  this.resourceBudget=event;
  
}
refreshAdditionel(event){
  this.additionelBudget=event;
  
}
}
