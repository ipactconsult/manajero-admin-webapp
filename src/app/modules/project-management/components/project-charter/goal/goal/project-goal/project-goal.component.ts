import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { ProjectCharterDocument } from "../../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../../services/project-charter/project-charter.service";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService} from "@nebular/theme";

@Component({
  selector: "ngx-project-goal",
  templateUrl: "./project-goal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./project-goal.component.scss"],
})
export class ProjectGoalComponent implements OnInit {
  @Input() data: ProjectCharter;
  @Output() dataChanged=new EventEmitter<ProjectCharter>();
  flippedState: boolean = false;

  constructor(private projectCharterService: ProjectCharterService,    private toastrService: NbToastrService
    ) {}

  ngOnInit(): void {
  }

//toster config
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : "";

  this.index += 1;
  this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
}
//
  flippe(event: boolean): void {
    this.flippedState = !this.flippedState;
  }
  deleteGoal(event: ProjectCharterDocument[]): void {
    this.data.goal = event;

    this.projectCharterService
    .updateProjectCharter(this.data)
    .subscribe((ch) => {
      this.showToast("success", "Success", "Goal added successfully!");
      
      
    });
  }
  refresh(event: ProjectCharterDocument): void {
    this.data.goal = [...this.data.goal, event];
    this.dataChanged.emit(this.data)
  }
 
}
