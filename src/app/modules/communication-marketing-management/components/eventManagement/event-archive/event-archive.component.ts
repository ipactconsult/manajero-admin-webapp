import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExportService } from '../../../../../shared/exports/export.service';

import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import { EventMarketing } from '../../../models/event-marketing';
import { EventMarketingService } from '../../../services/event-marketing.service';


@Component({
  selector: 'ngx-event-archive',
  templateUrl: './event-archive.component.html',
  styleUrls: ['./event-archive.component.scss']
})
export class EventArchiveComponent implements OnInit {

 
  countries: any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  eventMarketing: EventMarketing = new EventMarketing();
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  dataEvents: EventMarketing [] = [];
  
  constructor(private eventMarketingService: EventMarketingService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllEvents();
    this.countries = GoogleCountries;
  }

  getAllEvents() {
    this.eventMarketingService.getAllEvents().subscribe(
      (data: EventMarketing[]) => {
        this.dataEvents = data.filter(
          (c => c.archive === true )
        );

      }, (err) => {
        return err;
      }
    );
  }
  
  
   onRestoreConfirm(e: EventMarketing, id: string) {
    this.eventMarketingService.cancelArchiveEvent(e,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Event restored !!');
     /*   this.router.navigate(['/CommunicationMarketing/ArchiveEvent']).then(() => {
         window.location.reload();
        });*/
      });
  }
  
  getEventsDesc() {
    this.eventMarketingService.findAllEventDesc().subscribe(
      (data: EventMarketing[]) => {
        this.dataEvents = data.filter(
                    ( e =>  e.archive===  true )
                )
      }, (err) => {
        console.log(err);
      },
    );
  }

  getEventsAsc() {
    this.eventMarketingService.findAllEventAsc().subscribe(
      (data: EventMarketing[]) => {
        this.dataEvents = data.filter(
          (e =>  e.archive===  true)
        );
      }, (err) => {
        console.log(err);
      },
    );
  }

 
  getEventbyCountry(e, x) {
    this.filtreEventByCountry(e, x);
  }

  filtreEventByCountry(e, x) {
    this.eventMarketingService.findAllEventAsc().subscribe(
      (data: EventMarketing[]) => {
        this.dataEvents = [];
        console.log(e);
        this.dataEvents = data.filter(
          (c =>
              x == 'country' ? c.country === e : c.country === e
              &&  c.archive=== true
          )


        );
      }, (err) => {
        return err;
      });
  }




 

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataEvents, 'dataEvents');
  }

  public openPDF(): void {

    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4', true);
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('customers.pdf');
    });
  }

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
