import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { ChangeRequest } from "../../../models/ChangeRequest";
import { ChangeRequestService } from "../../../services/changeRequest/change-request.service";
import { TokenStorageService } from "../../../../auth/service/token/token.service";
import { truncate_with_ellipsis } from "../../../utils/reutilizable-function";
import { superAccess } from "../../../../auth/accessControle/accessControle";
import { DatePipe } from "@angular/common";

@Component({
  selector: "ngx-change-request-table",
  templateUrl: "./change-request-table.component.html",
  styleUrls: ["./change-request-table.component.scss"],
})
export class ChangeRequestTableComponent implements OnInit {
  selectedItem = null;
  flippedState: boolean = false;
  refDialog = null;
  currentUser = null;
  enabled: boolean =false;
  @Input() disabled: boolean = false;

  accessControle: boolean = false;
  id: string = null;
  data: ChangeRequest[] = [];
  settings: any = {
    mode: "external",
    actions: { edit: false,delete: false},

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      changeType: {
        title: "Change Type",
        type: "html",
        valuePrepareFunction: (changeType) => {
          return `<h5><span class="badge badge-primary">${changeType} </span></h5>`;
        },
      },

      description: {
        title: "description",
        type: "string",
      },
      requestor: {
        title: "Requestor",
        type: "html",
        valuePrepareFunction: (requestor) => {
          return `<i class="fas fa-user-tie text-primary"></i> ${requestor.email}`;
        },
      },
      submittedDate: {
        title: "Submitted Date",
        type: "html",
        valuePrepareFunction: (startDate) => {
          const date = this.datepipe.transform(startDate, "yyyy-MM-dd ");
          return `<i class="fas fa-calendar-alt text-warning"></i> ${date}`;
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (status) => {
          switch (status) {
            case "IN_PROGRESS": {
              return `<h5><span class="badge badge-warning">${status} </span></h5>`;
            }
            case "APPROVED": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }
            case "DENIED": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${status} </span></h5>`;
            }
          }
        },
      },
      approvedDate: {
        title: "Approved Date",
        type: "html",
        valuePrepareFunction: (startDate) => {
          const date = this.datepipe.transform(startDate, "yyyy-MM-dd ");
          return `<i class="fas fa-calendar-alt text-success"></i> ${date}`;
        },
      },

      comment: {
        title: "Comment",
        type: "html",
        valuePrepareFunction: (comment) => {
          return comment !== null
            ? truncate_with_ellipsis(comment)
            : `<i  class="fas fa-comment-slash" ></i>No Comment`;
        },
      },
    },
  };
  constructor(
    private dialogService: NbDialogService,
    private changeRequestService: ChangeRequestService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    const currentUser = this.tokenStorageService.getUser();

    this.accessControle = superAccess(currentUser);
    if (this.accessControle  && !this.disabled) {
      this.settings.actions = true;
    }
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.currentUser = this.tokenStorageService.getUser();
    if (this.accessControle && !this.disabled) {
      this.enabled=true;
      this.getAllActive();
    } else {
      this.enabled=false;

      this.getAllRequestByUser(this.currentUser.email);
    }
  }
  getAllActive() {
    this.changeRequestService.findAllActiveChangeRequest(this.id).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getAllRequestByUser(email: string) {
    console.log(email);

    this.changeRequestService
      .findChangeRequestByUser(this.id, email)
      .subscribe({
        next: (result: any) => {
          this.data = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  getAllArchived() {
    this.changeRequestService.findAllArchivedChangeRequest(this.id).subscribe({
      next: (result: any) => {
        this.data = result || [];
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  create() {
    this.selectedItem = null;
    this.flippe();
  }
  flippe(): void {
    this.flippedState = !this.flippedState;
  }

  refresh(event: ChangeRequest) {
    const existed=this.data.filter(element => element.id === event.id)
if(existed.length===1)
    {this.data.forEach((element) => {
      if (element.id === event.id) {
        element = event;
      }
    });
    const array = this.data;
    this.data = [];
    this.data = [...array];
}
else{
  this.data.push(event);
  const array = this.data;
  this.data = [];
  this.data = [...array];
}
    this.flippe();
  }

  onUserRowSelect(event) {
    this.selectedItem = event.data;
    this.flippe();
  }

  filtre(event) {
    event !== "Active" ? this.getAllActive() : this.getAllArchived();
  }
}
