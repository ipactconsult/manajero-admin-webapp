import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { LeaveRequestService } from '../../../services/leaveRequestServices/leave-request.service';

@Component({
  selector: 'ngx-all-leave-requests-grid-view',
  templateUrl: './all-leave-requests-grid-view.component.html',
  styleUrls: ['./all-leave-requests-grid-view.component.scss']
})
export class AllLeaveRequestsGridViewComponent implements OnInit {

  leaves : LeaveRequest[] = [];
  employees : Employee[]=[];
  departments : Department[]=[];

  pageSize = 4;
  current  = 1;

  sum_duration ;
  s ;


  constructor(private rs : LeaveRequestService,
              private es: EmployeeService,
              private ds: DepartmentService) { }

  getAll()
  {
    this.rs.findAllRequests().subscribe(
      (res: LeaveRequest[])=>{
        this.leaves = res.filter(
          (d)=> d.requestStatus==='Validate'
          ||d.requestStatus==='Await For Validation'           
          ||d.requestStatus==='Rejected'
          ||d.requestStatus==='Canceled' 
        )
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getAllAsc()
  {
    this.rs.findAllRequestsAsc().subscribe(
      (res: LeaveRequest[])=>{
        this.leaves = res.filter(
          (d)=> d.requestStatus==='Validate'
          ||d.requestStatus==='Await For Validation'           
          ||d.requestStatus==='Rejected'
          ||d.requestStatus==='Canceled' 
        )
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getAllDesc()
  {
    this.rs.findAllRequestsDesc().subscribe(
      (res: LeaveRequest[])=>{
        this.leaves = res.filter(
          (d)=> d.requestStatus==='Validate'
          ||d.requestStatus==='Await For Validation'           
          ||d.requestStatus==='Rejected'
          ||d.requestStatus==='Canceled' 
        )
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  ngOnInit(): void {
      this.getAll();
      this.getEmployees();
      this.getDepartments();
  }

  getEmployees()
  {
    this.es.findEmployeesWithNameAndImage().subscribe(
      (data : Employee[]) =>{this.employees = data},
      (err)=>{console.log(err);}
    )
  }

  getDepartments()
  {
    this.ds.findAllDepts().subscribe(
      (data : Department[]) =>{this.departments = data.filter((d)=>d.isArchived==='No');},
      (err)=>{console.log(err);}
    )
  }

  res = "";
  calculateSumDuration()
  {
    let tt = 0;
    for(let i=0; i< this.leaves.length ; i++)
    {
      tt+= this.leaves[i].duration;
    }
    if(tt === 1)
    {
      this.res = "Sum : "+tt + " day";
    }else{
    this.res = "Sum : "+tt + " days";}
    return this.res;

  }

  //Request Status :Draft ,  Await For Validation , Approved , Rejected , Canceled
  getRequestByStatus(e){
    this.rs.findAllRequests().subscribe(
       (data: LeaveRequest[])=>{
         this.leaves = data.filter(
           (r=>r.requestStatus === e)
         );
       },(err)=>{console.log(err);
       }
      )
  }

  getRequestByStart(e){
    this.rs.findAllRequests().subscribe(
       (data: LeaveRequest[])=>{
         this.leaves = data.filter(
           (r=>r.start === e)
         );
       },(err)=>{console.log(err);
       }
      )
  }

  
  getRequestByEnd(e){
    this.rs.findAllRequests().subscribe(
       (data: LeaveRequest[])=>{
         this.leaves = data.filter(
           (r=>r.end === e)
         );
       },(err)=>{console.log(err);
       }
      )
  }

  filterByEmployee(e) {
    this.rs.findAllRequests().subscribe(
      (data: LeaveRequest[]) => {
        this.leaves = [];
        this.leaves = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.id === e && (d.requestStatus==='Await For Validation'
              || d.requestStatus==='Validate'
              ||d.requestStatus==='Rejected'
              ||d.requestStatus==='Canceled')
          )
        );
      }, (err) => {
        return err;
      });
  }

  filterByDepartment(e) {
    this.rs.findAllRequests().subscribe(
      (data: LeaveRequest[]) => {
        this.leaves = [];
        this.leaves = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.department?.id === e 
          )
        );
      }, (err) => {
        return err;
      });
  }




}
