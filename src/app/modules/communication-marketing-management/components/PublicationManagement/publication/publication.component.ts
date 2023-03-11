import {Component, OnInit, Output, EventEmitter, TemplateRef, ElementRef, ViewChild, Input} from '@angular/core';

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
import {Publication} from "./../../../models/publication" ;
import {PublicationService} from "./../../../services/publication.service";
@Component({
  selector: 'ngx-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  @Input() type: 'facebook' | 'twitter' | 'instagram';
  @Input() shareUrl: string;
  navUrl: string;
  
  countries : any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  publication : Publication = new Publication();
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

  link: string ;
  dataPublications:  Publication [] = [];

  @Output() addPublicationOutputEvent = new EventEmitter<Publication>();

  constructor(private publicationService: PublicationService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

//Intialisation
  ngOnInit(): void {
    this.getAllPublications();
    this.countries = GoogleCountries;
    this.link = 'https://nesrine.com'; 
 

  }
// View all erchived Event
  getAllPublications(){
    this.publicationService.findAll().subscribe(
    
      (data: Publication[]) => {
        this.dataPublications = data.filter(
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

// Delete
  onDeleteConfirm(e : Publication) {
    this.publicationService.deletePublication(e.id).subscribe(
      (result) => {

        window.location.reload();


      }
    )
  }


  getPublicationDesc() {
    this.publicationService.findAllPublicationDesc().subscribe(
    
      (data: Publication[]) => {
        this.dataPublications = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }


    );
  }
  getPublicationAsc() {
    this.publicationService.findAllPublicationAsc().subscribe(

      (data: Publication[]) => {
        this.dataPublications = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }

    );

 
  }


  getPublicationsByType(e){
    this.filterByStatus(e);
  }

  filterByStatus(e){
    this.publicationService.getAllPublications().subscribe(
      (data: Publication[]) => {
        this.dataPublications = []
        this.dataPublications = data.filter(
          (p =>
              p.briefingType === e 
          )
        )
      }, (err) => {
        return err;
      })
  }




  addPublication(event) {
    this.publicationService.addPublication(event.newData).subscribe(result => {
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
    this.exportService.exportAsExcelFile(this.dataPublications, 'dataPublications');
  }

  onArchiveConfirm(e: Publication, id: string) {


    this.publicationService.archivePublication(e, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'Publication Archived !!');
        this.ngOnInit();
      });

}


/*
private createNavigationUrl() {
  let searchParams = new URLSearchParams();

  // TODO: zrobić map z tego manualnego dziugania

 switch(this.publication.socialMedia) {
    case 'facebook':
      searchParams.set('u', this.shareUrl);
      this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
      break;
    case 'twitter':
      searchParams.set('url', this.shareUrl);
      this.navUrl =  'https://twitter.com/share?' + searchParams;
     break;
  }
}*/









public share() {
  return window.open(this.navUrl, "_blank");
}



}
