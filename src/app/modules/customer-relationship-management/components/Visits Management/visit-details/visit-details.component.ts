import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VisitService} from '../../../services/visits/visit.service';
import {Visit} from '../../../models/visit';

@Component({
  selector: 'ngx-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit {

    idUri: string="";
  visit: Visit = new Visit();
  NotAssignedYet: string ="Not Assigned Yet."
  constructor( private vs: VisitService,private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
      this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id')
      });
      
      this.vs.getVisitById(this.idUri).subscribe(data=>{
        this.visit= data;
        error=>console.log(error);
      })
    
  }

}
