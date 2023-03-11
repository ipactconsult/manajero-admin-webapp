import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalCharter} from "../../../models/global-charter";
import {GlobalCharterService} from "../../../services/global-charter.service";
@Component({
  selector: 'ngx-details-global-charter',
  templateUrl: './details-global-charter.component.html',
  styleUrls: ['./details-global-charter.component.scss']
})
export class DetailsGlobalCharterComponent implements OnInit {


  idE;
  globalCharter: GlobalCharter = new GlobalCharter();



  constructor(private globalCharterService: GlobalCharterService, private activatedroute: ActivatedRoute   ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.globalCharterService.getGlobalCharterById(this.idE).subscribe(data => {
      this.globalCharter = data;
      error => console.log(error);
    });



  }


}
