import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { ExportService } from '../../../../../shared/exports/export.service';
import { GraphicalCharter } from '../../../models/graphical-charter';

import {GraphicalCharterService} from '../../../services/graphical-charter.service' ;
import * as pdfMake from "pdfmake/build/pdfmake";

@Component({
  selector: 'ngx-graphical-charter',
  templateUrl: './graphical-charter.component.html',
  styleUrls: ['./graphical-charter.component.scss']
})
export class GraphicalCharterComponent implements OnInit {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  current : number = 1;
  
  config : NbToastrConfig;
  title = 'Create GraphicalCharter';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  list: GraphicalCharter[] = [];
  countries : any [] = [];


  pageSize:number = 4;

  
  searchbyfields: string;

  dataGraphicalCharters:  GraphicalCharter [] = [];


  constructor(private exportService: ExportService, private router: Router, private graphicalCharterService: GraphicalCharterService,  private ws : NbWindowService , private dialogService : NbDialogService , private toastrService : NbToastrService) { }

  handlePageChange(event) {
    this.current = event;
    console.log(this.current);
}




ngOnInit(): void {
  this.getAllGraphicalCharters();
}

getAllGraphicalCharters(){
  this.graphicalCharterService.findAll().subscribe(
    (data: GraphicalCharter[]) => {
      this.dataGraphicalCharters = data;

    }
  );
}

  getChartDesc() {
 
  }
  getChatAsc() {

  }

  getAllCharts() {
  
  }
  filtre(e,x) {
   
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

  deleteChart(g : GraphicalCharter){
    this.graphicalCharterService.deleteGraphicalCharter(g.id).subscribe(
      (result) => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        this.router.navigate(['/hr/employee/list_']).then(() => {
          this.getChatAsc();  
         });
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete Chart');
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
    this.exportService.exportAsExcelFile(this.list, 'dataGraphicalCharters');
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { 
      pageOrientation: 'landscape',
      pageSize: 'A3',
      content: [html],
     };
 
//   pdfMake.createPdf(documentDefinition).download(); 
     
  }

 updateIsEmployeeArchived(g : GraphicalCharter, id: string){
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
