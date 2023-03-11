import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExportService } from '../../../../../shared/exports/export.service';
import { Parternership } from '../../../models/parternership';
import { ParternershipService } from '../../../services/parternership.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';


@Component({
  selector: 'ngx-partner-history',
  templateUrl: './partner-history.component.html',
  styleUrls: ['./partner-history.component.scss']
})
export class PartnerHistoryComponent implements OnInit {

 
  countries: any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  partner: Parternership = new Parternership();
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


  dataParners: Parternership [] = [];
  
  constructor(private parternershipService: ParternershipService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllPartners();
    this.countries = GoogleCountries;
  }

  getAllPartners() {
    this.parternershipService.getParternerships().subscribe(
      (data: Parternership[]) => {
        this.dataParners = data.filter(
          (c => c.archive === true )
        );

      }, (err) => {
        return err;
      }
    );
  }
  
  
   onRestoreConfirm(p: Parternership, id: string) {
    this.parternershipService.cancelArchivePartner(p,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Partner restored !!');
      this.router.navigate(['/CommunicationMarketing/ListPartnership']).then(() => {
         window.location.reload();
        });
      });
  }
  
  getPartnersDesc() {
    this.parternershipService.findAllPartnerDesc().subscribe(
      (data: Parternership[]) => {
        this.dataParners = data.filter(
                    ( per =>  per.archive===  true )
                )
      }, (err) => {
        console.log(err);
      },
    );
  }

  getPartnersAsc() {
    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParners = data.filter(
          (par =>  par.archive===  true)
        );
      }, (err) => {
        console.log(err);
      },
    );
  }

 
  getPartnerbyCountry(e, x) {
    this.filtrePartnerByCountry(e, x);
  }

  filtrePartnerByCountry(e, x) {
    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParners = [];
        console.log(e);
        this.dataParners = data.filter(
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
    this.exportService.exportAsExcelFile(this.dataParners, 'dataParners');
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
