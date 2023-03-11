import {Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

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
import {LocalDataSource} from 'ng2-smart-table';

import { DomSanitizer } from '@angular/platform-browser';

import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Parternership } from '../../../models/parternership';
//import html2canvas from 'html2canvas';
import {ParternershipService} from './../../../services/parternership.service';
import html2canvas from 'html2canvas';
import {ExportService} from "../../../../../shared/exports/export.service";
import {EventMarketing} from "../../../models/event-marketing";
@Component({
  selector: 'ngx-parternership',
  templateUrl: './parternership.component.html',
  styleUrls: ['./parternership.component.scss']
})
export class ParternershipComponent implements OnInit {

  countries: any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  parternership: Parternership = new Parternership();
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

  dataParternership: Parternership [] = [];

  @Output() addParternershipOutputEvent = new EventEmitter<Parternership>();

  constructor(private parternershipService: ParternershipService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }

//Initialisation
  ngOnInit(): void {
    this.getAllParteners();
    this.countries = GoogleCountries;
  }

  // Get All Partners 
  getAllParteners() {
    this.parternershipService.getParternerships().subscribe(
     
      (data: Parternership[]) => {
        this.dataParternership = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }



    );
    
  }


// opean pop up for add new Partner 
  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Patner',
      },
    );
  }

  // pop up delete partner 
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Partner ?'});
  }

  // add partner 
  add_(c: Parternership) {
    this.addParternershipOutputEvent.emit(c);
  }

// Delete partner 
  onDeleteConfirm(event) {
    this.parternershipService.deleteParternership(event.data.id).subscribe(
      () => {
        this.showToast('success', 'Deleted','Partner deleted !!');
        this.router.navigateByUrl('/communicatiomMarketing/Parternership',
          {skipLocationChange: true}).then(() => {
          this.router.navigate(['/communicatiomMarketing/Parternership']);
        });


      });
  }

// Get Partner Desc
  getPartnerDesc() {
    this.parternershipService.findAllPartnerDesc().subscribe(
  

      (data: Parternership[]) => {
        this.dataParternership = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }

    );


  }

  // Get Partner Asc
  getPartnerAsc() {

    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParternership = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }

    );
  


  }




// Export Excel
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataParternership, 'dataParternership');
  }

  // Notification Tost 
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



  getPartnerbyCountry(e, x) {
    this.filtrePartnerByCountry(e, x);
  }

  // 
  filtrePartnerByCountry(e, x) {
    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParternership = [];
        console.log(e);
        this.dataParternership = data.filter(
          (c =>
              x == 'country' ? c.country === e : c.country === e  ||  c.archive === false 
          )
        );
      }, (err) => {
        return err;
      });
  }







  onArchiveConfirm(p: Parternership, id: string) {


      this.parternershipService.archivePartner(p, id).subscribe(
        () => {
          this.showToast('success', 'Archived Successfully', 'Patner Archived !!');
          this.ngOnInit();
        });
  
  }





}
