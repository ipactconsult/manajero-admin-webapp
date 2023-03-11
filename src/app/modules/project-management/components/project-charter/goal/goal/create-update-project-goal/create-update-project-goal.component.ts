import {
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
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { ProjectCharterDocument } from "../../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../../models/ProjectCharter";

import { ProjectCharterService } from "../../../../../services/project-charter/project-charter.service";
@Component({
  selector: "ngx-create-update-project-goal",
  templateUrl: "./create-update-project-goal.component.html",
  styleUrls: ["./create-update-project-goal.component.scss"],
})
export class CreateUpdateProjectGoalComponent implements OnInit, OnChanges {
  createGoalForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    };
    this.createGoalForm = this.fb.group(formcontrols);
  }

  @Output() refreshData = new EventEmitter<ProjectCharterDocument[]>();
  @Input() projectCharter = null;
  @Input() goalSelected: ProjectCharterDocument = null;
  initialData: ProjectCharterDocument;
  //toster config
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }
  //
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {

    (changes?.goalSelected?.currentValue && changes.goalSelected!=undefined)
      ?( 
      this.goalSelected = changes?.goalSelected.currentValue,
      this.initializeForm(
          this?.goalSelected.name,
          this?.goalSelected?.description
        ))
      : this.initializeForm("", "");
  }

  get name() {
    return this.createGoalForm.get("name");
  }
  get description() {
    return this.createGoalForm.get("description");
  }
  initializeForm(name: string, description: string) {
    this.createGoalForm.setValue({
      name: name,
      description: description,
    });
  }
  create() {
    const data = this.createGoalForm.value;
    const goals = this.projectCharter.goal;
    let index = null;
    goals === null && (this.projectCharter.goal = []);
    this.goalSelected == null
      ? this.projectCharter.goal.push(data)
      : (index = this.projectCharter.goal.findIndex(
          (g) =>
            g.name === this.goalSelected.name &&
            g.description === this.goalSelected.description
        ));

    this.projectCharter.goal[index] = data;
    this.projectCharterService
      .updateProjectCharter(this.projectCharter)
      .subscribe({
        next: (result: any) => {
          this.refreshData.emit(result.goal);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.showToast(
            "success",
            "Success",
            "Success"
          );
          this.createGoalForm.reset();
    
        },
      });
  }
}
