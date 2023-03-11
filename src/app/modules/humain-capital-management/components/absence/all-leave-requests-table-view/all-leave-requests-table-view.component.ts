import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { LeaveRequestService } from '../../../services/leaveRequestServices/leave-request.service';

@Component({
  selector: 'ngx-all-leave-requests-table-view',
  templateUrl: './all-leave-requests-table-view.component.html',
  styleUrls: ['./all-leave-requests-table-view.component.scss']
})
export class AllLeaveRequestsTableViewComponent implements OnInit {

  leaves : LeaveRequest[] = [];
  leave : LeaveRequest = new LeaveRequest();
  id : string ;
  requestStatus;

  employees : Employee[]=[];
  indexEmp ; 
  indexLea ;
  departments : Department[]=[];

  pageSize = 11;
  current  = 1;

  sum_duration ;
  s ;

  config : NbToastrConfig;
  title = 'Request is Approved';
  content = 'The leave request is approved. An email is sended to the employee.';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  constructor(private rs : LeaveRequestService
            , private toastrService : NbToastrService
            , private router: Router
            , private es : EmployeeService
            , private ds: DepartmentService) { }
  
  getAll()
  {
    this.rs.findAllRequests().subscribe(
      (res: LeaveRequest[])=>{
        this.leaves = res.filter(
          (d)=> 
            d.requestStatus==='Await For Validation'           
          ||d.requestStatus==='Validate'
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
          (d)=>
          d.requestStatus==='Await For Validation'            
          ||d.requestStatus==='Validate'
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
          (d)=> 
           d.requestStatus==='Await For Validation'            
          ||d.requestStatus==='Validate'
          ||d.requestStatus==='Rejected'
          ||d.requestStatus==='Canceled' 
        )
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  approveRequest(__id:string)
  {
   this.rs.validateRequest(this.leave, __id).subscribe(
     (res)=>{
      this.showToast('success','SUCCESS','Update Successfuly');
      console.log(res);
    /*  this.router.navigate(["/hr/absences/allLeavesRequestsTableView"]).then(
        ()=>{this.getAll();}
      )*/
     },(err)=>{
       console.log(err);
     }
   )
  }

  ngOnInit(): void {
      this.getAll();
      this.getEmployees();
      this.getDepartments();
      this.calculateSumDuration();
     
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



  getEmployees()
  {
    this.es.findEmployeesWithNameAndImage().subscribe(
      (data : Employee[]) =>{this.employees = data.filter((e)=>e.isArchived=== 'No');},
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
        this.calculateSumDuration();
        console.log(this.calculateSumDuration());
        
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

}
