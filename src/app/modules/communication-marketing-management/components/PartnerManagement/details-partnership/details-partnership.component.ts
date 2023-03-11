import { Component, OnInit  } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Parternership} from "../../../models/parternership";
import {ParternershipService} from "../../../services/parternership.service";

@Component({
  selector: 'ngx-details-partnership',
  templateUrl: './details-partnership.component.html',
  styleUrls: ['./details-partnership.component.scss']
})
export class DetailsPartnershipComponent implements OnInit {
  idE;
  parternership: Parternership = new Parternership();
  visits;


  constructor(private parternershipService: ParternershipService, 
    
    private activatedroute: ActivatedRoute   ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.parternershipService.getPartnerById(this.idE).subscribe(data => {
      this.parternership = data;
      error => console.log(error);
    });



  }






}
