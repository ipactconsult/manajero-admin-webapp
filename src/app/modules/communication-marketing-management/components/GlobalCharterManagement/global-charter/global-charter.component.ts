
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
import html2canvas from 'html2canvas';
declare var require: any;
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

import {ExportService} from "../../../../../shared/exports/export.service";
import GoogleCountries from "../../../../humain-capital-management/services/googlecountries.json";
import {GlobalCharter} from "./../../../models/global-charter" ;
import {GlobalCharterService} from "./../../../services/global-charter.service";


@Component({
  selector: 'ngx-global-charter',
  templateUrl: './global-charter.component.html',
  styleUrls: ['./global-charter.component.scss']
})
export class GlobalCharterComponent implements OnInit {
 
  countries : any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  globalCharter : GlobalCharter = new GlobalCharter();
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


  dataGlobalCharters:  GlobalCharter [] = [];

  @Output() addPublicationOutputEvent = new EventEmitter<GlobalCharter>();

  constructor(private globalCharterService: GlobalCharterService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllGlobalCharterServices();
    this.countries = GoogleCountries;
  }

  getAllGlobalCharterServices(){
    this.globalCharterService.findAll().subscribe(
      (data: GlobalCharter[]) => {
        this.dataGlobalCharters = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }

    );
  }

  getPublicationByTitle(e,x) {
    this.filtre(e,x);
  }


  filtre(e,x) {
   /* this.em.getAllEvents().subscribe(
      (data: EventMarketing[]) => {
        this.dataEventMarketings = []
        this.dataEventMarketings = data.filter(
          (eventMarketing => {
            x === 'title' ? this.eventMarketing.title  === e : eventMarketing.title === e;

          }  )

        )
      }, (err) => {
        return err;
      })*/
  }

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Publication',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Publication  ?'});

 
  }
/*
  add_Event(e: EventMarketing) {
    this.addEventOutputEvent.emit(e);
  }
*/


  onDeleteConfirm(e : GlobalCharter) {
    this.globalCharterService.deleteGlobalCharter(e.id).subscribe(
      (result) => {

        window.location.reload();


      }
    )
  }


  getPublicationDesc() {
 /*   this.publicationService.findAllPublicationDesc().subscribe(
      (data: Publication[]) => { this.dataPublications = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );*/
  }
  getPublicationAsc() {
    /*this.publicationService.findAllPublicationAsc().subscribe(
      (data: Publication[]) => { this.dataPublications = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );*/
  }

  getPublicationsByType(e){
    this.filterByStatus(e);
  }

  filterByStatus(e){
  /*  this.publicationService.getAllPublications().subscribe(
      (data: Publication[]) => {
        this.dataPublications = []
        this.dataPublications = data.filter(
          (p =>
              p.briefingType === e
          )
        )
      }, (err) => {
        return err;
      })*/
  }




  addPublication(event) {
    this.globalCharterService.addGlobalCharter(event.newData).subscribe(result => {
        this.showToast("success", "Add !!", "publication Added successffully  !!");
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
    this.exportService.exportAsExcelFile(this.dataGlobalCharters, 'dataGlobalCharters');
  }

  onArchiveConfirm(e: GlobalCharter, id: string) {


    this.globalCharterService.archiveGlobalCharter(e, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'GlobalCharter Archived !!');
        this.ngOnInit();
      }
      
      
      
      
      );

}



onDeleteCharter(event): void {
  Swal.fire({
    title: "<h1 style='color:black'> Delete Document  </h1>",
    text: "Are you sure you would like to delete this Charter ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((category) => {
    if (category.isConfirmed) {
      this.globalCharterService.deleteGlobalCharter(event.data.id).subscribe(
        (GedDeleted) => {
          // tslint:disable-next-line:no-console
          console.log(GedDeleted);
          Swal.fire(
            "<h1 style='color:black'> Deleted! </h1>",
            "Document  has been deleted!",
            "success"
          ).then(() => {
            window.location.reload();
          });
        },
        (errorDeleting) => {
          // tslint:disable-next-line:no-console
          console.log(errorDeleting);
        }
      );
    }
  });
}










}
