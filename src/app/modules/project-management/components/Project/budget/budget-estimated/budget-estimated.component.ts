import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../../../models/Project";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { ProjectService } from "../../../../services/project/project.service";

@Component({
  selector: "ngx-budget-estimated",
  templateUrl: "./budget-estimated.component.html",
  styleUrls: ["./budget-estimated.component.scss"],
})
export class BudgetEstimatedComponent implements OnInit {
  @Input() project: Project = null;
  projectCharter: ProjectCharter;
  budget: number = 0;
  enabled: boolean = false;
  @Output() budgetCaluclated = new EventEmitter<number>();

  constructor(private projectCharterService: ProjectCharterService) {}

  ngOnInit(): void {

    this.projectCharterService
      .findProjectCharterById(this.project.charter)
      .subscribe({
        next: (charter) => {
          this.projectCharter = charter;

        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.calculeStatics();
        },
      });
  }
  calculeStatics() {
    this?.projectCharter?.budget === null
      ? (this.budget = 0)
      : (this.budget = this?.projectCharter?.budget.reduce(
          (a, b) => a + b["amount"],
          0
        ));
        this.budgetCaluclated.emit(this.budget);
  }
  enableDetails(){
    this.enabled=!this.enabled;
  }

}
