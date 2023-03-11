import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
@Component({
  selector: "ngx-success-criteria-table",
  templateUrl: "./success-criteria-table.component.html",
  styleUrls: ["./success-criteria-table.component.scss"],
})
export class SuccessCriteriaTableComponent implements OnInit {
  @Input() data: ProjectCharter = null;
  selectedItem = null;
  refDialog = null;
  flippedState: boolean = false;
  dataTabel = [];
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

  ngOnInit(): void {
    this.data?.successCriteria?.forEach((succ) =>
      this.dataTabel.push({ succesCriteria: succ })
    );
  }
  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      succesCriteria: {
        title: "Project success criteria",
        type: "string",
      },
    },
  };
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {
    let newData: string[];
    newData = this.data.successCriteria.filter(
      (item) => item != event.data.succesCriteria
    );
    this.data.successCriteria = newData;

    this.projectCharterService
      .updateProjectCharter(this.data)
      .subscribe((ch) => {
        this.dataTabel = [];
        newData.forEach((item) =>
          this.dataTabel.push({ succesCriteria: item })
        );
        this.showToast("success", "Success", "Deleted successfully!");
        this.refDialog.close();
      });
  }
  onCreate(): void {
    this.selectedItem=null;
    this.flip();
  }
  onUserRowSelect(event): void {
    
    this.selectedItem = event.data.succesCriteria;
    
    this.flip();
  }
  refresh(event: ProjectCharter): void {
    // u can do better
    this.dataTabel = [];
    event?.successCriteria.forEach((succ) =>
      this.dataTabel.push({ succesCriteria: succ })
    );
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
}
