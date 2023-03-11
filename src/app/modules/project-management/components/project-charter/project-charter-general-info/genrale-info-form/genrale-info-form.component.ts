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
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
@Component({
  selector: "ngx-genrale-info-form",
  templateUrl: "./genrale-info-form.component.html",
  styleUrls: ["./genrale-info-form.component.scss"],
})
export class GenraleInfoFormComponent implements OnChanges {
  generalInfoForm: FormGroup;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input() projectChart = null;
  @Input() statementWorkSelected: string = null;
  enableResetForm = false;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService
  ) {
    const formcontrols = {
      statementWork: new FormControl("", [Validators.required]),
    };
    this.generalInfoForm = this.fb.group(formcontrols);
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes?.statementWorkSelected &&
      ((this.statementWorkSelected =
        changes?.statementWorkSelected.currentValue),
      this.initializeForm(this?.statementWorkSelected));
  }
  initializeForm(content: string) {
    this.generalInfoForm.setValue({
      statementWork: content,
    });
  }

  get statementWork() {
    return this.generalInfoForm.get("statementWork");
  }
  create() {
    const data = this.generalInfoForm.value;
    this.projectChart.statementWork = data.statementWork;
    this.projectCharterService
      .updateProjectCharter(this.projectChart)
      .subscribe({
        next: (result: any) => {
          this.refreshData.emit(result);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.statementWorkSelected != null && this.generalInfoForm.reset();
        },
      });
  }
}
