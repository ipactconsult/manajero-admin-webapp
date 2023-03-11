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
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { UpdateItem } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-add-success-criteria",
  templateUrl: "./add-success-criteria.component.html",
  styleUrls: ["./add-success-criteria.component.scss"],
})
export class AddSuccessCriteriaComponent implements  OnChanges {
  createSuccessCriteriaForm: FormGroup;
  @Input() projectCharter: ProjectCharter;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Output() flip = new EventEmitter<ProjectCharter>();
  @Input() selectedItem=null;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      succesCriteria: new FormControl("", [Validators.required]),
    };
    this.createSuccessCriteriaForm = this.fb.group(formcontrols);
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
  initializeForm(criteria: string) {
    this.createSuccessCriteriaForm.setValue({
      succesCriteria: criteria,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    (changes?.selectedItem?.currentValue && changes.selectedItem!== undefined)
      ? (
      this.selectedItem = changes?.selectedItem.currentValue,

      this.initializeForm(this.selectedItem))
      : this.initializeForm("");
  }
 

  get succesCriteria() {
    return this.createSuccessCriteriaForm.get("succesCriteria");
  }
 
  save() {
    let index = 0;
    const data = this.createSuccessCriteriaForm.value;
    this.projectCharter.successCriteria === null && (this.projectCharter.successCriteria = []);
    const dataSuccesCriteria: string[] = this.projectCharter.successCriteria;


    this.selectedItem !== null
    ? (   index = dataSuccesCriteria.findIndex((unit) => unit === this.selectedItem),
    
      dataSuccesCriteria[index] = data.succesCriteria,
      this.projectCharter.successCriteria = dataSuccesCriteria)
    : this.projectCharter.successCriteria.push(data.succesCriteria);
    
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
          this.showToast("success", "Success", " successfully!");
          this.createSuccessCriteriaForm.reset();
        },
      });
  }
}
