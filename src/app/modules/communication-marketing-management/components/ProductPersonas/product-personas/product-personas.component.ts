
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
import { PersonaService } from 'app/modules/communication-marketing-management/services/persona.service';

@Component({
  selector: 'ngx-product-personas',
  templateUrl: './product-personas.component.html',
  styleUrls: ['./product-personas.component.scss']
})
export class ProductPersonasComponent implements OnInit {


  countries : any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  ///globalCharter : GlobalCharter = new GlobalCharter();
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


 // dataGlobalCharters:  GlobalCharter [] = [];
 products:any[] =[];

  @Output() addPublicationOutputEvent = new EventEmitter<GlobalCharter>();

  constructor(private personaService: PersonaService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllProducts();
    this.countries = GoogleCountries;
  }

  getAllProducts(){
    this.personaService.getProducts().subscribe(
     products => {
      this.products =  products ; 

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
/*
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataGlobalCharters, 'dataGlobalCharters');
  }
*/
  onArchiveConfirm(e: GlobalCharter, id: string) {
/*

    this.globalCharterService.(e, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'Publication Archived !!');
        this.ngOnInit();
      });*/

}




}
