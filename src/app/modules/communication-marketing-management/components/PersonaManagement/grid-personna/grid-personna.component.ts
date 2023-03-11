import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { ExportService } from '../../../../../shared/exports/export.service';
import { Persona } from '../../../models/persona';

import {PersonaService} from '../../../services/persona.service' ;
import * as pdfMake from "pdfmake/build/pdfmake";

import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-grid-personna',
  templateUrl: './grid-personna.component.html',
  styleUrls: ['./grid-personna.component.scss']
})
export class GridPersonnaComponent implements OnInit {

 
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  current : number = 1;
  
  config : NbToastrConfig;
  title = 'Create Persona';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  list: Persona[] = [];
  countries : any [] = [];


  pageSize:number = 4;

  NotAssignedYet: string ="Not Assigned Yet."
  
  searchbyfields: string;

  dataPersonas:  Persona [] = [];


  constructor(private exportService: ExportService, private router: Router, private personaService: PersonaService,  private ws : NbWindowService , private dialogService : NbDialogService , private toastrService : NbToastrService) { }

  handlePageChange(event) {
    this.current = event;
    console.log(this.current);
}




ngOnInit(): void {
  this.getAllpersonas();
  this.countries = GoogleCountries;
}

getAllpersonas(){
  this.personaService.findAll().subscribe(
    (data: Persona[]) => {
      this.dataPersonas = data.filter(
        (c => c.archive === false )
      );

    }, (err) => {
      return err;
    }

  );
}

  getPersonaDesc() {
  
  }
  getPersonaAsc() {

  }

  getAllPersonas() {

  }
  filtre(e,x) {
    /*this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => {
        this.list = []
        console.log(e);
        this.list = data.filter(
          (empl =>               
              x == 'Gender' ? empl.employeeGender === e : empl.employeeCountry === e             
          )
          
        )
      }, (err) => {
        return err;
      })*/
  }
  filtreRole(e,x) {
   /* this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => {
        this.list = []
        console.log(e);
        this.list = data.filter(
          (empl =>               
              x == 'Role' ? empl.roleEmployee === e : null            
          )
          
        )
      }, (err) => {
        return err;
      })*/
  }

  

  getEmpsByGender(e,x) {
        this.filtre(e,x);
  }
  
  getEmpsByRole(e,x) {
    this.filtreRole(e,x);
}  

 
  


  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }

  deletePersona(persona : Persona){
    this.personaService.deletePersona(persona.id).subscribe(
      (result) => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        this.router.navigate(['/communicationMarkeying/Persona']).then(() => {
          this.getPersonaAsc();  
         });
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete Persona');
        console.log(err);
      }
    )
  }

  refresh(): void {
    window.location.reload();
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Employee ${titleContent}`,
      config);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.list, 'dataPersonas');
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { 
      pageOrientation: 'landscape',
      pageSize: 'A3',
      content: [html],
     };
 
  // pdfMake.createPdf(documentDefinition).download(); 
     
  }

 updateIsPersonaArchived(persona: Persona, id: string){
 /*   this.es.updateIsArchived(employee,id).subscribe(
      (res) => {
        this.showToast('success','SUCESS','Item Is Archived');
        this.router.navigate(['/hr/employee/list_']).then(() => {
          this.getEmpsAsc();  
         });
      }, (err) =>{
        this.showToast('danger','Danger', err.data);
      }
    )*/
  }




}


function htmlToPdfmake(innerHTML: any) {
  throw new Error('Function not implemented.');
}


