import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Goal } from "../../../models/Goal";

@Component({
  selector: "ngx-action-plan",
  templateUrl: "./action-plan.component.html",
  styleUrls: ["./action-plan.component.scss"],
})
export class ActionPlanComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<Goal>();
  newItem:string;
  constructor() {}

  ngOnInit(): void {}
  refresh(newData: Goal): void {
    
    this.dataChanged.emit(newData);
    this.newItem=newData.title


  }
}
