import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Goal } from "../../../../models/Goal";
import { GoalService } from "../../../../services/goal/goal.service";
import { truncate_with_ellipsis } from "../../../../utils/reutilizable-function";
import { DatePipe } from "@angular/common";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { superAccess } from "../../../../../auth/accessControle/accessControle";

@Component({
  selector: "ngx-goals-table",
  templateUrl: "./goals-table.component.html",
  styleUrls: ["./goals-table.component.scss"],
})
export class GoalsTableComponent implements OnInit {
  projectId: string;
  goalList: Goal[] = [];
  currentUser=null;
  @Input()disabled:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private goalService: GoalService,
    private dialogService: NbDialogService, private tokenStorageService : TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser= this.tokenStorageService.getUser();
    
    if(!superAccess(this.currentUser)||this.disabled)
     {this.settings.actions=true;}
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");

      this.goalService.findAllByProject(this.projectId).subscribe({
        next: (result: Goal[]) => {
          this.goalList = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }
  goalSelected = null;
  selectedItem = null;
  flippedState: boolean = false;
  refDialog = null;
  enableActionPlanProcess: boolean = false;
  enableActionPlanDetails: boolean = false;

  settings:any = {
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
      title: {
        title: "Goal",
        type: "html",
        valuePrepareFunction: (title) => {  
          return `<i class="fas fa-award text-warning"></i>${title}`;
        }, 
      },
      description: {
        title: "description",
        type: "string",
        valuePrepareFunction: (description) => {
          return description != null && truncate_with_ellipsis(description);
        },
      },
      kpi: {
        title: "key performance indicator(KPI)",
        type: "html",
        valuePrepareFunction: (kpi) => {  
          return `<i class="fas fa-flag text-warning"></i>${kpi}`;
        }, 
      },
      priority: {
        title: "priority",
        type: "html",
        valuePrepareFunction: (priority) => {
          switch (priority) {
            case "MEDIUM": {
              return `<h5><span class="badge badge-warning">${priority} </span></h5>`;
            }
            case "LOW": {
              return `<h5><span class="badge badge-success">${priority} </span></h5>`;
            }
            case "HIGH": {
              return `<h5><span class="badge badge-danger">${priority} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${priority} </span></h5>`;
            }
          }
        }, 
      },
      dueDate: {
        title: "Due date",
        type: "html",
        valuePrepareFunction: (dueDate) => {  
          const date=this.datepipe.transform(dueDate, 'yyyy-MM-dd ')        
          return `<i class="fas fa-calendar-alt text-danger"></i>${date}`;
        },      },
    },
  };
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {}
  onCreate(): void {
    this.enableActionPlanProcess = true;
    this.flippe();
  }
  flippe(): void {
    this.flippedState = !this.flippedState;
  }
  flipBack() {
    this.enableActionPlanDetails = false;
    this.enableActionPlanProcess = false;

    this.flippe();
    this.goalSelected = null;
  }
  onUserRowSelect(event): void {
    this.enableActionPlanDetails = true;
    this.goalSelected = event.data;
    this.flippe();
  }
  refresh(newData: Goal): void {
    if(this.goalList!==null)
   { this.goalList = [...this.goalList, newData];}
   else{
    this.goalList=[];
    this.goalList = [...this.goalList, newData];
   }
  }
}
