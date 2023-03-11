import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { Budget } from "../../../../models/Budget";
import { Project } from "../../../../models/Project";
import { BudgetService } from "../../../../services/budget/budget.service";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-project-budget-table",
  templateUrl: "./project-budget-table.component.html",
  styleUrls: ["./project-budget-table.component.scss"],
})
export class ProjectBudgetTableComponent implements OnInit {
  @Input() project: Project;
  @Output() budgetChanged = new EventEmitter<number>();
  dataTabel: Budget[] = [];
  selectedItem = null;
  refDialog = null;
  budget: number = 0;
  flippedState: boolean = false;
  settings = {
    mode: "external",
    actions: { edit: false, delete: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      title: {
        title: "Title",
        type: "string",
      },
      amount: {
        title: "amount",
        type: "string",
      },
      notes: {
        title: "Notes",
        type: "string",
      },
      motif: {
        title: "Motif",
        type: "string",
      },
    },
  };
  constructor(
    private dialogService: NbDialogService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.budgetService.findAllBudget(this.project.id).subscribe({
      next: (result) => {
        console.log(result);

        this.dataTabel = result;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.calculeBudget();
      }
    });
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }

  onCreate(): void {
    this.selectedItem = null;
    this.flip();
  }
  calculeBudget() {

    this?.dataTabel === null
      ? (this.budget = 0)
      :         this.budget=0,
      this?.dataTabel?.forEach((element) => {
          this.budget += element.amount;

        });
        console.log(this.budget);
        
        this.budgetChanged.emit(this.budget);
  }
  onUserRowSelect(event): void {
    this.selectedItem = event.data;
    this.flip();
  }

  refresh(newItem: Budget): void {
    if (this?.dataTabel?.length > 0 && this.dataTabel !== null) {
      const result = removeElementFromArray(this.dataTabel, newItem.id);
      this.dataTabel = [];
      this.dataTabel = [...result, newItem];
      this.calculeBudget();

    } else {
      this.dataTabel = [];
      this.dataTabel = [...this.dataTabel, newItem];
      this.calculeBudget();

    }
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
}
