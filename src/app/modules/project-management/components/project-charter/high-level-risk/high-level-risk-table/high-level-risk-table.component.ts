import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  TemplateRef,
  Input,
} from "@angular/core";
import { Risk } from "../../../../models/Risk";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-high-level-risk-table",
  templateUrl: "./high-level-risk-table.component.html",
  styleUrls: ["./high-level-risk-table.component.scss"],
})
export class HighLevelRiskTableComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<ProjectCharter>();
  @Input() data: ProjectCharter;
  flippedState: boolean = false;
  riksList: ProjectCharterDocument[] = [];
  //toster config
  config: NbToastrConfig;
  selectedItem = null;
  refDialog = null;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  id: string;
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
      name: {
        title: "Risk",
        type: "string",
      },
      description: {
        title: "Possible impacts on the project",
        type: "string",
      },
    },
  };

  constructor(
    private toastrService: NbToastrService,
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.riksList = this.data?.highRisk;
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
  delete(event): void {
    this.data.highRisk = removeElementFromArray(this.riksList, event.data.id);
    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.riksList = [];
        this.riksList = this.data.highRisk;
        this.refDialog.close();
      },
    });
  }
  onUserRowSelect(event): void {
    this.selectedItem = event.data;
    this.flip();
  }
  onCreate() {
    this.selectedItem =null;
    this.flip();
  }
  refresh(event: ProjectCharter): void {    
    this.riksList = [...event.highRisk];
    this.data= event;
    this.dataChanged.emit(event);
    this.flip();
  }
}
