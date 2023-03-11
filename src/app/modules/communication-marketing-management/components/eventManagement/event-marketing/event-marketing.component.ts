import {Component, OnInit, Output, EventEmitter, TemplateRef, ElementRef, ViewChild} from '@angular/core';

import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { EventMarketing } from '../../../models/event-marketing';
import { EventMarketingService} from './../../../services/event-marketing.service';
declare var require: any;

import {ExportService} from "../../../../../shared/exports/export.service";
import GoogleCountries from "../../../../humain-capital-management/services/googlecountries.json";


@Component({
  selector: 'ngx-event-marketing',
  templateUrl: './event-marketing.component.html',
  styleUrls: ['./event-marketing.component.scss']
})
export class EventMarketingComponent implements OnInit {


  countries : any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  eventMarketing: EventMarketing = new EventMarketing();
  config: NbToastrConfig;
  current: number=1;
  search: string="";
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  dataEventMarketings: EventMarketing [] = [];

  @Output() addEventOutputEvent = new EventEmitter<EventMarketing>();

  constructor(private eventMarketingService: EventMarketingService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllEvents();
    this.countries = GoogleCountries;
  }

  getAllEvents(){
    this.eventMarketingService.getAllEvents().subscribe(
      (data: EventMarketing[]) => {
        this.dataEventMarketings = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }


    );


  }



  getEventbyCountry(e, x) {
    this.filtreEventByCountry(e, x);
  }

  filtreEventByCountry(e, x) {
    this.eventMarketingService.findAllEventAsc().subscribe(
      (data: EventMarketing[]) => {
        this.dataEventMarketings = [];
        console.log(e);
        this.dataEventMarketings = data.filter(
          (c =>
              x == 'country' ? c.country === e : c.country === e  || c.archive === false 
          )
     );
      }, (err) => {
        return err;
      });
  }





  

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Event',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Event ?'});

 
  }

  add_Event(e: EventMarketing) {
    this.addEventOutputEvent.emit(e);
  }



  onDeleteConfirm(e : EventMarketing) {
    this.eventMarketingService.deleteEvent(e.id).subscribe(
      (result) => {

        window.location.reload();


      }
    )
  }


  getEventsDesc() {
    this.eventMarketingService.findAllEventDesc().subscribe(

      (data: EventMarketing[]) => {
        this.dataEventMarketings = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }


    );
  }
  getEventsAsc() {
    this.eventMarketingService.findAllEventAsc().subscribe(
      (data: EventMarketing[]) => {
        this.dataEventMarketings = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }


    );
  }

 



// Add Event 
  addEvent(event) {
    this.eventMarketingService.addEvent(event.newData).subscribe(result => {
        this.showToast("success", "Add !!", "Event Added successffully  !!");
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast("danger", "Add !!", err.error.message);

        } else {
          this.showToast("danger", "Add !!", err.error.message);

        }
      }
    );
  }


// Notification Toast 
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

  // Export Data en excel 
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataEventMarketings, 'dataEventMarketings');
  }


//Archive Event 
  onArchiveConfirm(e: EventMarketing, id: string) {


    this.eventMarketingService.archiveEvent(e, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'Event Archived !!');
        this.ngOnInit();
      });

}



}
