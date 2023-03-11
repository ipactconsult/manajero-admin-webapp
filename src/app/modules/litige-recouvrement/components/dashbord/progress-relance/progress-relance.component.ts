import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Relance } from '../../../models/Relance';
import { RelanceService } from '../../../services/relance.service';

@Component({
  selector: 'ngx-progress-relance',
  templateUrl: './progress-relance.component.html',
  styleUrls: ['./progress-relance.component.scss']
})
export class ProgressRelanceComponent implements OnInit {

  numberSMS: number = 0;

  
  ngOnInit(): void {
    this.statsProgressBarService.getAllRelance("false",true)
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
        console.log(this.progressInfoData);
        for (let i = 0; i < data.length; i++) {
          this.numberSMS = this.numberSMS + data[i].comment?.length;
          console.log(this.numberSMS);
        }
      });
  }
  private alive = true;

  progressInfoData: Relance[];
  relance: Relance = new Relance();


  constructor(private statsProgressBarService: RelanceService) {
    
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
