import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Project } from "../../../../models/Project";
import { BudgetService } from "../../../../services/budget/budget.service";

@Component({
  selector: "ngx-budget-additionel",
  templateUrl: "./budget-additionel.component.html",
  styleUrls: ["./budget-additionel.component.scss"],
})
export class BudgetAdditionelComponent implements OnInit {
  @Input() project: Project;
  enabled: boolean = false;
  budget: number = 0;
  @Output() budgetCaluclated = new EventEmitter<number>();

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.budgetService.calculate(this.project.id).subscribe({
      next: (result) => {
        this.budget = result;
        this.budgetCaluclated.emit(this.budget);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  enableDetails() {
    this.enabled = !this.enabled;
  }
  refresh(newBudget: number) {
    this.budget = newBudget;
    this.budgetCaluclated.emit(this.budget);

  }
}
