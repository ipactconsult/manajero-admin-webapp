import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbDialogService } from '@nebular/theme';
import { SubDepartment } from '../../../../models/SubDepartment';
import { SubDepartmentService } from '../../../../services/departmentservices/subDepartmentService/sub-department.service';
import {ExportService} from "../../../../../../shared/exports/export.service";

@Component({
  selector: 'ngx-table-sub-department',
  templateUrl: './table-sub-department.component.html',
  styleUrls: ['./table-sub-department.component.scss']
})
export class TableSubDepartmentComponent implements OnInit {

  myDate = new Date().toDateString();

  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Sub Departments Data',
    templateString: `<header>Sub departments Data \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  }

  pageSize : number = 10;
  subList : SubDepartment [] = [];
  id:string;
  config : NbToastrConfig;
  title = 'Remove Data';
  content = 'Operation achieved Successfuly';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  current : number = 1;

  constructor(private exportService: ExportService,private toastrService : NbToastrService, private router:Router,private sds: SubDepartmentService, private dialogService : NbDialogService) { }

  ngOnInit(): void {
    this.getAllSubDepartments();
  }

  getAllSubDepartments()
  {
    this.sds.findAll().subscribe(
      (data: SubDepartment[])=>{ this.subList = data;}
      ,(err)=>{console.log(err);}
    )
  }

  deleteSubDepartment(subDepartment : SubDepartment){
    this.sds.deleteSubDepartment(subDepartment).subscribe(
      ()=>{
        this.showToast('success','SUCESS','Deleted Successfuly, Reload your page');
        window.location.reload();
      },
      ()=>{this.showToast('danger','FAILURE','Could not delete Sub department');}
      
    )
    
  }


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.subList, 'dataSubDepartments');
  }


}
