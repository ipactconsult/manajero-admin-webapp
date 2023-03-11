import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Department } from '../../../models/Department';
import { SubDepartment } from '../../../models/SubDepartment';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { SubDepartmentService } from '../../../services/departmentservices/subDepartmentService/sub-department.service';
import {Level} from "../../../models/Level";
import {LevelService} from "../../../services/levelServices/level.service";
 
declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {Browser} from 'leaflet';
import { ExportService } from '../../../../../shared/exports/export.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-view-organigram',
  templateUrl: './view-organigram.component.html',
  styleUrls: ['./view-organigram.component.scss'],
})
export class ViewOrganigramComponent implements OnInit {


  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Organigram',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
  }

  constructor(private exportService : ExportService, private ls : LevelService, private sds: SubDepartmentService, private ds: DepartmentService) { }

  list;
  subList : SubDepartment [] =  [];
  lvlsList : Level [] = [];

  nodes : any [] = [];
  ngOnInit(): void {
    this.getAllLvls();
    this.getDepartments();
    this.getAllSubDepartments();

  }
   
  getDepartments() {
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { 
        this.list = data;
        
          } , (err) => {
          console.log(err);
      },
    );
  }

  getAllSubDepartments()
  {
    this.sds.findAll().subscribe(
      (data: SubDepartment[])=>{ this.subList = data;
      }
      ,(err)=>{console.log(err);}
    )
  }

  getAllLvls()
  {
    this.ls.findAll().subscribe(
      (data: Level[])=>{ this.lvlsList = data;
      
      }
      ,(err)=>{console.log(err);}
    )
  }
  

  public openPDF(): void {
    
    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 400;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('l', 'mm', 'a3');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('organigram.pdf');
    });
  }



}
