import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { Activity } from "../../../../models/Activity";
import { Goal } from "../../../../models/Goal";
import { ActivityService } from "../../../../services/activity/activity.service";
import { removeElementFromArray, truncate_with_ellipsis } from "../../../../utils/reutilizable-function";
import { DatePipe } from "@angular/common";
import { superAccess } from "../../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";

@Component({
  selector: "ngx-activities-table",
  templateUrl: "./activities-table.component.html",
  styleUrls: ["./activities-table.component.scss"],
})
export class ActivitiesTableComponent implements OnInit {
  selectedItem:Activity = null;
  refDialog = null;
  flippedState: boolean = false;
  currentUser= null;
  @Input() goalSelected:Goal;
  @Input() disabled: boolean = false;

   activityList: Activity[]=[];
  settings :any = {
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
        title: "Title",
        type: "html",
        valuePrepareFunction: (title) => {
          return `<i class="fas fa-bookmark text-primary"></i> ${title}`;
        },
      },
      description: {
        title: "Description",
        type: "html",
        valuePrepareFunction: (description) => {
          return (description!=null)?truncate_with_ellipsis(description):`<i  class="fas fa-comment-slash" ></i>No Description`;
        },
      },
      priority: {
        title: "Priority",
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
        },      },
      goal: {
        title: "Goal",
        type: "html",
        valuePrepareFunction: (goal) => {          
          return `<i class="fas fa-award text-warning" ></i>${goal.title}`;
        },
      },
      startDate: {
        title: "Start Date",
        type: "html",
        valuePrepareFunction: (startDate) => {    
          const date=this.datepipe.transform(startDate, 'yyyy-MM-dd ')       
          return `<i class="fas fa-calendar-alt text-success"></i>${date}`;
        },      },
      dueDate: {
        title: "Due Date",
        type: "html",
        valuePrepareFunction: (dueDate) => {  
          const date=this.datepipe.transform(dueDate, 'yyyy-MM-dd ')       
        
          return `<i class="fas fa-calendar-alt text-danger"></i>${date}`;
        },      },
     
    },
  };
  constructor(private dialogService: NbDialogService,private activityService:ActivityService,private datepipe: DatePipe,private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
  this.currentUser= this.tokenStorageService.getUser();
    if (!superAccess( this.currentUser)||this.disabled  ) {
      this.settings.actions = true;
    }
    this.flippedState=true;
    this.activityService.findAllByGoal(this.goalSelected.id).subscribe({
      next: (result: Activity[]) => {
        
        this.activityList = result;         
      },
      error: (err: any) => {
        console.log(err);
      },
    })
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {
    console.log("test");
  }
  onCreate(): void {
    this.selectedItem = null;
    this.flip();
  }

  onUserRowSelect(event): void {
    this.selectedItem = event.data;
    this.flip();
  }

  refresh(newItem: any): void {
    if(this?.activityList?.length>0 && this.activityList!==null)
    {
    const result = removeElementFromArray(this.activityList, newItem.id);
    this.activityList = [];
    this.activityList = [...result, newItem];
  }
  else{
    this.activityList = [];
    this.activityList = [...this.activityList, newItem];
  
  }
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
  flipBack(){
    this.flip();
    this.selectedItem=null;
  }
}
