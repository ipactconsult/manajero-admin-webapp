import { Component, OnInit } from '@angular/core';
import { adminAccess, superAccess } from '../../../../../auth/accessControle/accessControle';
import { TokenStorageService } from '../../../../../auth/service/token/token.service';
import { Project } from '../../../../models/Project';
import { ProjectService } from '../../../../services/project/project.service';

@Component({
  selector: 'ngx-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  list: Project[];
  currentUser= null;
  constructor(private projectService: ProjectService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser= this.tokenStorageService.getUser();
    this.getAllActiveProjects();
   

  }
  getAllActiveProjectsExecutor(archived: boolean) {
    this.currentUser = this.tokenStorageService.getUser();

    this.projectService.findProjectByMember(this.currentUser.email).subscribe({
      next: (result: any) => {
        this.list = result.filter((project) => project.archived===archived);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getAllActiveProjects() {
    if(adminAccess(this.currentUser)){

      this.projectService.findProjectByManager(this.currentUser.email).subscribe({
        next: (result: any) => {
          this.list = result.filter((project) => project.archived===false);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    else if(superAccess(this.currentUser)){
      this.projectService.findAllActiveProject().subscribe({
        next: (result: any) => {
          this.list = result.filter((project) => project.archived===false);
        },
        error: (err: any) => {
          console.log(err);
        },
      }); 
    }
    else{
      this.getAllActiveProjectsExecutor(false);
    }
  
  
  }

  getAllArchivedProjects() {
    if(adminAccess(this.currentUser)){
      this.projectService.findProjectByManager(this.currentUser.email).subscribe({
        next: (result: any) => {
          this.list = result.filter((project) => project.archived===true);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    else if(superAccess(this.currentUser)){
      this.projectService.findAllActiveProject().subscribe({
        next: (result: any) => {
          this.list = result.filter((project) => project.archived===false);
        },
        error: (err: any) => {
          console.log(err);
        },
      }); 
    }
    else{
      this.getAllActiveProjectsExecutor(true);
    }
  }

  refresh(projectArchived: Project){
    this.list = [
      ...this.list.filter((project) => project.id !== projectArchived.id),
    ];
  }

  filtre(event) {
    event !== "Active"
      ? this.getAllArchivedProjects()
      : this.getAllActiveProjects();
  }

}
