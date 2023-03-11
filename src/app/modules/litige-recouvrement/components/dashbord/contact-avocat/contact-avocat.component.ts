import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AvocatService } from '../../../services/avocat/avocat.service';
import { Avocat } from '../../../models/Avocat';

@Component({
  selector: 'ngx-contact-avocat',
  templateUrl: './contact-avocat.component.html',
  styleUrls: ['./contact-avocat.component.scss']
})
export class ContactAvocatComponent implements OnInit {



  ngOnInit(): void {
  }

  private alive = true;

  avocats: Avocat[];

  constructor(private userService: AvocatService) {
    forkJoin(
      this.userService.getAllAvocats(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([avocats]: [Avocat[]]) => {
        this.avocats = avocats;
     });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
