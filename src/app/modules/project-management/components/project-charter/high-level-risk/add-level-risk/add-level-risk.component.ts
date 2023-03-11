import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
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
import { Risk } from "../../../../models/Risk";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { UpdateItem } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-add-level-risk",
  templateUrl: "./add-level-risk.component.html",
  styleUrls: ["./add-level-risk.component.scss"],
})
export class AddLevelRiskComponent implements OnChanges{
  createRiksForm: FormGroup;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input() projectCharter = null;
  @Input() selectedItem=null;
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
    this.createRiksForm = this.fb.group(formcontrols);
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
  initializeForm(name: string,description: string) {
    this.createRiksForm.setValue({
      name: name,
      description: description,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

    (changes?.selectedItem?.currentValue && changes.selectedItem !== undefined && changes.selectedItem.currentValue.data===undefined)
    ? (this.selectedItem = changes?.selectedItem?.currentValue ,
      this.initializeForm(
        this?.selectedItem.name,
        this?.selectedItem.description
      ))
    : this.initializeForm("", "");
  }

  get title() {
    return this.createRiksForm.get("name");
  }
  get description() {
    return this.createRiksForm.get("description");
  }
  save() {
    const data = this.createRiksForm.value;
    const highRisk = this.projectCharter?.highRisk;
    highRisk === null && (this.projectCharter.highRisk = []);
    let itemsUpdated = null;

    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(
          data,
          highRisk,
          this.selectedItem
        ),
        this.projectCharter.highRisk = itemsUpdated))
      : this.projectCharter.highRisk.push(data);

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
          this.showToast(
            "success",
            "Success",
            "Success"
          );
         this.createRiksForm.reset();
    
        },
      });
  }
}
