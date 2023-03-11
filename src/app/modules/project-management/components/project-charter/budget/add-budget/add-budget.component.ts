import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Budget } from "../../../../models/document/Budget";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { UpdateItem } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-add-budget",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-budget.component.html",
  styleUrls: ["./add-budget.component.scss"],
})
export class AddBudgetComponent implements OnInit {
  BudgetForm: FormGroup;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input() projectCharter = null;
  @Input() selectedItem: Budget;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService
  ) {}
  ngOnInit(): void {
    const formcontrols = {
      area: new FormControl(this?.selectedItem?.area, [Validators.required]),
      amount: new FormControl(this?.selectedItem?.amount, [
        Validators.required,
      ]),
    };
    this.BudgetForm = this.fb.group(formcontrols);
  }

  get area() {
    return this.BudgetForm.get("area");
  }
  get amount() {
    return this.BudgetForm.get("amount");
  }

  create() {
    const data = this.BudgetForm.value;
    const budget: Budget[] = this.projectCharter.budget;
    budget === null && (this.projectCharter.budget = []);

    let itemsUpdated = null;

    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(data, budget, this.selectedItem)),
        (this.projectCharter.budget = itemsUpdated))
      : this.projectCharter.budget.push(data);

    this.projectCharterService
      .updateProjectCharter(this.projectCharter)
      .subscribe({
        next: (result: any) => {
          this.refreshData.emit(result);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.BudgetForm.reset();
        },
      });
  }
}
