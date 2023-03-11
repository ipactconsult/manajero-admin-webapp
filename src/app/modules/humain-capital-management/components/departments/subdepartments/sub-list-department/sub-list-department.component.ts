import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbDialogService } from '@nebular/theme';
import { SubDepartment } from '../../../../models/SubDepartment';
import { SubDepartmentService } from '../../../../services/departmentservices/subDepartmentService/sub-department.service';
import {ExportService} from "../../../../../../shared/exports/export.service";

@Component({
  selector: 'ngx-sub-list-department',
  templateUrl: './sub-list-department.component.html',
  styleUrls: ['./sub-list-department.component.scss']
})
export class SubListDepartmentComponent implements OnInit {

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
  pageSize : number = 9;


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
