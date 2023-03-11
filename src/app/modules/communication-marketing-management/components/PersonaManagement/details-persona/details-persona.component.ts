import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Persona} from "../../../models/persona";
import {PersonaService} from "../../../services/persona.service";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
@Component({
  selector: 'ngx-details-persona',
  templateUrl: './details-persona.component.html',
  styleUrls: ['./details-persona.component.scss']
})
export class DetailsPersonaComponent implements OnInit {

  idE;
  persona: Persona = new Persona();
  visits;


  constructor(private personaService: PersonaService, private activatedroute: ActivatedRoute   ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.personaService.getPersonaById(this.idE).subscribe(data => {
      this.persona = data;
      error => console.log(error);
    });



  }
 
  @ViewChild("PersonaData")
  PersonaData!: ElementRef;
  DATA_CATEGORIES: any;
  fileWidth: number;
  fileHeight: any;
  FILE_URI: any;
  PDF: any;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;


  exportPDF(): void {
    this.DATA_CATEGORIES = document.getElementById("PersonaData");
    html2canvas(this.DATA_CATEGORIES).then((canvaToUse) => {
      this.fileWidth = 208;
      this.fileHeight = (canvaToUse.height * this.fileWidth) / canvaToUse.width;
      this.FILE_URI = canvaToUse.toDataURL("image/png");
      this.PDF = new jsPDF("p", "mm", "a4");
      this.PDF.addImage(
        this.FILE_URI,
        "PNG",
        0,
        this.position,
        this.fileWidth,
        this.fileHeight
      );
      this.PDF.save("ManaZello_All_personas.pdf");
    });
    
  }


}
