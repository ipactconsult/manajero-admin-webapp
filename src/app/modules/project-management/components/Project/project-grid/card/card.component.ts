import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Project } from "../../../../models/Project";
import { ProjectService } from "../../../../services/project/project.service";

@Component({
  selector: "ngx-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  list: Project[];
  refDialog = null;
  selectedIdProject: string;
  updatedProject: Project;
  @Input() project: Project;
  @Output() changeData = new EventEmitter<Project>();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {}
  confirmation(dialog: TemplateRef<any>) {
    this.refDialog = this.dialogService.open(dialog);
  }
  onArchive(event) {
    event.archived = !event.archived;
    this.projectService.updateProject(event).subscribe({
      next: (result: Project) => {
        this.updatedProject = result;
      },

      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.changeData.emit(this.updatedProject);
        this.refDialog.close();
      },
    });
  }

  detailsProject(id: string) {
    this.router.navigate(["/projectManagement/project-details/" + id]);
  }
}
