import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avocat } from '../../../models/Avocat';
import { AvocatService } from '../../../services/avocat/avocat.service';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,

} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Relance } from '../../../models/Relance';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
import { Subject } from 'rxjs';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'ngx-avocat-details',
  templateUrl: './avocat-details.component.html',
  styleUrls: ['./avocat-details.component.scss']
})
export class AvocatDetailsComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  events: Array<CalendarEvent<{ time: any }>> = [];

 //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  dataAvocats: any[] = [];

  idUri: string = '';
  avocat: Avocat = new Avocat();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = false;


  constructor(private cs: AvocatService, 
              private activatedroute: ActivatedRoute, private modal: NgbModal
             ) {
  }
  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
this.events = this.events.map((iEvent) => {
if (iEvent === event) {
return {
...event,
start: newStart,
end: newEnd,
};
}
return iEvent;
});
this.handleEvent('Dropped or resized', event);
}

handleEvent(action: string, event: CalendarEvent): void {
this.modalData = {event, action};
this.modal.open(this.modalContent, {size: 'lg'});
}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

  this.cs.getAvocatById(this.idUri).subscribe(data => {
      this.avocat = data;
      error => console.log(error);
    });

    this.cs.getAvocatById(this.idUri).subscribe(
      (item: Avocat) => {

          this.events.push({
            start: new Date(item.disponabilite),
           
           title: 'Lawyer Name : ' + item?.nom  + ' -- Lawyer Speciality : ' + item?.specialite,
          
            color: colors.blue,
            actions: [
              {
                label: '<span class="text-info"><i class="fa fa-edit"></i></span>',
                a11yLabel: 'Edit',
                onClick: ({event}: { event: CalendarEvent }): void => {
                  // @ts-ignore
                  this.router.navigateByUrl(`/litige/editavocat/${item.id}`);
                },
              },
              {
                label: '     <span class="text-basic"><i class="fa fa-archive"></i></span>',
                onClick: ({event}: { event: CalendarEvent }): void => {
               //   this.events = this.events.filter((iEvent) => iEvent !== event);
                 // this.handleEvent("Delete", event);
                  //@ts-ignore
                  this.onArchiveConfirm(item,item.id);
                },
              },
            ]
          }),
       

        this.dataAvocats = this.events;
        this.viewDate = new Date();

      });
  }


}

