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
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-add-problematic",
  templateUrl: "./add-problematic.component.html",
  styleUrls: ["./add-problematic.component.scss"],
})
export class AddProblematicComponent implements OnChanges {
  createProblematicForm: FormGroup;
  projectCharter: ProjectCharter;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input() projectChart = null;
  @Input() problematicSelected = null;

  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    };
    this.createProblematicForm = this.fb.group(formcontrols);
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes?.problematicSelected &&
      ((this.problematicSelected = changes?.problematicSelected.currentValue),
      this.initializeForm(
        this.problematicSelected?.name || "",
        this.problematicSelected?.description || ""
      ));
  }
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
  initializeForm(name: string, description: string) {
    this.createProblematicForm.setValue({
      name: name,
      description: description,
    });
  }
  get name() {
    return this.createProblematicForm.get("name");
  }
  get description() {
    return this.createProblematicForm.get("description");
  }

  create() {
    const data = this.createProblematicForm.value;
    this.projectChart.problematic = data;
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
          this.showToast(
            "success",
            "Success",
            "Background/Project purpose or justification added successfully!"
          );
          this.createProblematicForm.reset();
        },
      });
  }
}
