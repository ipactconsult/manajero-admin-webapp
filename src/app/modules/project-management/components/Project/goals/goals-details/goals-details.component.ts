import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../../../models/Activity';
import { ActivityService } from '../../../../services/activity/activity.service';

@Component({
  selector: 'ngx-goals-details',
  templateUrl: './goals-details.component.html',
  styleUrls: ['./goals-details.component.scss']
})
export class GoalsDetailsComponent implements OnInit {
  @Input()selectedItem=null;
  @Input()disabled:boolean=false;

  activityList:Activity[]=[];
  constructor(private activityService:ActivityService) { }

  ngOnInit(): void {
    this.activityService.findAllByGoal(this.selectedItem.id).subscribe({
      next: (result: Activity[]) => {
        this.activityList = result;         
      },
      error: (err: any) => {
        console.log(err);
      },
    })
  }

}
