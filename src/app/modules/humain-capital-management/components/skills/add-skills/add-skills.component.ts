import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Employee } from '../../../models/Employee';
import {Skills} from '../../../models/Skills';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import {SkillsService} from '../../../services/skillsService/skills.service';

@Component({
  selector: 'ngx-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Create New Skill';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  
  skill : Skills = new Skills();
  emp : Employee = new Employee();

  list: Employee[] = [];
  formSkills : FormGroup;
  selectedItem: string="" ;

  user : any;


  constructor(private tokenStorageService: TokenStorageService,private es : EmployeeService, private skillsService : SkillsService,private toastrService : NbToastrService, private router: Router) { }

  ngOnInit(): void {
    this.formSkills = new FormGroup({
      skillName : new FormControl('', [Validators.required]),
      experience : new FormControl(''),
      score : new FormControl(''),
      employee : new FormControl('')
    });

    this.getAllEmps();
    this.user = this.tokenStorageService.getUser();
  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.list = data.filter((e)=>e.isArchived === 'No');  }, (err) => {
        console.log(err);
      },
    );
  }

  get skillName() { return this.formSkills.get("skillName");}
  get experience() { return this.formSkills.get("experience");}
  get score() { return this.formSkills.get("score");}
  get employee() { return this.formSkills.get("employee");}

  getEmployeeSelected(event){
    this.showToast('success','SUCESS','Employee Selected');
    this.selectedItem=event;
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


  addNew()
  {
    this.emp.id=this.selectedItem;
    this.skill.employee= this.emp;
    this.skill.user =  this.user.email;
    this.skillsService.add(this.skill).subscribe(()=>{
      this.showToast('success','SUCESS','Created Successfuly');
      this.router.navigate(["/hr/skills/grid"]).then(()=>{
          console.log("Skills");
      })
    },(err)=>{console.log(err);})
  }

}
