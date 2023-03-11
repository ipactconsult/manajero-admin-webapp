import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { Activity } from "../../../../models/Activity";
import { ActivitiesFormComponent } from "../../../Project/activities/activities-form/activities-form.component";

@Component({
  selector: "ngx-task-modal",
  templateUrl: "./task-modal.component.html",
  styleUrls: ["./task-modal.component.scss"],
})
export class TaskModalComponent implements OnInit {
  @Input() activitySelected: Activity = null;
  @Input() currentStatus: string;
  @Output() dataChanged = new EventEmitter<any>();
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    console.log(this.currentStatus);
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }
  refresh(activityUpdated: Activity) {
    const response = { id: "", data: {} };

    response.id = this.currentStatus;
    response.data = activityUpdated;

    this.dataChanged.emit(response);
  }
}
