import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { Activity } from "../../../../models/Activity";
import { ActivityStatus } from "../../../../models/ActivityStatus";
import { ActivitiesStatusService } from "../../../../services/activities-status/activities-status.service";
import { ProjectService } from "../../../../services/project/project.service";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-app-taskmanager",
  templateUrl: "./taskmanager.component.html",
  styleUrls: ["./taskmanager.component.scss"],
})
export class TaskmanagerComponent implements OnInit {
  id: string;
  dataLoaded: boolean = false;
  team: string[];
  constructor(
    private activitiesStatusService: ActivitiesStatusService,
    private route: ActivatedRoute,
    private router: Router, 
    private projectService: ProjectService

  ) {}

  tasks: ActivityStatus[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
this.projectService.findProjectById(this.id).subscribe((project) => {this.team=project.memberList})
    this.activitiesStatusService.findAllByProject(this.id).subscribe({
      next: (result: ActivityStatus[]) => {
        this.tasks = result;
        
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataLoaded = true;
      },
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const newStatus: string = event.container.element.nativeElement.className;
      const oldStatus: string =
        event.previousContainer.element.nativeElement.className;
      const previousStatus = this.findIdOnDrop(oldStatus);
      const currentStaus = this.findIdOnDrop(newStatus);
      const previous = this.tasks.find((task) => task.id === previousStatus);
      const current = this.tasks.find((task) => task.id === currentStaus);
      current.activityList = event.container.data;
      previous.activityList = event.previousContainer.data;

      this.updateStatus(current);
      this.updateStatus(previous);
    }
  }
  findIdOnDrop(text: string): string {
    return text
      .replace("cdk-drop-list", "")
      .replace("example-list", "")
      .replace("cdk-drop-list-dragging", "")
      .replace("cdk-drop-list", "")
      .replace(" -receiving", "")

      .trim();
  }
  updateStatus(data) {
    this.activitiesStatusService.update(data).subscribe({
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  dropGlobbal(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    let i = -1;
    this.tasks.forEach((task) => {
      i++;
      task.position = i;
    });
    this.activitiesStatusService.changePosition(this.tasks).subscribe({
      next: (result: ActivityStatus[]) => {
        this.tasks = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  detailsProject() {
    
    this.router.navigate(["/projectManagement/project-details/" +  this.id]);
  }
  redirect(){
    {
    
      this.router.navigate(["/projectManagement/schedule/" +  this.id]);
    }
  }
}
