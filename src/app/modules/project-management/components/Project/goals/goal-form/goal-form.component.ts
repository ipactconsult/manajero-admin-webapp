import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Goal } from "../../../../models/Goal";
import { GoalService } from "../../../../services/goal/goal.service";
@Component({
  selector: "ngx-goal-form",
  templateUrl: "./goal-form.component.html",
  styleUrls: ["./goal-form.component.scss"],
})
export class GoalFormComponent implements OnInit {
  createGoalForm: FormGroup;
  projectId: string;
  goal:Goal;
  @Output() dataChanged = new EventEmitter<Goal>();
  @Input() selectedItem: Goal = null;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private goalService: GoalService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });
    const formcontrols = {
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      priority: new FormControl("", [Validators.required]),
      dueDate: new FormControl("", [Validators.required]),
      kpi: new FormControl("", [Validators.required]),

    };
    this.createGoalForm = this.fb.group(formcontrols);
  }
  get title() {
    return this.createGoalForm.get("title");
  }
  get description() {
    return this.createGoalForm.get("description");
  }

  get priority() {
    return this.createGoalForm.get("priority");
  }
  get dueDate() {
    return this.createGoalForm.get("dueDate");
  }
  get kpi() {
    return this.createGoalForm.get("kpi");
  }
  save() {
    const data = this.createGoalForm.value;

    data.project = {id:this.projectId};
    
    this.goalService.add(data).subscribe({
      next: (goal: Goal) => {
        this.goal = goal;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.goal);
      },
    });
  }
}
