import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphicalCharter} from "../../../models/graphical-charter";
import {GraphicalCharterService} from "../../../services/graphical-charter.service";

@Component({
  selector: 'ngx-details-charter',
  templateUrl: './details-charter.component.html',
  styleUrls: ['./details-charter.component.scss']
})
export class DetailsCharterComponent implements OnInit {

  idE;
  graphicalCharter: GraphicalCharter = new GraphicalCharter();



  constructor(private graphicalCharterService: GraphicalCharterService, private activatedroute: ActivatedRoute   ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.graphicalCharterService.getGraphicalCharterById(this.idE).subscribe(data => {
      this.graphicalCharter = data;
      error => console.log(error);
    });



  }




}
