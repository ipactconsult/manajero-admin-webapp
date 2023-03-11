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
  selector: "ngx-add-delivery-unit",
  templateUrl: "./add-delivery-unit.component.html",
  styleUrls: ["./add-delivery-unit.component.scss"],
})
export class AddDeliveryUnitComponent implements OnChanges {
  createDeliveryUnitForm: FormGroup;
  @Input() projectCharter: ProjectCharter = null;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  @Input() selectedItem: ProjectCharterDocument = null;

  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService
  ) {
    const formcontrols = {
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    };
    this.createDeliveryUnitForm = this.fb.group(formcontrols);
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
  initializeForm(name: string, description: string) {
    this.createDeliveryUnitForm.setValue({
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
  //

  create() {
    const data = this.createDeliveryUnitForm.value;
    const dataDeliveryUnits = this.projectCharter.deliveryUnits;
    dataDeliveryUnits === null && (this.projectCharter.deliveryUnits = []);
    let itemsUpdated = null;
    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(
          data,
          dataDeliveryUnits,
          this.selectedItem
        ),
        this.projectCharter.deliveryUnits = itemsUpdated))
      : this.projectCharter.deliveryUnits.push(data);

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
          this.createDeliveryUnitForm.reset();
        },
      });
  }
}
