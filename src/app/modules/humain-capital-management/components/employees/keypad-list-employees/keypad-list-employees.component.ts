import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbWindowService, NbDialogService, NbToastrService } from '@nebular/theme';
import { ExportService } from '../../../../../shared/exports/export.service';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import GoogleCountries from '../../../services/googlecountries.json';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {Browser} from 'leaflet';
import win = Browser.win;
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'ngx-keypad-list-employees',
  templateUrl: './keypad-list-employees.component.html',
  styleUrls: ['./keypad-list-employees.component.scss']
})
export class KeypadListEmployeesComponent implements OnInit {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  current : number = 1;
  
  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  list: Employee[] = [];
  listd: Department[] = [];
  countries : any [] = [];
  
  NotAssignedYet: string ="Not Assigned Yet."

  searchbyfields: string;

  pageSize:number = 9;


  constructor(private exportService: ExportService, private router: Router, private es: EmployeeService, private ds: DepartmentService, private ws : NbWindowService , private dialogService : NbDialogService , private toastrService : NbToastrService) { }

  ngOnInit(): void {
    this.getAllEmps();
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { this.listd = data.filter((d)=>d.isArchived === 'No'); }, (err) => {
        console.log(err);
      },
    );

    this.countries = GoogleCountries;
  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data  }, (err) => {
        console.log(err);
      },
    );
  }


  sortByNamesAsc()
  {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data.sort((a,b)=>a['employeeName'].localeCompare(b['employeeName'])).filter((d)=>d.isArchived === 'No'); }, (err) => {
        console.log(err);
      },
    );
  }

  sortByNamesDesc()
  {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data.sort((a,b)=>b['employeeName'].localeCompare(a['employeeName'])).filter((d)=>d.isArchived === 'No'); }, (err) => {
        console.log(err);
      },
    );
  }
  filtre(e,x) {
    this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => {
        this.list = []
        this.list = data.filter(
          (empl =>               
              x == 'Country' ? empl.employeeCountry === e : empl.employeeCountry === e             
          )
          
        )
      }, (err) => {
        return err;
      })
  }
  filtreByGender(e,x) {
    this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => {
        this.list = []
        this.list = data.filter(
          (empl =>               
              x == 'Gender' ? empl.employeeGender === e : empl.employeeGender === e             
          )
          
        )
      }, (err) => {
        return err;
      })
  }
  filtreRole(e,x) {
    this.es.findAllEmployeesAsc().subscribe(
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
      })
  }

  filtreDepartment(d) {
    this.es.findAll().subscribe(
      (data: Employee[]) => {
        this.list = []
        this.list = data.filter(
          (empl =>  
              //@ts-ignore            
              ( empl?.department?.id === d   )      
          )
          
        )
      }, (err) => {
        return err;
      })
  }

  getEmpsByCountry(e,x) {
        this.filtre(e,x);
  }
  
  getEmpsByRole(e,x) {
    this.filtreRole(e,x);
}  

getEmpsByDepartment(d) {
  this.filtreDepartment(d);
} 
  


  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }

  deleteEmp(employee : Employee){
    this.es.deleteEmployeeById(employee).subscribe(
      (result) => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        window.location.reload();
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete Employee');
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
    this.exportService.exportAsExcelFile(this.list, 'dataEmployees');
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { 
      pageOrientation: 'landscape',
      pageSize: 'A3',
      content: [html],
     };

   // @ts-ignore
    pdfMake.createPdf(documentDefinition).download(); 

     
  }

  updateIsEmployeeArchived(employee: Employee, id: string){
    this.es.updateIsArchived(employee,id).subscribe(
      (res) => {
        this.showToast('success','SUCESS','Item Is Archived');
        this.router.navigate(['/hr/employee/keypad/list_']).then(() => {
          this.getAllEmps();  
         });
      }, (err) =>{
        this.showToast('danger','Danger', err.data);
      }
    )
  }


}
