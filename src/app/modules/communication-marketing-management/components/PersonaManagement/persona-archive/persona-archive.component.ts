import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExportService } from '../../../../../shared/exports/export.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import { EventMarketing } from '../../../models/event-marketing';
import { Persona } from '../../../models/persona';
import { EventMarketingService } from '../../../services/event-marketing.service';
import { PersonaService } from '../../../services/persona.service';


@Component({
  selector: 'ngx-persona-archive',
  templateUrl: './persona-archive.component.html',
  styleUrls: ['./persona-archive.component.scss']
})
export class PersonaArchiveComponent implements OnInit {

  
  countries: any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  persona: Persona = new Persona();
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


  dataPersonas: Persona [] = [];
  
  constructor(private personaService: PersonaService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllPersonas();
    this.countries = GoogleCountries;
  }

  getAllPersonas() {
    this.personaService.getPersonas().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
          (c => c.archive === true )
        );

      }, (err) => {
        return err;
      }
    );
  }
  
  
   onRestoreConfirm(p: Persona, id: string) {
    this.personaService.cancelArchivePersona(p,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Persona  restored !!');
       this.router.navigate(['/CommunicationMarketing/ListPersona']).then(() => {
        this.router.navigate(['/communicationMarketing/ListPersona']);
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
    this.exportService.exportAsExcelFile(this.dataPersonas, 'dataPersonas');
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
