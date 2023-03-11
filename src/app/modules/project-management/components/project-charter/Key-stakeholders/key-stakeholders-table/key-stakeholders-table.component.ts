import { Component, OnInit, EventEmitter, Output, TemplateRef, Input } from "@angular/core";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";

import { Stakeholder } from "../../../../models/document/project/Stakeholder";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-key-stakeholders-table",
  templateUrl: "./key-stakeholders-table.component.html",
  styleUrls: ["./key-stakeholders-table.component.scss"],
})
export class KeyStakeholdersTableComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<ProjectCharter>();
  flippedState: boolean = false;
  selectedItem=null;
  stakeholderList: ProjectCharterDocument[] = [];
  @Input() data: ProjectCharter;
  //toster config
  config: NbToastrConfig;
  refDialog=null;
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
        title: "Name",
        type: "string",
      },
      description: {
        title: "Role",
        type: "string",
      },
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private projectCharterService: ProjectCharterService,

  ) {}

  ngOnInit(): void {
    this.stakeholderList= this.data?.keyStakeholder;
  }
  confirmation(event,dialog: TemplateRef<any>) {
    this.selectedItem=event;
    this.refDialog= this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }

  delete(event): void {
    
    this.data.keyStakeholder = removeElementFromArray(this.stakeholderList, event.data.id);
    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.stakeholderList = [];
        this.stakeholderList = this.data.keyStakeholder;
        this.refDialog.close();
      },
    });
     
    
  }
  onCreate() {
    this.selectedItem = null;
    this.flip();
  }
  onUserRowSelect(event): void {
    this.selectedItem = event.data;
    this.flip();
  }
  refresh(event: ProjectCharter): void {
    this.stakeholderList = [...event.keyStakeholder];
    this.data=event;
    this.dataChanged.emit(event);
    this.flip();
  }
}
