import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { Release } from '../../../models/Release';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { ReleaseService } from '../../../services/releaseServices/release.service';

@Component({
  selector: 'ngx-grid-releases',
  templateUrl: './grid-releases.component.html',
  styleUrls: ['./grid-releases.component.scss']
})
export class GridReleasesComponent implements OnInit {

  releases : Release []=[];
  employees : Employee []=[];
  departments : Department[]=[];
  searchbyfields : string ="";
  pageSize = 4;
  current = 1;
  constructor(private releaseService : ReleaseService
            , private employeeService : EmployeeService
            , private departmentService : DepartmentService) { }

  ngOnInit(): void {
    this.getReleases();

    this.getEmployees();
    this.getDepartments();
  }

  getReleases()
  {
    this.releaseService.findAll().subscribe(
      (data : Release[]) =>{this.releases = data.filter(
        (r=>r.releaseStatus=== 'Pending'|| r.releaseStatus=== 'Accepted'|| r.releaseStatus=== 'Rejected')
      );},
      (err)=>{console.log(err);}
    )
  }

  getReleasesAsc()
  {
    this.releaseService.findAllASC().subscribe(
      (data : Release[]) =>{this.releases = data.filter(
        (d =>
          //@ts-ignore
          d.releaseStatus==='Pending'||d.releaseStatus==='Accepted'||d.releaseStatus==='Rejected'
      )
      );},
      (err)=>{console.log(err);}
    )
  }

  getReleasesDesc()
  {
    this.releaseService.findAllDesc().subscribe(
      (data : Release[]) =>{this.releases = data.filter(
        (d =>
          //@ts-ignore
          d.releaseStatus==='Pending'||d.releaseStatus==='Accepted'||d.releaseStatus==='Rejected'
      )
      );},
      (err)=>{console.log(err);}
    )
  }

  getEmployees()
  {
    this.employeeService.findAll().subscribe(
      (data : Employee[]) =>{this.employees = data.filter((e)=>e.isArchived=== 'No');},
      (err)=>{console.log(err);}
    )
  }

  getDepartments()
  {
    this.departmentService.findAllDepts().subscribe(
      (data : Department[]) =>{this.departments = data.filter((d)=>d.isArchived==='No');},
      (err)=>{console.log(err);}
    )
  }

  
  filterByEmployee(e) {
    this.releaseService.findAll().subscribe(
      (data: Release[]) => {
        this.releases = [];
        this.releases = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.id === e && d.releaseStatus==='Pending'||d.releaseStatus==='Accepted'||d.releaseStatus==='Rejected'
          )
        );
      }, (err) => {
        return err;
      });
  }

  filterByDepartment(e) {
    this.releaseService.findAll().subscribe(
      (data: Release[]) => {
        this.releases = [];
        this.releases = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.department?.id === e 
          )
        );
      }, (err) => {
        return err;
      });
  }

  filterByStatus(e) {
    this.releaseService.findAll().subscribe(
      (data: Release[]) => {
        this.releases = [];
        this.releases = data.filter(
          (d =>
              //@ts-ignore
             d.releaseStatus === e
          )
        );
      }, (err) => {
        return err;
      });
  }




}
