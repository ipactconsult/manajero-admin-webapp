import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {
  NbComponentStatus, NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService,
  NbWindowService
} from "@nebular/theme";
import {Department} from "../../../models/Department";
import {SubDepartment} from "../../../models/SubDepartment";
import {ExportService} from "../../../../../shared/exports/export.service";
import {SubDepartmentService} from "../../../services/departmentservices/subDepartmentService/sub-department.service";
import {DepartmentService} from "../../../services/departmentservices/department.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-table-department',
  templateUrl: './table-department.component.html',
  styleUrls: ['./table-department.component.scss']
})
export class TableDepartmentComponent implements OnInit {

  NoData = "No Data Available";
  
  myDate = new Date().toDateString();

  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Employees Data',
    templateString: `<header>Departments Data \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  }
  current : number = 1;

  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  searchbyfields : string;

  pageSize:number = 10;
  
  count;

  id;

  list: Department[] = [];
  subList : SubDepartment [] =  [];
  @Output() addDep = new EventEmitter<Department>();
  constructor(private exportService: ExportService, private sds: SubDepartmentService,private ds: DepartmentService, private windowService: NbWindowService, private router: Router, private dialogService: NbDialogService,private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getAllSubDepartments();
    this.count = this.getCountDepts();
  }

  getDepartments() {
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { this.list = data;  } , (err) => {
        console.log(err);
      },
    );
  }

  getAllSubDepartments()
  {
    this.sds.findAll().subscribe(
      (data: SubDepartment[])=>{ this.subList = data; }
      ,(err)=>{console.log(err);}
    )
  }


  getCountDepts()  {
    this.ds.countDepts().subscribe(
      (data : number) => {this.count = data, (err)=>{
        console.log(err);
      }}
    )
  }
  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Create new department',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }

  add_dep(d: Department) {
    this.addDep.emit(d);
  }

  delete_dep(department : Department){
    this.ds.deleteDept(department).subscribe(
      (result) => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        window.location.reload();
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete department');
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

  deleteSubDepartment(subDepartment : SubDepartment){
    this.sds.deleteSubDepartment(subDepartment).subscribe(
      ()=>{
        this.showToast('success','SUCESS','Deleted Successfuly');
        this.router.navigate(['/hr/department/list']).then(r => console.log(r));
        this.refresh();
      }
    )
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.list, 'dataDepartments');
  }

  updateIsDepartmentArchived(department: Department, id: string){
    this.ds.updateIsArchived(department,id).subscribe(
      (res) => {
        this.showToast('success','SUCESS','Item Is Archived');
        this.router.navigate(['/hr/department/table']).then(() => {
          this.getDepartments();  
         });
      }, (err) =>{
        this.showToast('danger','Danger', err.data);
      }
    )
  }

}
