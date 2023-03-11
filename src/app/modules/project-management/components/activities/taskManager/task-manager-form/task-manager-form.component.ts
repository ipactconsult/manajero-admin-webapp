import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../../../models/Activity';
import { ActivityService } from '../../../../services/activity/activity.service';

@Component({
  selector: 'ngx-task-manager-form',
  templateUrl: './task-manager-form.component.html',
  styleUrls: ['./task-manager-form.component.scss']
})
export class TaskManagerFormComponent implements OnInit {
  id: string;
  activity: Activity=null;
  constructor(    private route: ActivatedRoute,private activityService: ActivityService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.activityService.findAllById(this.id).subscribe({
      next: (result: Activity) => {
        this.activity = result;
        console.log(result);
        
      },
      error: (err: any) => {
        console.log(err);
      },
    
    });
  }

}
