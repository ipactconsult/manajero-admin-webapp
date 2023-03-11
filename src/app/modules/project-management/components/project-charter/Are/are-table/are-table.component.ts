import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { Are } from "../../../../models/document/projectCharter/Are";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { AreService } from "../../../../services/are/are.service";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-are-table",
  templateUrl: "./are-table.component.html",
  styleUrls: ["./are-table.component.scss"],
})
export class AreTableComponent implements OnInit {
  @Input() data: ProjectCharter = null;
  @Output() dataChanged = new EventEmitter<ProjectCharter>();

  flippedState: boolean = false;
  dataTabel: Are[] = [];
  selectedItem = null;
  refDialog = null;
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
      category: {
        title: "Category",
        type: "string",
      },
      item: {
        title: "Item",
        type: "string",
      },
    },
  };
  constructor(
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.dataTabel = this.data?.are;
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {
    this.data.are = removeElementFromArray(this.data.are, event.data.id);

    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataTabel = [];
        this.dataTabel = this.data.are;
        this.refDialog.close();
      },
    });
  }
  onCreate(): void {
    this.selectedItem=null;
    this.flip();
  }

  onUserRowSelect(event): void {
    this.selectedItem= event.data;
    this.flip();
  }

  refresh(event:ProjectCharter): void {
    this.data.are = [...event.are];
    this.dataChanged.emit(this.data)
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
}
