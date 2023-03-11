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

import { ProjectCharterService } from "../../../../../services/project-charter/project-charter.service";
@Component({
  selector: 'ngx-create-update-milestone',
  templateUrl: './create-update-milestone.component.html',
  styleUrls: ['./create-update-milestone.component.scss']
})
export class CreateUpdateMilestoneComponent implements OnInit {

  createMileStonesForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    };
    this.createMileStonesForm = this.fb.group(formcontrols);
  }

  @Output() refreshData = new EventEmitter<ProjectCharterDocument[]>();
  @Input() projectCharter = null;
  @Input() mileStonesSelected: ProjectCharterDocument = null;
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

    (changes?.mileStonesSelected?.currentValue && changes.mileStonesSelected!=undefined)
      ?( 
      this.mileStonesSelected = changes?.mileStonesSelected.currentValue,
      this.initializeForm(
          this?.mileStonesSelected.name,
          this?.mileStonesSelected?.description
        ))
      : this.initializeForm("", "");
  }

  get name() {
    return this.createMileStonesForm.get("name");
  }
  get description() {
    return this.createMileStonesForm.get("description");
  }
  initializeForm(name: string, description: string) {
    this.createMileStonesForm.setValue({
      name: name,
      description: description,
    });
  }
  create() {
    const data = this.createMileStonesForm.value;
    console.log(this?.projectCharter);
    
    (this?.projectCharter?.mileStones === undefined) && (this.projectCharter.mileStones = []);

    (this.projectCharter.mileStones === null) && (this.projectCharter.mileStones = []);

    const mileStones = this.projectCharter?.mileStones;
    let index = null;
    this.mileStonesSelected == null
      ? this.projectCharter.mileStones.push(data)
      : (index = this.projectCharter.mileStones.findIndex(
          (g) =>
            g.name === this.mileStonesSelected.name &&
            g.description === this.mileStonesSelected.description
        ));

    this.projectCharter.mileStones[index] = data;
    this.projectCharterService
      .updateProjectCharter(this.projectCharter)
      .subscribe({
        next: (result: any) => {
          this.refreshData.emit(result.mileStones);
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
          this.createMileStonesForm.reset();
    
        },
      });
  }
}
