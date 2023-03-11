import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { superAccess } from "../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../auth/service/token/token.service";
import { Project } from "../../../models/Project";
import { ProjectService } from "../../../services/project/project.service";

@Component({
  selector: "ngx-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  id: string;
  project: Project = null;
  accessControle:boolean;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private tokenStorageService: TokenStorageService,
    

  ) {}
  currentWindow: string;
  ngOnInit(): void {
    const currentUser = this.tokenStorageService.getUser();

   this.accessControle=superAccess(currentUser);
    
    this.currentWindow = "home";
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.projectService.findProjectById(this.id).subscribe({
        next: (result: any) => {
          this.project = result;
          
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }
  refresh(event: Project) {
    this.project=null;
    this.project=event;
  }
  changeTab(event) {
    this.currentWindow = event.tabTitle;
  }
}
