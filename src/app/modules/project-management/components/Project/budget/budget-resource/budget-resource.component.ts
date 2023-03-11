import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Project } from "../../../../models/Project";
import { ResourceService } from "../../../../services/resource/resource.service";

@Component({
  selector: "ngx-budget-resource",
  templateUrl: "./budget-resource.component.html",
  styleUrls: ["./budget-resource.component.scss"],
})
export class BudgetResourceComponent implements OnInit {
  @Input() project: Project;
  @Output() budgetCaluclated = new EventEmitter<number>();
  budget: number = 0;
  enabled:boolean=false;
  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    
    this.resourceService.calculateBudget(this.project.id).subscribe({
      next: (result) => {
        this.budget = result;
        this.budgetCaluclated.emit(result);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  enableDetails(){
    this.enabled=!this.enabled;
  }

}
