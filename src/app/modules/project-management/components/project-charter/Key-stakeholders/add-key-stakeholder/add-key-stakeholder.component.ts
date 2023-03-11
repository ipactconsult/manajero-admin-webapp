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
import { ActivatedRoute } from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { StakeholderService } from "../../../../services/stakeholder/stakeholder.service";
import { UpdateItem } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-add-key-stakeholder",
  templateUrl: "./add-key-stakeholder.component.html",
  styleUrls: ["./add-key-stakeholder.component.scss"],
})
export class AddKeyStakeholderComponent implements OnChanges {
  createStakeholderForm: FormGroup;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input() projectCharter = null;
  @Input() selectedItem = null;
  idprojecCharter: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    };
    this.createStakeholderForm = this.fb.group(formcontrols);
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes?.selectedItem?.currentValue &&
    changes.selectedItem !== undefined &&
    changes.selectedItem.currentValue.data === undefined
      ? ((this.selectedItem = changes?.selectedItem?.currentValue),
        this.initializeForm(
          this?.selectedItem.name,
          this?.selectedItem.description
        ))
      : this.initializeForm("", "");
  }
  initializeForm(name: string, description: string) {
    this.createStakeholderForm.setValue({
      name: name,
      description: description,
    });
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

  get title() {
    return this.createStakeholderForm.get("name");
  }
  get description() {
    return this.createStakeholderForm.get("description");
  }
  save() {
    const data = this.createStakeholderForm.value;
    const keyStakeholder = this.projectCharter?.keyStakeholder;
    keyStakeholder === null && (this.projectCharter.keyStakeholder = []);

    let itemsUpdated = null;
    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(data, keyStakeholder, this.selectedItem)),
        (this.projectCharter.keyStakeholder = itemsUpdated))
      : this.projectCharter.keyStakeholder.push(data);

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
          this.showToast("success", "Success", "Success");
          this.createStakeholderForm.reset();
        },
      });
  }
}
