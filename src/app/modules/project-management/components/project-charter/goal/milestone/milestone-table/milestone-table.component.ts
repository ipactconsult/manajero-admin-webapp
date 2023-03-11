import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { ProjectCharterDocument } from "../../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../../services/project-charter/project-charter.service";
import { removeElementFromArray } from "../../../../../utils/reutilizable-function";

@Component({
  selector: 'ngx-milestone-table',
  templateUrl: './milestone-table.component.html',
  styleUrls: ['./milestone-table.component.scss']
})
export class MilestoneTableComponent implements OnInit {
  @Input() data: ProjectCharter;
  @Output() flipCard = new EventEmitter<boolean>();
  @Output() dataChanged = new EventEmitter<ProjectCharterDocument[]>();
  datatable: ProjectCharterDocument[];
  mileStonesSelected: ProjectCharterDocument = null;
  selectedItem = null;
  flippedState: boolean = false;
  refDialog = null;
  constructor(
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.datatable = this?.data?.mileStones;
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
      name: {
        title: "MilesStones",
        type: "string",
      },
      description: {
        title: "description",
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
    this.data.mileStones = removeElementFromArray(this.datatable, event.data.id);
    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.datatable = [];
        this.datatable = this.data.mileStones;
        this.dataChanged.emit( this.datatable);
        this.refDialog.close();
      },
    });
  }
  onCreate(): void {
    this.flippe();
  }
  flippe(): void {
    this.flippedState = !this.flippedState;
  }
  flipBack() {
    this.flippe();
    this.mileStonesSelected = null;
  }
  onUserRowSelect(event): void {
    this.mileStonesSelected = event.data;
    this.flippe();
  }
  refresh(event: ProjectCharterDocument[]): void {
    this.datatable = [];
    this.datatable = event;
    this.dataChanged.emit(event);
  }
}
