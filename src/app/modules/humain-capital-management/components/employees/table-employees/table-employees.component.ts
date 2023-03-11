import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbComponentStatus, NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {Employee} from "../../../models/Employee";
import {Department} from "../../../models/Department";
import {EmployeeService} from "../../../services/employeeServices/employee.service";
import {DepartmentService} from "../../../services/departmentservices/department.service";
import GoogleCountries from "../../../services/googlecountries.json";
import {ExportService} from "../../../../../shared/exports/export.service";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-table-employees',
  templateUrl: './table-employees.component.html',
  styleUrls: ['./table-employees.component.scss']
})
export class TableEmployeesComponent implements OnInit {

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

  current =1;
  list: Employee[] = [];   

  
  listd: Department[] = [];
  countries : any [] = [];

  NotAssignedYet: string ="Not Assigned"
  
  searchbyfields : string;
  constructor(private router:Router, private datePipe: DatePipe,private exportService: ExportService,private es: EmployeeService, private ds: DepartmentService,private ws : NbWindowService , private dialogService : NbDialogService , private toastrService : NbToastrService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data  }, (err) => {
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
  getEmpsByGender(e,x) {
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
      `Toast ${titleContent}`,
      config);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.list, 'dataEmployees');
  }

  ngOnInit(): void {
    this.getAllEmps();
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { this.listd = data; }, (err) => {
        console.log(err);
      },
    );

    this.countries = GoogleCountries;
  }

  sortByNamesAsc()
  {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data.sort((a,b)=>a['employeeName'].localeCompare(b['employeeName'])) }, (err) => {
        console.log(err);
      },
    );
  }

  sortByNamesDesc()
  {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data.sort((a,b)=>b['employeeName'].localeCompare(a['employeeName'])) }, (err) => {
        console.log(err);
      },
    );
  }

  updateIsEmployeeArchived(employee: Employee, id: string){
    this.es.updateIsArchived(employee,id).subscribe(
      (res) => {
        this.showToast('success','SUCESS','Item Is Archived');
        this.router.navigate(['/hr/employee/table']).then(() => {
          this.getAllEmps();  
         });
      }, (err) =>{
        this.showToast('danger','Danger', err.data);
      }
    )
  }

   

}
