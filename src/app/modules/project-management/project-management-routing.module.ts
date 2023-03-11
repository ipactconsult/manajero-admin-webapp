
// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { RouterModule, Routes } from '@angular/router';


import { TaskmanagerComponent } from "./components/activities/taskManager/taskmanager/taskmanager.component";
import { ScheduleComponent } from "./components/activities/schedule/schedule/schedule.component";
import { ProjectCharterTablleComponent } from "./components/project-charter/project-charter-tablle/project-charter-tablle.component";
import { ProjectCharterDetailsComponent } from "./components/project-charter/project-charter-details/project-charter-details.component";
import { AddProjectCharterComponent } from "./components/project-charter/add-project-charter/add-project-charter.component";
import { ProjectTableComponent } from "./components/Project/project-table/project-table.component";
import { ProjectDetailsComponent } from "./components/Project/project-details/project-details.component";
import { ProcessComponent } from "./components/process/process.component";
import { GanttComponent } from "./components/gantt/gantt.component";
import { ListCardComponent } from "./components/Project/project-grid/list-card/list-card.component";
import { TaskManagerFormComponent } from "./components/activities/taskManager/task-manager-form/task-manager-form.component";
import { SharedProjectComponent } from './components/Project/shared-project/shared-project.component';
import { SharedProjectDetailsComponent } from './components/Project/shared-project-details/shared-project-details/shared-project-details.component';

const routes: Routes = [
  {
    path: "projects",
    component: ProjectTableComponent,
  },
  {
    path: "project-details/:id",
    component: ProjectDetailsComponent,
  },
  {
    path: "tasks",
    component: ListCardComponent,
  },
  {
    path: "sharedProject",
    component: SharedProjectComponent,
  },
  {
    path: "sharedProjectDetails/:id",
    component: SharedProjectDetailsComponent,
  },
  
  {
    path: "tasks/:id",
    component:TaskmanagerComponent,
  },
  {
    path: "schedule/:id",
    component: ScheduleComponent,
  },
  {
    path: "project-charter",
    component: ProjectCharterTablleComponent,
  },
  {
    path: "project-charter-details/:project",
    component: ProjectCharterDetailsComponent,
  },
  {
    path: "create-project-charter",
    component: AddProjectCharterComponent,
  },
  {
    path: "process",
    component: ProcessComponent,
  },
  {
    path: "gantt",
    component: GanttComponent,
  },
  {
    path: "tasks/details/:id",
    component:TaskManagerFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
