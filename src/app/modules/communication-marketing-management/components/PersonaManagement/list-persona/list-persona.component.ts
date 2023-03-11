import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { ExportService } from '../../../../../shared/exports/export.service';
import { Persona } from '../../../models/persona';

import {PersonaService} from '../../../services/persona.service' ;
import * as pdfMake from "pdfmake/build/pdfmake";

import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';


@Component({
  selector: 'ngx-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.scss']
})
export class ListPersonaComponent implements OnInit {

 

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



//Initialisation
ngOnInit(): void {
  this.getAllpersonas();
  this.countries = GoogleCountries;
}

// Get All Personas
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
// Get All Persona Desc
  getPersonaDesc() {
    this.personaService.findAllPartnerNomDesc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
          (c => c.archive === false )
        );
  
      }, (err) => {
        return err;
      }
      );
  
  }
  // Get All Persona Asc 
  getPersonaAsc() {
    this.personaService.findAllPartnerNomAsc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
          (c => c.archive === false )
        );
  
      }, (err) => {
        return err;
      }
  );

  }

// Get All  Persona by Prenom DESC
  getPersonaPrenomDesc() {
    this.personaService.findAllPartnerPrenomDesc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
          (c => c.archive === false )
        );
  
      }, (err) => {
        return err;
      }
      );
  
  }

  // Get All  Persona by Prenom ASC

  getPersonaPrenomAsc() {
    this.personaService.findAllPartnerPrenomAsc().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = data.filter(
          (c => c.archive === false )
        );
  
      }, (err) => {
        return err;
      }
  );

  }



  // Filter by Gender 
  filtrGender(e,x) {
    this.personaService.getPersonas().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = []
        this.dataPersonas = data.filter(
          (p =>
              p.gender === e 
          )
        )
      }, (err) => {
        return err;
      })
  }
  // Filter By Situation
  filtreSituation(e,x) {
    this.personaService.getPersonas().subscribe(
      (data: Persona[]) => {
        this.dataPersonas = []
        this.dataPersonas = data.filter(
          (p =>
              p.situation === e 
          )
        )
      }, (err) => {
        return err;
      })
  }

  

  getPersonasByGender(e,x) {
        this.filtrGender(e,x);
  }
  
  getPersonasBySituation(e,x) {
    this.filtreSituation(e,x);
}  

 
  
// pop up 

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }

  // Delete perona
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

  // Refrech
  refresh(): void {
    window.location.reload();
  }
  // Notification Toast 
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
      `Persona ${titleContent}`,
      config);
  }

  // Exort EXcel
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.list, 'dataPersonas');
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

// Achive Persona
  onArchiveConfirm(p: Persona, id: string) {


    this.personaService.archivePersona(p, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'Persona Archived !!');
        this.ngOnInit();
      });

}




getPersonabyCountry(e, x) {
  this.filtrePersonaByCountry(e, x);
}

filtrePersonaByCountry(e, x) {
  this.personaService.getPersonas().subscribe(
    (data: Persona[]) => {
      this.dataPersonas = [];
      console.log(e);
      this.dataPersonas = data.filter(
        (p =>
            x == 'localisation' ? p.localisation === e : p.localisation === e
        )
      );
    }, (err) => {
      return err;
    });
}




}


function htmlToPdfmake(innerHTML: any) {
  throw new Error('Function not implemented.');
}

