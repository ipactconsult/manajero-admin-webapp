import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../../auth/service/token/token.service';
import { Project } from '../../../../models/Project';
import { ProjectService } from '../../../../services/project/project.service';

@Component({
  selector: 'ngx-shared-project-details',
  templateUrl: './shared-project-details.component.html',
  styleUrls: ['./shared-project-details.component.scss']
})
export class SharedProjectDetailsComponent implements OnInit {
project:Project;
id:string;
disabled:boolean = true;
currentUser=null;
  constructor(  private route: ActivatedRoute,
    private projectService: ProjectService,
    private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {

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

}
