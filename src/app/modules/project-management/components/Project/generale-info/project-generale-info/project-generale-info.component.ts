import { Component, Input, OnInit } from "@angular/core";
import { superAccess } from "../../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { Project } from "../../../../models/Project";
import { ProjectService } from "../../../../services/project/project.service";

@Component({
  selector: "ngx-project-generale-info",
  templateUrl: "./project-generale-info.component.html",
  styleUrls: ["./project-generale-info.component.scss"],
})
export class ProjectGeneraleInfoComponent implements OnInit {
  @Input() project: Project;
  statusColor: string = "";
  flippedState: boolean = false;
  selected: Project = null;
  accessControle:boolean=false;
  constructor(private projectService: ProjectService,    private tokenStorageService: TokenStorageService,
    ) {   const currentUser = this.tokenStorageService.getUser();

      this.accessControle=superAccess(currentUser);
    }

  ngOnInit(): void {
    console.log(this.project);
    
    this.updateStatusColor();
 

  }

  updateStatusColor() {
    "" + this.project.status === "DONE"
      ? (this.statusColor = "success")
      : "" + this.project.status === "IN_PTOGRESS"
      ? (this.statusColor = "warning")
      : (this.statusColor = "danger");
  }
  updateStatus(event) {
    this.project.status = event;
    this.projectService.updateProject(this.project).subscribe({
      next: (result: any) => {
        this.project = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.updateStatusColor();
      },
    });
  }
  flip(): void {
    this.selected=this?.project;    
    this.flippedState = !this.flippedState;
  }
  refresh(event)
  {
    this.project=null;
    this.project=event;
    this.flip();  
  }
}
