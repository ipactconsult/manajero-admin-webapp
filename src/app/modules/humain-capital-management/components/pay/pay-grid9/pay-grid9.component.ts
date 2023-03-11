import { Component, OnInit } from '@angular/core';
import {Pay} from "../../../models/Pay";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from "@nebular/theme";
import {PayService} from "../../../services/payService/pay.service";
import {Employee} from "../../../models/Employee";
import {Department} from "../../../models/Department";
import {EmployeeService} from "../../../services/employeeServices/employee.service";
import {DepartmentService} from "../../../services/departmentservices/department.service";
import {ExportService} from "../../../../../shared/exports/export.service";

@Component({
  selector: 'ngx-pay-grid9',
  templateUrl: './pay-grid9.component.html',
  styleUrls: ['./pay-grid9.component.scss']
})
export class PayGrid9Component implements OnInit {

  pay : Pay;
  list : Pay[]=[];
  employees : Employee[]=[];
  departments : Department[]=[];
  current =1;
  search : string ="";
  pageSize = 9;
  config : NbToastrConfig;
  title = 'Data Loaded Successfuly';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  constructor(private exportService: ExportService,private es: EmployeeService, private ds: DepartmentService, private ps: PayService,private toastrService : NbToastrService) { }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.list, 'list');
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

  ngOnInit(): void {
    this.getData();
    this.getEmployees();
    this.getDepartments();
  }
  getData()
  {
    this.ps.findAll().subscribe(
      (data : Pay[])=> {this.list = data;
        this.showToast('success','SUCESS','Data Loaded Successfuly');
        ;  },
      (err)=> {      this.showToast('danger','DANGER','Error While Retrieving Data');;}
    )
  }

  getEmployees(){
    this.es.findAll().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  getDepartments(){
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => {
        this.departments = data;
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }
  filterByEmployee(e) {
    this.ps.findAll().subscribe(
      (data: Pay[]) => {
        this.list = [];
        this.list = data.filter(
          (d =>
              //@ts-ignore
              d?.contract.employee?.id === e
          )
        );
        this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByDepartment(e) {
    this.ps.findAll().subscribe(
      (data: Pay[]) => {
        this.list = [];
        this.list = data.filter(
          (d =>
              //@ts-ignore
              d?.contract.employee?.department?.id === e
          )
        );
        this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  getAscMonthlyCost()
  {
    this.list = this.list.sort(
      (a,b)=>
        a?.contract?.overallMonthlyCost - b?.contract?.overallMonthlyCost
    )
  }

  getDescMonthlyCost()
  {
    this.list = this.list.sort(
      (a,b)=>
        b?.contract?.overallMonthlyCost - a?.contract?.overallMonthlyCost
    )
  }

  getAscGain()
  {
    this.list = this.list.sort(
      (a,b)=>
        a?.gain - b?.gain
    )
  }

  getDescGain()
  {
    this.list = this.list.sort(
      (a,b)=>
        b?.gain - a?.gain
    )
  }

  getAscNet()
  {
    this.list = this.list.sort(
      (a,b)=>
        a?.netSalary - b?.netSalary
    )
  }

  getDescNet()
  {
    this.list = this.list.sort(
      (a,b)=>
        b?.netSalary - a?.netSalary
    )
  }


}
