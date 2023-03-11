import {Component, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,

} from 'date-fns';

import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VisitService} from '../../../services/visits/visit.service';
import {Visit} from '../../../models/visit';
import {Router} from '@angular/router';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {ExportService} from '../../../../../shared/exports/export.service';

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
  selector: 'ngx-calendar-visits',
  templateUrl: './calendar-visits.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-visits.component.scss']
})
export class CalendarVisitsComponent implements OnInit {

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

  dataVisits: any[] = [];


  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = false;


  constructor(private modal: NgbModal,    private exportService: ExportService, private vs: VisitService, private router: Router, private toastrService: NbToastrService,) {
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

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New Visit',
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

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  ngOnInit(): void {

    this.vs.getAllVisitsNonArchived().subscribe(
      (res: Visit[]) => {

        res.forEach((item) =>
          this.events.push({
            start: new Date(item.dateVisit),
            end: new Date(item.hourVisit),
            //@ts-ignore
            title: 'Employee Name : ' + item?.employee?.employeeName
              //@ts-ignore
              + ' -- Customer : ' + item?.customer?.name
              //@ts-ignore
              + ' -- Property :' + item.property?.propertyName
              + ' -- Title :' + item.title,
            color: colors.blue,
            actions: [
              {
                label: '<span class="text-info"><i class="fa fa-edit"></i></span>',
                a11yLabel: 'Edit',
                onClick: ({event}: { event: CalendarEvent }): void => {
                  // @ts-ignore
                  this.router.navigateByUrl(`/crm/edit-visit/${item.id}`);
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
        );

        this.dataVisits = this.events;
        this.viewDate = new Date();

      });

  }
//archive visit function
  onArchiveConfirm(visit: Visit, id: string) {
    this.vs.archiveVisit(visit, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Visit Archived !!');
        // @ts-ignore
       
        this.router.navigate(['/crm/visits']).then(() => {
      
        });
      });
  }
  
    
  //export data as excel file
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataVisits, 'dataVisits');
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
