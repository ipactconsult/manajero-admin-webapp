import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { superAccess } from "../../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { Stakeholder } from "../../../../models/document/project/Stakeholder";
import { Project } from "../../../../models/Project";
import { ProjectService } from "../../../../services/project/project.service";
import {
  removeElementFromArray,
  truncate_with_ellipsis,
} from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-stakeholder-table",
  templateUrl: "./stakeholder-table.component.html",
  styleUrls: ["./stakeholder-table.component.scss"],
})
export class StakeholderTableComponent implements OnInit {
  flippedState: boolean = false;
  selectedItem = null;
  refDialog = null;
  stakeholderList: Stakeholder[];
  currentUser = null;
  @Input() project: Project;
  @Output() dataChanged = new EventEmitter<Project>();

  settings: any = {
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
        type: "html",
        valuePrepareFunction: (name) => {
          return `<i class="fas fa-user-tie text-primary"></i> ${name}`;
        },
      },
      role: {
        title: "Role",
        type: "html",
        valuePrepareFunction: (role) => {
          return `<h5><span class="badge badge-primary">${role} </span></h5>`;
        },
      },
      businessUnit: {
        title: "Business Unit",
        type: "html",
        valuePrepareFunction: (businessUnit) => {
          return `<h5><span class="badge badge-primary">${businessUnit} </span></h5>`;
        },
      },

      engagementLevel: {
        title: "Engagement Level",
        type: "html",
        valuePrepareFunction: (engagementLevel) => {
          return `
          
          ${
            engagementLevel === "LOW"
              ? '<h5><span class="badge badge-success">.    ' +
                engagementLevel +
                "   .</span></h5>"
              : engagementLevel === "MEDIUM"
              ? '<h5><span class="badge badge-warning">.    ' +
                engagementLevel +
                "   .</span></h5>"
              : '<h5><span class="badge badge-danger">.   ' +
                engagementLevel +
                "   .</span></h5>"
          }
          `;
        },
      },
      note: {
        title: "Notes",
        type: "string",

        valuePrepareFunction: (note) => {
          return note !== null ? truncate_with_ellipsis(note) : "";
        },
      },
    },
  };
  @Input()disabled:boolean= false;

  constructor(
    private dialogService: NbDialogService,
    private projectService: ProjectService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    if (!superAccess(this.currentUser)||this.disabled) {
      this.settings.actions = true;
    }
    this.stakeholderList = this?.project?.stakholders;
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
    this.project.stakholders = removeElementFromArray(
      this.stakeholderList,
      event.data.id
    );
    this.projectService.updateProject(this.project).subscribe({
      next: (result: any) => {
        this.project = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.stakeholderList = [];
        this.stakeholderList = this.project.stakholders;
        this.refDialog.close();
      },
    });
  }
  onCreate() {
    this.selectedItem = null;
    this.flip();
  }
  onUserRowSelect(event): void {
    this.router.navigate([
      "/projectManagement/project-details/" + event.data.id,
    ]);
  }
  refresh(event: Stakeholder[]): void {
    this.stakeholderList = [];
    this.stakeholderList = [...event];
    this.project.stakholders = event;
    this.dataChanged.emit(this.project);
    this.flip();
  }
  filtre(event): void {}
}
