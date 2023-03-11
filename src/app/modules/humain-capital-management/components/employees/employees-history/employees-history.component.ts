import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbWindowService, NbDialogService, NbToastrService } from '@nebular/theme';
import { ExportService } from '../../../../../shared/exports/export.service';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import GoogleCountries from "../../../services/googlecountries.json";

@Component({
  selector: 'ngx-employees-history',
  templateUrl: './employees-history.component.html',
  styleUrls: ['./employees-history.component.scss']
})
export class EmployeesHistoryComponent implements OnInit {

  myDate = new Date().toDateString();

  

  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Employees Data',
    templateString: `<header>Employees Data \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  }

  pageSize:number = 10;

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

  NotAssignedYet: string ="Not Assigned"
  
  searchbyfields : string;
  constructor(private router:Router, private datePipe: DatePipe,private exportService: ExportService,private es: EmployeeService, private ds: DepartmentService,private ws : NbWindowService , private dialogService : NbDialogService , private toastrService : NbToastrService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }
  getEmpsDesc() {
    this.es.findAllEmployeesDesc().subscribe(
      (data: Employee[]) => { this.list = data.filter((e)=>e.isArchived ==='Yes'); console.log(data) }, (err) => {
        console.log(err);
      },
    );
  }
  getEmpsAsc() {
    this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => { this.list = data.filter((e)=>e.isArchived ==='Yes');  }, (err) => {
        console.log(err);
      },
    );
  }
  filtre(e,x) {
    this.es.findAllEmployeesAsc().subscribe(
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

  filtreDepartment(d,x) {
    this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => {
        this.list = []
        console.log(d);
        this.list = data.filter(
          (empl =>
              x == 'Department' ? empl.department === d : null
          )

        )
      }, (err) => {
        return err;
      })
  }

  getEmpsByGender(e,x) {
    this.filtre(e,x);
  }

  getEmpsByRole(e,x) {
    this.filtreRole(e,x);
  }

  getEmpsByDepartment(d,x) {
    this.filtreDepartment(d,x);
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
      `Toast ${titleContent}`,
      config);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.list, 'dataEmployees');
  }

  ngOnInit(): void {
    this.getEmpsAsc();
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { this.listd = data; }, (err) => {
        console.log(err);
      },
    );

    this.countries = GoogleCountries;
  }

  updateIsEmployeeRestored(employee: Employee, id: string){
    this.es.updateIsRestored(employee,id).subscribe(
      (res) => {
        this.showToast('success','SUCESS','Item Is Restored');
        this.router.navigate(['/hr/employee/history']).then(() => {
          this.getEmpsAsc();  
         });
      }, (err) =>{
        this.showToast('danger','Danger', err.data);
      }
    )
  }


}
