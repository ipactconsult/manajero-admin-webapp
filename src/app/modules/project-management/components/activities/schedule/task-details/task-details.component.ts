import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from '../../../../models/Activity';
import { ActivityService } from '../../../../services/activity/activity.service';

@Component({
  selector: 'ngx-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task;
  activity:Activity;
  constructor(public activeModal: NgbActiveModal,private activityService: ActivityService) {}
  ngOnInit(): void {
    this.activityService.findAllById(this.task.id).subscribe({
      next: (result: Activity) => {
        this.activity = result;
        
      },
      error: (err: any) => {
        console.log(err);
      },
    
    });
  }

}
