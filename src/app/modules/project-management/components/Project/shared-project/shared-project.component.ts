import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Project } from "../../../models/Project";
import { ProjectService } from "../../../services/project/project.service";
import { truncate_with_ellipsis } from "../../../utils/reutilizable-function";
import { DatePipe } from "@angular/common";
import { TokenStorageService } from "../../../../auth/service/token/token.service";
import { superAccess } from "../../../../auth/accessControle/accessControle";

@Component({
  selector: "ngx-shared-project",
  templateUrl: "./shared-project.component.html",
  styleUrls: ["./shared-project.component.scss"],
})
export class SharedProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialogService: NbDialogService,
    private datepipe: DatePipe,
    private tokenStorageService: TokenStorageService
  ) {}
  list: Project[];
  currentUser = null;
  enabled: boolean = false;
  refDialog = null;
  selectedItem = null;
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    if (superAccess(this.currentUser)) {
      this.settings.actions = true;
    }
    this.getAllActiveProjects();
  }
  test = [
    { title: "External", value: "EXTERNAL" },
    { title: "Internal", value: "INTERNAL" },
  ];

  settings: any = {
    mode: "external",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-archive fa-sm"></i>',
      confirmDelete: true,
    },
    columns: {
      title: {
        title: "Title",
        type: "html",
        valuePrepareFunction: (title) => {
          return `<i class="fas fa-bookmark text-primary"></i> ${title}`;
        },
      },
      organization: {
        title: "Organization",
        type: "html",
        valuePrepareFunction: (organization) => {
          return `<i class="fas fa-building text-primary"></i> ${organization}`;
        },
      },
      manager: {
        title: "Manager",
        type: "html",
        valuePrepareFunction: (manager) => {
          return `<i class="fas fa-user-tie text-primary"></i> ${"JMAI Omar"}`;
        },
      },
      type: {
        title: "Category",
        type: "html",
        valuePrepareFunction: (type) => {
          switch (type) {
            case "EXTERNAL": {
              return `<h5><span class="badge badge-warning">${type} </span></h5>`;
            }
            case "INTERNAL": {
              return `<h5><span class="badge badge-success">${type} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${type} </span></h5>`;
            }
          }
        },
      },
      startDate: {
        title: "Start Date",
        type: "html",
        valuePrepareFunction: (startDate) => {
          const date = this.datepipe.transform(startDate, "yyyy-MM-dd ");
          return `<i class="fas fa-calendar-alt text-success"></i> ${date}`;
        },
      },
      endDate: {
        title: "End Date",
        type: "html",
        valuePrepareFunction: (endDate) => {
          const date = this.datepipe.transform(endDate, "yyyy-MM-dd ");
          return `<i class="fas fa-calendar-alt text-danger"></i> ${date}`;
        },
      },
      description: {
        title: "description",
        type: "string",
        valuePrepareFunction: (description) => {
          return description != null && truncate_with_ellipsis(description);
        },
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  displayDeteails(event): void {
    this.router.navigate([
      "/projectManagement/sharedProjectDetails/" + event.data.id,
    ]);
  }
  onUserRowSelect(event): void {
    this.router.navigate([
      "/projectManagement/sharedProjectDetails/" + event.data.id,
    ]);
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;

    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }

  onArchive(event) {
    event.data.archived = !event.data.archived;

    this.projectService.updateProject(event.data).subscribe({
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.list = [
          ...this.list.filter((project) => project.id !== event.data.id),
        ];
        this.refDialog.close();
      },
    });
  }

  getAllActiveProjects() {
    this.currentUser = this.tokenStorageService.getUser();

    this.projectService.findProjectByMember(this.currentUser.email).subscribe({
      next: (result: any) => {
        this.list = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
