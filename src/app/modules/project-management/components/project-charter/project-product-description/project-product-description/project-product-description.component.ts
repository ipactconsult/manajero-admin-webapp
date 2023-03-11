import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from "@angular/core";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
@Component({
  selector: "ngx-project-product-description",
  templateUrl: "./project-product-description.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./project-product-description.component.scss"],
})
export class ProjectProductDescriptionComponent implements OnInit {
  @Input() data: ProjectCharter;
  flippedState: boolean = false;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  selectedItem = null;
  refDialog = null;

  constructor(
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}
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
  flip(): void {
    this.flippedState = !this.flippedState;
  }
  confirmation(dialog: TemplateRef<any>) {
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  delete(): void {
    this.data.projectDescription = null;
    this.projectCharterService
      .updateProjectCharter(this.data)
      .subscribe((ch) => {
        this.showToast("success", "Success", "deleted successfully !");
        this.refreshData.emit(this.data);
        this.selectedItem=null;
        this.refDialog.close();
      });
  }
  updateProductDescription(): void {
    this.selectedItem = this.data.projectDescription;
    this.flip();
  }
  refresh(event:ProjectCharter) {
    
    this.data = event;
    this.refreshData.emit(event);
  }
}
