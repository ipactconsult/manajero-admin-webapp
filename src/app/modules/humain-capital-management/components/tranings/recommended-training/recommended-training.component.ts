import { Component, OnInit } from '@angular/core';
import {TrainingService} from "../../../services/trainingServices/training.service";
import {Training} from "../../../models/Training";

@Component({
  selector: 'ngx-recommended-training',
  templateUrl: './recommended-training.component.html',
  styleUrls: ['./recommended-training.component.scss']
})
export class RecommendedTrainingComponent implements OnInit {

  list:Training[]=[];
  id:string;
  search : string="";
  current: number =1;
  constructor(private ts: TrainingService) { }

  ngOnInit(): void {
    this.getList();
  }
  
  getList()
  {
    this.ts.findRecommended(this.id).subscribe((data:Training[])=>{
      this.list=data;
      console.log(data);
    },(err)=>{
      console.log(err);
    })
  }
  

}
