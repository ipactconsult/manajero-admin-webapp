import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Publication} from "../../../models/publication";
import {
  NbComponentStatus, NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService, NbWindowService
} from "@nebular/theme";
import {PublicationService} from "../../../services/publication.service";
import {Router} from "@angular/router";
import {ExportService} from "../../../../../shared/exports/export.service";
import {HttpErrorResponse} from "@angular/common/http";
import html2canvas from "html2canvas";
import * as jsPDF from "jspdf";
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-grid-publication',
  templateUrl: './grid-publication.component.html',
  styleUrls: ['./grid-publication.component.scss']
})
export class GridPublicationComponent implements OnInit {

  countries : any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
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


  dataPublications: Publication [] = [];

  @Output() addPublicationOutputEvent = new EventEmitter<Publication>();

  constructor(private publicationService: PublicationService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllPublications();
    this.countries = GoogleCountries;
  }

  getAllPublications(){
    this.publicationService.getAllPublications().subscribe(
     
      (data: Publication[]) => {
        this.dataPublications = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }


    );
  }






  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Partner',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this  publication ?'});
  }

  add_Publication(p: Publication) {
    this.addPublicationOutputEvent.emit(p);
  }



  onDeleteConfirm(p: Publication) {

    this.publicationService.deletePublication(p.id).subscribe(
      () => {
        this.showToast("success", "Deleted", "Publication deleted !!");
        this.router.navigate(["/communicationMarketing/Publication"])
        window.location.reload()
      })
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






  addPublication(event) {
    this.publicationService.addPublication(event.newData).subscribe(result => {
        this.showToast("success", "Add !!", "Publication Added successffully  !!");
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




  getPartnerbyCountry(e, x) {
    this.filtrePartnerByCountry(e, x);
  }

  filtrePartnerByCountry(e, x) {/*
    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParternerships = [];
        console.log(e);
        this.dataParternerships = data.filter(
          (c =>
              x == 'country' ? c.country === e : c.country === e
          )
        );
      }, (err) => {
        return err;
      });*/
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

}
