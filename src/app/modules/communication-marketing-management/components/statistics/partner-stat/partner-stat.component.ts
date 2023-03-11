import { Component, OnInit } from '@angular/core';
import { ParternershipService } from '../../../services/parternership.service';
import { IInternByCampaignModel } from '../../../models/IInternByCampaignModel';
@Component({
  selector: 'ngx-partner-stat',
  templateUrl: './partner-stat.component.html',
  styleUrls: ['./partner-stat.component.scss']
})
export class PartnerStatComponent  implements OnInit  {
    PartnerByCountry: any[];
    loading=true;
    colorScheme = {
        domain: ['#87CEFA', '#9370DB', '#FA8072', '#90EE90' ]
    };
    constructor(private parternershipService : ParternershipService) {
    }
ngOnInit():void {
    this.parternershipService.getPartnerByCountry().subscribe((data: IInternByCampaignModel[]) =>{
        const tempArray =[];
        for(let i=0; i<data.length; i++)
            tempArray.push({name:data[i].name, value:data[i].value})
            this.PartnerByCountry=tempArray;
            this.loading=false
});
}


}