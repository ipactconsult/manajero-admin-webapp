import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProjectService } from "../../../../services/project/project.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Project } from "../../../../models/Project";
import { UpdateItem } from "../../../../utils/reutilizable-function";
import { Stakeholder } from "../../../../models/document/project/Stakeholder";
@Component({
  selector: "ngx-stakeholder-form",
  templateUrl: "./stakeholder-form.component.html",
  styleUrls: ["./stakeholder-form.component.scss"],
})
export class StakeholderFormComponent implements OnInit {
  createStakeholderForm: FormGroup;
  @Output () refreshData= new EventEmitter<Stakeholder[]>();
  @Input() selectedItem = null;
  @Input() project :Project;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    console.log(this?.selectedItem);

    const formcontrols = {
      name: new FormControl(this?.selectedItem?.name, [Validators.required]),
      role: new FormControl(this?.selectedItem?.role, [Validators.required]),
      businessUnit: new FormControl(this?.selectedItem?.businessUnit, [Validators.required]),
      engagementLevel: new FormControl(this?.selectedItem?.engagementLevel, [Validators.required]),
      note: new FormControl(this?.selectedItem?.note, [Validators.required]),
    };
    this.createStakeholderForm = this.fb.group(formcontrols);
  }
  get name() {
    return this.createStakeholderForm.get("name");
  }
  get role() {
    return this.createStakeholderForm.get("role");
  }
  get businessUnit() {
    return this.createStakeholderForm.get("businessUnit");
  }
  get engagementLevel() {
    return this.createStakeholderForm.get("engagementLevel");
  }
  get note() {
    return this.createStakeholderForm.get("note");
  }
  save() {
    const data = this.createStakeholderForm.value;
    const stakholders = this.project?.stakholders;
    stakholders === null && (this.project.stakholders = []);

    let itemsUpdated = null;
    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(data, stakholders, this.selectedItem)),
        (this.project.stakholders = itemsUpdated))
      : this.project.stakholders.push(data);

    this.projectService
      .updateProject(this.project)
      .subscribe({
        next: (result: Project) => {
          this.refreshData.emit(result.stakholders);        
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {      
          this.createStakeholderForm.reset();
        },
      });
  }
}
