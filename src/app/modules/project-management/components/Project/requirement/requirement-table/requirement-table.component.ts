import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { superAccess } from "../../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { Stakeholder } from "../../../../models/document/project/Stakeholder";
import { Project } from "../../../../models/Project";
import { Requirement } from "../../../../models/Requirement";
import { RequirementService } from "../../../../services/requirement/requirement.service";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-requirement-table",
  templateUrl: "./requirement-table.component.html",
  styleUrls: ["./requirement-table.component.scss"],
})
export class RequirementTableComponent implements OnInit {
  projectId: string;
  list = null;
  flippedState: boolean = false;
  refDialog = null;
  selectedItem = null;
  @Input() project: Project;
  stakeholderList: Stakeholder[];
currentUser= null;
@Input()disabled:boolean= false;

  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private dialogService: NbDialogService, private tokenStorageService : TokenStorageService
  ) {}
  settings :any = {
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
      deleteButtonContent: '<i class="nb-tables"></i>',
      confirmDelete: true,
    },
    columns: {
      description: {
        title: "Requirement Description",
        type: "string",
      },
      requestedBy: {
        title: "Requested By",
        type: "html",
        valuePrepareFunction: (requestedBy) => {
          return `<i class="fas fa-user-tie text-primary"></i> ${requestedBy.name}`;
        },
      },
      category: {
        title: "Category",
        type: "html",
        valuePrepareFunction: (category) => {
          return `<h5><span class="badge badge-primary">${category} </span></h5>`;
        },
      },
      priority: {
        title: "Priorty",
        type: "html",

        valuePrepareFunction: (priority) => {
          return `
          
          ${
            priority === "P3"
              ? '<h5><span class="badge badge-success">.    ' +
              priority +
                "   .</span></h5>"
              : priority === "P2"
              ? '<h5><span class="badge badge-warning">.    ' +
              priority +
                "   .</span></h5>"
              : '<h5><span class="badge badge-danger">.   ' +
              priority +
                "   .</span></h5>"
          }
          `;
        },
      },
      acceptedCriteria: {
        title: "Accepted Criteria",
        type: "html",
        valuePrepareFunction: (acceptedCriteria) => {
          return `<i class="fas fa-check text-primary"></i> ${acceptedCriteria}`;
        },
      },
    },
  };
  ngOnInit(): void {
    this.currentUser= this.tokenStorageService.getUser();
    if(!superAccess(this.currentUser)||this.disabled)
     {this.settings.actions=true;}
    this.stakeholderList = this?.project?.stakholders;

    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
      this.requirementService
        .findAllActiveRequirementByProject(this.projectId)
        .subscribe({
          next: (result: Requirement[]) => {
            this.list = result || [];
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    });
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;

    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onArchive(event) {

    event.data.archived= !event.data.archived
    
    this.requirementService.updateRequiremen(event.data).subscribe({
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
  getAllActiveRequirements() {
    this.requirementService
      .findAllActiveRequirementByProject(this.projectId)
      .subscribe({
        next: (result: Requirement[]) => {
          this.list = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getAllArchivedRequirements() {
    this.requirementService
      .findAllArchivedRequirementByProject(this.projectId)
      .subscribe({
        next: (result: Requirement[]) => {
          this.list = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  onUserRowSelect(event) {
    this.selectedItem = event.data;
    this.flippe();
  }

  flippe(): void {
    this.flippedState = !this.flippedState;
  }
  create() {
    this.selectedItem = null;
    this.flippe();
  }
  refresh(event: Requirement) {
    this.selectedItem != null &&
      (this.list = removeElementFromArray(this.list, this.selectedItem.id));
    this.list = [...this.list, event];
    this.flippe();
  }
  filtre(event) {
    event !== "Active"
      ? this.getAllArchivedRequirements()
      : this.getAllActiveRequirements();
  }
}
