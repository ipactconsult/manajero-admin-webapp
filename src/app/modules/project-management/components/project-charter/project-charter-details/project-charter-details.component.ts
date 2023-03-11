import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Budget } from "../../../models/document/Budget";
import { ProjectCharterDocument } from "../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-project-charter-details",
  templateUrl: "./project-charter-details.component.html",
  styleUrls: ["./project-charter-details.component.scss"],
})
export class ProjectCharterDetailsComponent implements OnInit {
  id: string;
  projectCharter: ProjectCharter;
  newBudget: Budget[] = [];
  newDelivery: ProjectCharterDocument[] = [];
  newGoals: ProjectCharterDocument[] = [];

  test = 0;
  constructor(
    private route: ActivatedRoute,
    private projectCharterService: ProjectCharterService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("project");
      this.projectCharterService
        .findProjectCharterById(this.id)
        .subscribe((charter) => {
          this.projectCharter = charter;
        });
    });
  }

  refresh(event: ProjectCharter): void {
    this.projectCharter = null;
    this.projectCharter = event;
  }
  refreshfromBudget(event: Budget[]): void {
    this.projectCharter.budget=event;
    this.newBudget = event;    
  }
  refreshFromDeliver(event: ProjectCharterDocument[]): void {  
    this.projectCharter.deliveryUnits=event;  
    this.newDelivery = event;
  }
  refreshfromGoals(event: ProjectCharterDocument[]): void {
    this.projectCharter.goal=event;
    this.newGoals = event;
  }
}
