import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

import { FormControl } from "@angular/forms";
import { ProjectService } from "../../../../services/project/project.service";
import { Project } from "../../../../models/Project";

import { ActivatedRoute } from "@angular/router";
import { TeamService } from "../../../../services/team/team.service";

@Component({
  selector: "ngx-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"],
})
export class MemberComponent implements OnInit {
  options: string[];
  memberList: string[] = [];
  filteredControlOptions$: Observable<string[]>;
  filteredNgModelOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  value: string;
  project: Project;
  id: string;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.options=[];
    this.teamService.findAllEmployees().subscribe({
      next: (employee) => {
        
        employee.forEach((element) => {

          this.options.push(element.employeeEmail);
          
        });
        console.log(this.options);

      },
    });
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.findProjectById();

    this.filteredControlOptions$ = of(this.options);

    this.inputFormControl = new FormControl();
  }
  filter(value: string): string[] {
    let filterValue: string;
    filterValue = value.toLowerCase();

    this.options = this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
    return this.options;
  }
  findProjectById() {
    this.projectService.findProjectById(this.id).subscribe({
      next: (value: Project) => {
        this.project = value;
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateProject(project: Project) {
    this.projectService.updateProject(project).subscribe({
      next: (value) => {
        this.project = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToTeam() {
   ( this.project.memberList===null )&&(this.project.memberList=[])
    const filtredData = this.filter(this.inputFormControl.value);
    filtredData[0] != undefined &&
      (this.project.memberList = [...this.project.memberList, filtredData[0]]);
     this.updateProject(this.project);
  }
}
