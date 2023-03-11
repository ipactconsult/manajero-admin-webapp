import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Budget } from "../../../models/document/Budget";
import { ProjectCharterDocument } from "../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../models/ProjectCharter";

@Component({
  selector: "ngx-statistic",
  templateUrl: "./statistic.component.html",
  styleUrls: ["./statistic.component.scss"],
})
export class StatisticComponent implements OnChanges {
  @Input() data: ProjectCharter;
  @Input () newValueBudget: Budget[]=[];
  @Input () newValueGoals: ProjectCharterDocument[]=[];
  @Input () newValueDelivery: ProjectCharterDocument[]=[];

  budget: number=0;
  goals:number = 0;
  deliveryUnits:number = 0;
  constructor() {}
//Improvement
  ngOnChanges(): void {
  
    this.calculeStatics();
  }

 calculeStatics(){
   
  (this?.data?.budget===null)?this.budget =0:this.budget= this?.data?.budget.reduce((a, b) => a + (b["amount"] ), 0); 
  (this?.data?.goal!==null)&&(this.goals=this?.data?.goal?.length);
  (this?.data?.deliveryUnits!==null)&&(this.deliveryUnits=this?.data?.deliveryUnits?.length);
 }
}
