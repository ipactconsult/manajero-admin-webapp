import { Component, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService, NbWindowService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { AddProjectCharterComponent } from "../add-project-charter/add-project-charter.component";
import { Router } from "@angular/router";
import { ProjectCharterService } from "../../../services/project-charter/project-charter.service";
import { ProjectCharter } from "../../../models/ProjectCharter";
import { DatePipe } from "@angular/common";
import { removeElementFromArray, truncate_with_ellipsis } from "../../../utils/reutilizable-function";
import { TokenStorageService } from "../../../../auth/service/token/token.service";
import { adminAccess, superAccess } from "../../../../auth/accessControle/accessControle";
@Component({
  selector: "ngx-project-charter-tablle",
  templateUrl: "./project-charter-tablle.component.html",
  styleUrls: ["./project-charter-tablle.component.scss"],
})
export class ProjectCharterTablleComponent implements OnInit {
  data: ProjectCharter[] = [];
  currentUser= null;
  selectedItem=null;
  refDialog=null;
  constructor(
    private windowService: NbWindowService,
    private router: Router,
    private projectCharterService: ProjectCharterService,
    private datePipe: DatePipe, private tokenStorageService: TokenStorageService,
    private dialogService: NbDialogService

  ) {}
  ngOnInit(): void {

    this.getData(false);
   
  }
getData(archived: boolean) {
  this.currentUser= this.tokenStorageService.getUser();
  if(!superAccess(this.currentUser))
  { this.projectCharterService.findAllProjectCharterByUser(archived,this.currentUser.email).subscribe((res) => {
    this.data = res;
  })}
  else if(adminAccess(this.currentUser)){
  this.projectCharterService.findAllProjectCharter(archived).subscribe((res) => {
    this.data = res;
  })}
}
  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
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
      statementWork: {
        title: "statement of Work",
        type: "html",

        valuePrepareFunction: (statementWork) => {
          return (statementWork!=null)&&truncate_with_ellipsis(statementWork);
        },
      },
      dateSubmited: {
        title: "Created at",
        type: "html",
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return `<i class="fas fa-calendar-alt text-success"></i>${this.datePipe.transform(raw, "dd MMM yyyy")}`;
        },
      },
      status: {
        title: "status",
        type: "html",
        
        valuePrepareFunction: (type) => {
          switch (type) {
            case "IN_PROGRESS": {
              return `<h5><span class="badge badge-warning">${type} </span></h5>`;
            }
            case "APPROVED": {
              return `<h5><span class="badge badge-success">${type} </span></h5>`;
            }
            case "DENIED": {
              return `<h5><span class="badge badge-danger">${type} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${type} </span></h5>`;
            }
          }
        },    
      },
    },
  };
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onArchive(event): void {
    
      this.projectCharterService.archiveProjectCharter(event.data.id).subscribe({
        next: (res: any) => {
          const result = removeElementFromArray(this.data, event.data.id);
          this.data = [];
          this.data = [...result];
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.refDialog.close();
        },
      });
    
  }
  onCreate(): void {
    this.windowService.open(AddProjectCharterComponent, {
      title: `Create Project Charter`,
    });
  }

  onUserRowSelect(event): void {
    this.router.navigate([
      "/projectManagement/project-charter-details/" + event.data.id,
    ]);
  }
  filtre(event) {
    event !== "Active"
      ? this.getData(true)
      : this.getData(false);
  }
}
