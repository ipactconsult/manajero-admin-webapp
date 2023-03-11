
import { Component, OnInit, TemplateRef,   ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { PublicationService } from '../../../services/publication.service';



import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,

} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventMarketing} from '../../../models/event-marketing';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Publication } from 'app/modules/communication-marketing-management/models/publication';


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
  selector: 'ngx-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
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

  dataRelances: any[] = [];


  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = false;


  constructor(private modal: NgbModal, private publicationService: PublicationService, private router: Router, private toastrService: NbToastrService,) {
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

  addPublication(): void {
    this.events = [
      ...this.events,
      {
        title: 'New Publication ',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },

      },
    ];
  }

  deletePublication(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  ngOnInit(): void {

    this.publicationService.getAllPublications().subscribe(
      (ev: Publication[]) => {

        ev.forEach((item) =>
          this.events.push({
            start: new Date(item.dateDebut),
           
           title: 'Publication Title  : ' + item?.title  + ' -- Type : ' + item?.briefingType +   ' --  Posted on   : ' + item?.socialMedia ,
          
            color: colors.blue,
            actions: [
              {
                label: '<span class="text-info"><i class="fa fa-edit"></i></span>',
                a11yLabel: 'Edit',
                onClick: ({event}: { event: CalendarEvent }): void => {
                  // @ts-ignore
                  this.router.navigateByUrl(`/communicationMarketing/EditPublication/${item.id}`);
                },
              },
              {
                label: '     <span class="text-basic"><i class="fa fa-archive"></i></span>',
                onClick: ({event}: { event: CalendarEvent }): void => {
            
                  //@ts-ignore
                  this.onArchiveConfirm(item,item.id);
                },
              },
            ]
          }),
        );

        this.dataRelances = this.events;
        this.viewDate = new Date();

      });

  }
//archive visit function
  onArchiveConfirm(publication: Publication, id: string) {
    this.publicationService.archivePublication(publication, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Relance Archived !!');
        // @ts-ignore
       
        this.router.navigate(['/communicationMarketing/ArchivePublication']).then(() => {
      
        });
      });
  }
  
    
 
    //toast alert notification
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

 
}
