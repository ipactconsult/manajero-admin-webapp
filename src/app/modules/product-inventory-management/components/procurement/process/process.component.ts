import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  
  @Input() completedState1: boolean;
  @Input() completedState2: boolean;
  @Input() completedState3: boolean;
  @Input() completedState4: boolean;
  @Input() completedState5: boolean;
  @Input() completedState6: boolean;
  @Input() completedState7: boolean;
  @Input() selectedIndex;
  @Input() progressValue;
  @Input() progressStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
