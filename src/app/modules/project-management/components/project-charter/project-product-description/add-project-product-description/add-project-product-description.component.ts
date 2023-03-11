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
  selector: "ngx-add-project-product-description",
  templateUrl: "./add-project-product-description.component.html",
  styleUrls: ["./add-project-product-description.component.scss"],
})
export class AddProjectProductDescriptionComponent implements OnChanges{
  createDescriptionForm: FormGroup;
  @Input() projectCharter: ProjectCharter = null;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input () descriptionSelected=null;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      projectDescription: new FormControl("", [Validators.required]),
    };
    this.createDescriptionForm = this.fb.group(formcontrols);
  }
  ngOnChanges(changes: SimpleChanges): void {

   changes?.descriptionSelected &&
   (this.descriptionSelected = changes?.descriptionSelected.currentValue,
    
   this.initializeForm(
     this.descriptionSelected
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
  initializeForm(content: string) {

      this.createDescriptionForm.setValue({
        projectDescription: content,
      });
  
  }


  get ProjectDescription() {
    return this.createDescriptionForm.get("projectDescription");
  }

  save() {
    const data = this.createDescriptionForm.value;
    this.projectCharter.projectDescription = data?.projectDescription;
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
            "successfully!"
          );
         this.createDescriptionForm.reset();
        },
      });
  }
}
