import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { GlobalCharter } from 'app/modules/communication-marketing-management/models/global-charter';
import { GlobalCharterService } from 'app/modules/communication-marketing-management/services/global-charter.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExportService } from '../../../../../shared/exports/export.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';



@Component({
  selector: 'ngx-archive-global-charter',
  templateUrl: './archive-global-charter.component.html',
  styleUrls: ['./archive-global-charter.component.scss']
})
export class ArchiveGlobalCharterComponent implements OnInit {

  
  countries: any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  globalCharter: GlobalCharter = new GlobalCharter();
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


  dataGlobalCharters: GlobalCharter [] = [];
  
  constructor( private globalCharterService: GlobalCharterService , private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllGlobalCharters();
    this.countries = GoogleCountries;
  }

  getAllGlobalCharters() {
    this.globalCharterService.getAllGlobalCharters().subscribe(
      (data: GlobalCharter[]) => {
        this.dataGlobalCharters = data.filter(
          (c => c.archive === true )
        );

      }, (err) => {
        return err;
      }
    );
  }
  
  
   onRestoreConfirm(p: GlobalCharter, id: string) {
    this.globalCharterService.cancelArchiveGlobalCharter(p,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully', 'GlobalCharter  restored !!');
       this.router.navigate(['/CommunicationMarketing/ArchiveGlobalCharter']).then(() => {
        this.router.navigate(['/communicationMarketing/ArchiveGlobalCharter']);
        });
      });
  }
  
  getPersonasDesc() {
 /*   this.personaService.findAllEventDesc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
                    ( e =>  e.archive===  true )
                )
      }, (err) => {
        console.log(err);
      },
    );*/
  }

  getPersonasAsc() {
 /*   this.personaService.findAllEventAsc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
          (e =>  e.archive===  true)
        );
      }, (err) => {
        console.log(err);
      },
    );*/
  }

 
  getEventbyCountry(e, x) {
  //  this.filtreEventByCountry(e, x);
  }

  filtrePersonaByCountry(e, x) {
  /*  this.personaService.findAllEventAsc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = [];
        console.log(e);
        this.dataPersonas = data.filter(
          (c =>
              x == 'country' ? c.country === e : c.country === e
              &&  c.archive=== true
          )


        );
      }, (err) => {
        return err;
      });*/
  }




 

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataGlobalCharters, 'dataGlobalCharters');
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
