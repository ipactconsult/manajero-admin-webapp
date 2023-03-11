import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { Level } from '../../../models/Level';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { LevelService } from '../../../services/levelServices/level.service';

@Component({
  selector: 'ngx-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  config : NbToastrConfig;
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  department : Department;
  id: string;
  listDepts : Department [] = [];
  listEmps:Employee[]= [];
  listLvls: Level []=[];
  selectedItem :any [] = [];
  employeeSelected: string ="";
  emp: Employee = new Employee();
  levelSelected: string="";
  level_: Level = new Level();
  
  constructor(private ls : LevelService, private es : EmployeeService, private ds: DepartmentService, private toastrService : NbToastrService, private route: ActivatedRoute, private router : Router) { 
    
  }

  ngOnInit(): void {
    this.loadDataEmps();
    this.loadDataLvls();
    this.department = new Department();
    this.id = this.route.snapshot.params["id"];

    this.ds.getDepartment(this.id).subscribe(data=>{
      console.log(data)
      this.department = data;
    }, error => console.log(error)
    )
  }

  getEmployeeSelected(event){
    this.employeeSelected = event;
  }
  getLevelSelected(event){
    this.levelSelected = event;
  }

  loadDataLvls(){
    this.ls.findAll().subscribe(
      (data: Level[]) => { 
        this.listLvls = data;       
      } , (err) => {
          console.log(err);
      },
    );
  }

  loadDataEmps(){
    this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => { 
        this.listEmps = data.filter((e)=>e.roleEmployee === 'Manager');       
      } , (err) => {
          console.log(err);
      },
    );
  }

  editDept(){
    
    this.emp.id = this.employeeSelected;
    this.department.employee = this.emp;
    this.level_.id = this.levelSelected;
    this.department.level = this.level_;
    this.ds.updateDepartment(this.id, this.department).subscribe(
      (res) => {  
        console.log(res);
        this.showToast('success','SUCESS','Data Updated Successfuly');
        this.department = new Department();
        this.router.navigate(['/hr/department/list']);
    }, (err) => {
        console.log(err);
        this.showToast('danger','FAILURE','Could not Update department');
    }
    )
  }

  onSubmit(){
    this.editDept();
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


}
