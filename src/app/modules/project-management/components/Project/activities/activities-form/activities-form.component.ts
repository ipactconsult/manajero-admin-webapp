import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NbTagComponent, NbTagInputAddEvent } from "@nebular/theme";
import { Activity } from "../../../../models/Activity";
import { ActivityStatus } from "../../../../models/ActivityStatus";
import { Employee } from "../../../../models/Employee";
import { Goal } from "../../../../models/Goal";
import { Product } from "../../../../models/Product";
import { ActivitiesStatusService } from "../../../../services/activities-status/activities-status.service";
import { ActivityService } from "../../../../services/activity/activity.service";
import { GoalService } from "../../../../services/goal/goal.service";

@Component({
  selector: "ngx-activities-form",
  templateUrl: "./activities-form.component.html",
  styleUrls: ["./activities-form.component.scss"],
})
export class ActivitiesFormComponent implements OnInit {
  activityForm: FormGroup;
  activity: Activity;
  activityAdded: Activity[] = [];
  @Input() selectedItem: Activity = null;
  team: Employee[] = [];
  @Output() dataChanged = new EventEmitter<Activity>();
  newItem: string;
  projectId: string;
  goalList: Goal[] = [];
  resourceList: Product[] = [];
  activityStatus: ActivityStatus;
  dataRefreshedFromResource: boolean = false;
  dataRefreshedFromAssignEmployee: boolean = false;
  trees: Set<string> = new Set([]);

  @Input()statusActivity: ActivityStatus[] = [];

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private activitiesStatusService: ActivitiesStatusService,
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
if(this.selectedItem !== null)
{
  this.selectedItem.skills.forEach((skill)=>{ this.trees.add(skill)})
 
}

    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });
    this.findAllGoalsByProject();
 this.findAllStatusByProject();
    const formcontrols = {
      title: new FormControl(this.selectedItem?.title, [Validators.required]),
      goal: new FormControl(this.selectedItem?.goal?.title, [
        Validators.required,
      ]),
      priority: new FormControl(this.selectedItem?.priority, [
        Validators.required,
      ]),
      startDate: new FormControl(this.selectedItem?.startDate, [
        Validators.required,
      ]),
      dueDate: new FormControl(this.selectedItem?.dueDate, [
        Validators.required,
      ]),
    };
    this.activityForm = this.fb.group(formcontrols);
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees.delete(tagToRemove.text);
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.trees.add(value)
    }
    input.nativeElement.value = '';
  }
  save() {
    
  const array=[...this.trees];
  
    const data = this.activityForm.value;
    data.goal = { id: data.goal };
    data.team = [];
    this.team.forEach((element) => data.team.push(element.id));
    data.resource=this.resourceList;
    data.skills=[];
    data.skills=array;
    this.activityService.add(data).subscribe({
      next: (result: Activity) => {
        this.activity = result;
        this.activityAdded.push(result);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.newItem = this.activity.title;
        this.activityForm.reset();
        this.assigne(this.activity);
      },
    });
  }
  assigne(activity: Activity) {
    this.activityStatus.activityList.push(activity);
    this.activitiesStatusService.update(this.activityStatus).subscribe({
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  findAllStatusByProject() {
    this.activitiesStatusService.findAllByProject(this.projectId).subscribe({
      next: (result: ActivityStatus[]) => {
        this.statusActivity = [...result];
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  findAllGoalsByProject() {
    this.goalService.findAllByProject(this.projectId).subscribe({
      next: (result: Goal[]) => {
        this.goalList = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  update() {
    const array=[...this.trees];  
    const data = this.activityForm.value;
    data.id = this.selectedItem.id;
    data.goal = { id: this.selectedItem.goal.id };
    data.skills=[];
    data.skills=array;
    if(this.team.length>0 || this.dataRefreshedFromAssignEmployee){
    data.team = [];
    this.team.forEach((element) => data.team.push(element.id));
  }
  else{
    data.team = this.selectedItem.team;
     
  }
    if(this.resourceList.length>0 ||this.dataRefreshedFromResource){
      data.resource=this.resourceList;

    }
    else{
      data.resource = this.selectedItem.resource;
       
    }
    this.activityService.update(data).subscribe({
      next: (result: Activity) => {
        this.activity = result;

      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.activity);
        this.activityForm.reset();
      },
    });
  }
  assignEmploy(employee: Employee[]) {

    this.team = [...employee];
    this.dataRefreshedFromAssignEmployee=true;
  }
  selectStatus(id: string) {
    this.activitiesStatusService.findAllById(id).subscribe({
      next: (result: ActivityStatus) => {
        this.activityStatus = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  refresh(resources: Product[]){
    this.resourceList=[];
    this.resourceList=[...resources];
    this.dataRefreshedFromResource=true;    
  }
}
