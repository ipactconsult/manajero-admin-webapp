import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivitiesStatusService } from "../../../../services/activities-status/activities-status.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ActivityStatus } from "../../../../models/ActivityStatus";
@Component({
  selector: "ngx-activities-status",
  templateUrl: "./activities-status.component.html",
  styleUrls: ["./activities-status.component.scss"],
})
export class ActivitiesStatusComponent implements OnInit {
  activityStatusForm: FormGroup;
  projectId: string;
  activityStatus: ActivityStatus;
  activityStatusAdded: ActivityStatus[] = [];
  initialStatus: ActivityStatus = null;
  listStatusAdded: ActivityStatus[] = [];
  @Output() dataChanged = new EventEmitter<ActivityStatus[]>();
  newItem: string;
  constructor(
    private activitiesStatusService: ActivitiesStatusService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });
    const formcontrols = {
      title: new FormControl("", [Validators.required]),
    };
    this.activityStatusForm = this.fb.group(formcontrols);
  }
  get title() {
    return this.activityStatusForm.get("title");
  }

  titleIsValid(): boolean {
    let isValide = false;
    this.activityStatusAdded.length > 0 &&
    this.activityStatusAdded.find(
      (activityStatus) => activityStatus.title === this.title.value.trim()
    ) !== undefined
      ? (isValide = true)
      : (isValide = false);
    return isValide;
  }

  save() {
    const data = this.activityStatusForm.value;
    data.project = this.projectId;
    
    const lengthDataAdded=this.activityStatusAdded.length;
    (this.activityStatusAdded.length!==0)?data.position =lengthDataAdded+1 :data.position=0;
    
    this.activitiesStatusService.add(data).subscribe({
      next: (result: ActivityStatus) => {
        this.activityStatus = result;
        this.activityStatusAdded.push(result);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.newItem = this.activityStatus.title;
        this.dataChanged.emit(this.activityStatusAdded);
        this.activityStatusForm.reset();
      },
    });
  }
}
