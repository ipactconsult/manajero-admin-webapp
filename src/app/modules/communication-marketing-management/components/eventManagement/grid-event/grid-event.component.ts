import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {EventMarketing} from "../../../models/event-marketing";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {EventMarketingService} from "../../../services/event-marketing.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import GoogleCountries from "../../../../humain-capital-management/services/googlecountries.json";
import {HttpErrorResponse} from "@angular/common/http";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'ngx-grid-event',
  templateUrl: './grid-event.component.html',
  styleUrls: ['./grid-event.component.scss']
})
export class GridEventComponent implements OnInit {
  countries : any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
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

  constructor(private eventMarketingService : EventMarketingService, private dialogService: NbDialogService,
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
        this.dataEventMarketings = data;

      }
    );
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
      {context: 'Are you sure to delete this event ?'});
  }

  add_Event(em: EventMarketing) {
    this.addEventOutputEvent.emit(em);
  }



  onDeleteConfirm(e: EventMarketing) {

    this.eventMarketingService.deleteEvent(e.id).subscribe(
      () => {
        this.showToast("success", "Deleted", "Event deleted !!");
        this.router.navigate(["/communicationMarketing/EventGrid"])
        window.location.reload()
      })
  }


  getEventsDesc() {
    this.eventMarketingService.findAllEventDesc().subscribe(
      (data: EventMarketing[]) => { this.dataEventMarketings = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );
  }
  getEventsAsc() {
    this.eventMarketingService.findAllEventAsc().subscribe(
      (data: EventMarketing[]) => { this.dataEventMarketings = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );
  }



 




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

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataEventMarketings, 'dataEventMarketings');
  }




  public openPDF(): void {

    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Event.pdf');
    });
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
              x == 'country' ? c.country === e : c.country === e
          )
        );
      }, (err) => {
        return err;
      });
  }




  onArchiveConfirm(e: EventMarketing, id: string) {


    this.eventMarketingService.archiveEvent(e, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'Event Archived !!');
        this.ngOnInit();
      });

}






}
