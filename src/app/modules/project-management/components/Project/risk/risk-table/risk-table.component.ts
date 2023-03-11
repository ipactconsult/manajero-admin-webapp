import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { superAccess } from "../../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { Risk } from "../../../../models/Risk";
import { RiskService } from "../../../../services/risk/risk.service";
import { truncate_with_ellipsis } from "../../../../utils/reutilizable-function";
import { HelpComponent } from "../help/help.component";

@Component({
  selector: "ngx-risk-table",
  templateUrl: "./risk-table.component.html",
  styleUrls: ["./risk-table.component.scss"],
})
export class RiskTableComponent implements OnInit {
  projectId: string;
  riskList: Risk[] = [];
  riskListfiltred: Risk[] = [];
  flippedState: boolean = false;
  refDialog = null;
  selectedItem = null;
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
      confirmEdit: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-tables"></i>',
      confirmDelete: true,
    },
    columns: {
      title: {
        title: "title",
        type: "html",
        valuePrepareFunction: (title) => {
          return `<i class="fas fa-bookmark text-primary"></i> ${title}`;
        },
      },

      description: {
        title: "Description",
        type: "string",

        valuePrepareFunction: (description) => {
          return description != null ? truncate_with_ellipsis(description) : "";
        },
      },
      category: {
        title: "Category",
        type: "html",
        valuePrepareFunction: (category) => {
          switch (category) {
            case "EXTERNAL": {
              return `<h5><span class="badge badge-warning">${category} </span></h5>`;
            }
            case "INTERNAL": {
              return `<h5><span class="badge badge-success">${category} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${category} </span></h5>`;
            }
          }
        },
      },
      probability: {
        title: "probability",
        type: "html",

        valuePrepareFunction: (probability) => {
          return `
          
          ${
            probability === "LOW"
              ? '<h5><span class="badge badge-success">.    ' +
                probability +
                "   .</span></h5>"
              : probability === "MEDIUM"
              ? '<h5><span class="badge badge-warning">.    ' +
                probability +
                "   .</span></h5>"
              : '<h5><span class="badge badge-danger">.   ' +
                probability +
                "   .</span></h5>"
          }
          `;
        },
      },

      impact: {
        title: "impact",
        type: "html",
        valuePrepareFunction: (impact) => {
          return `
          
          ${
            impact === "LOW"
              ? '<h5><span class="badge badge-success">.    ' +
                impact +
                "   .</span></h5>"
              : impact === "MEDIUM"
              ? '<h5><span class="badge badge-warning">.    ' +
                impact +
                "   .</span></h5>"
              : '<h5><span class="badge badge-danger">.   ' +
                impact +
                "   .</span></h5>"
          }
          `;
        },
      },
      severity: {
        title: "severity",
        type: "html",
        valuePrepareFunction: (severity) => {
          return `
          
          ${
            severity < 4
              ? '<h4><span class="badge badge-success">.    ' +
                severity +
                "   .</span></h4>"
              : severity > 4 && severity < 7
              ? '<h4><span class="badge badge-warning">.    ' +
                severity +
                "   .</span></h4>"
              : '<h4><span class="badge badge-danger">.   ' +
                severity +
                "   .</span></h4>"
          }
          `;
        },
      },
      responseStrategy: {
        title: "responseStrategy",
        type: "string",
        valuePrepareFunction: (responseStrategy) => {
          return responseStrategy !== null
            ? truncate_with_ellipsis(responseStrategy)
            : "";
        },
      },
    },
  };
  currentUser=null;
  @Input()disabled:boolean= false;
  constructor(
    private route: ActivatedRoute,
    private riskService: RiskService,
    private dialogService: NbDialogService, private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser= this.tokenStorageService.getUser();
  if(!superAccess(this.currentUser)||this.disabled)
   {this.settings.actions=true;}
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");

      this.riskService.findAllRiskByProject(this.projectId).subscribe({
        next: (result: Risk[]) => {
          this.riskList = result;
          this.getAllRiskFiltred(false);
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
    this.riskService.archiveRisk(event.data).subscribe({
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.riskListfiltred = [
          ...this.riskListfiltred.filter(
            (project) => project.id !== event.data.id
          ),
        ];
        this.refDialog.close();
      },
    });
  }
  create(event) {
    this.selectedItem = null;
    this.flippe();
  }
  flippe(): void {
    this.flippedState = !this.flippedState;
  }

  refresh(event: Risk) {
    if (this.riskList != null) {
      const objIndex = this.riskList.findIndex((obj) => obj.id === event.id);
      if (objIndex !== -1) {
        this.riskList[objIndex] = event;
      } else {
        this.riskList = [...this.riskList, event];
      }
     
    }
    else {
      this.riskList=[]
      this.riskList = [...this.riskList, event];
    }
    this.getAllRiskFiltred(false);
  }
  getAllRiskFiltred(state: boolean) {
    this.riskListfiltred = this?.riskList?.filter(
      (project) => project.archived === state
    );
  }

  onUserRowSelect(event) {
    this.selectedItem = event.data;
    this.flippe();
  }

  filtre(event) {
    event !== "Active"
      ? this.getAllRiskFiltred(true)
      : this.getAllRiskFiltred(false);
  }
  edit(event) {
    console.log(event.data);
  }
  openHelpDialog() {
    this.dialogService.open(HelpComponent, {});
  }
}
