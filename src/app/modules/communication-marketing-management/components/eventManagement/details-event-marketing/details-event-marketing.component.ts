import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMarketing } from '../../../models/event-marketing';
import { EventMarketingService } from '../../../services/event-marketing.service';

@Component({
  selector: 'ngx-details-event-marketing',
  templateUrl: './details-event-marketing.component.html',
  styleUrls: ['./details-event-marketing.component.scss']
})
export class DetailsEventMarketingComponent implements OnInit {
  idE;
  eventMarketing: EventMarketing = new EventMarketing();



  constructor(private eventMarketingService: EventMarketingService, 
    
    private activatedroute: ActivatedRoute   ) {
  }

  //Initialisation
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    
    this.eventMarketingService.getEventById(this.idE).subscribe(data => {
      this.eventMarketing = data;
      error => console.log(error);
    });



  }




}
