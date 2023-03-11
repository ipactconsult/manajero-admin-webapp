import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Employee } from '../../../models/Employee';
import { Skills } from '../../../models/Skills';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { SkillsService } from '../../../services/skillsService/skills.service';

@Component({
  selector: 'ngx-table-skills',
  templateUrl: './table-skills.component.html',
  styleUrls: ['./table-skills.component.scss']
})
export class TableSkillsComponent implements OnInit {

  skills : Skills[] = [];
  employees : Employee[]=[];
  skill : Skills = new Skills();
  searchbyfields = "";
  config : NbToastrConfig;
  title = 'Data Loaded Successfuly';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  
  options: Options = {
    floor: 2,
    ceil: 10,
    disabled : true,
  };

  pageSize= 11 ;
  current = 1;
  
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


  constructor(private es: EmployeeService, private toastrService : NbToastrService, private skillService : SkillsService) { }

  ngOnInit(): void {
    this.getSkills();
    this.getAllEmps();
  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.employees = data.filter((e)=>e.isArchived === 'No');  }, (err) => {
        console.log(err);
      },
    );
  }

  getSkills()
  {
    this.skillService.findAll().subscribe((data: Skills[])=>{
      this.skills = data;
      this.showToast('success','SUCESS','Data Loaded Successfuly');
    },(err)=>{
      this.showToast('danger','DANGER','Error While Loading Data');
    })
  }

  getSkillsClick()
  {
    this.skillService.findAll().subscribe((data: Skills[])=>{
      this.skills = data;
      this.showToast('success','SUCESS','Data Loaded Successfuly');
    },(err)=>{
      this.showToast('danger','DANGER','Error While Loading Data');
    })
  }





  filterByEmployee(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.id === e 
          )
        );       
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByExperience1(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.experience <= 3
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByExperience2(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.experience >= 3 && d.experience <=5
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByExperience3(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.experience >= 5 && d.experience <=8
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByExperience4(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.experience >= 8
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByScore1(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.score <= 3
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByScore2(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.score >= 3 && d.score <=5
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByScore3(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.score >= 5 && d.score <=8
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByScore4(e) {
    this.skillService.findAll().subscribe(
      (data: Skills[]) => {
        this.skills = [];
        this.skills = data.filter(
            (d =>
                d.score >= 8
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  getSkillsAsc()
  {
    this.skills = this.skills.sort(
      (a,b)=> 
        a['skillName'].localeCompare(b['skillName'])
      )    

    this.showToast('success','SUCCESS',"You have launched a sort operation");
  }

  getSkillsDesc()
  {
    this.skills = this.skills.sort(
      (a,b)=> 
       b['skillName'].localeCompare(a['skillName'])
      )

      this.showToast('success','SUCCESS',"You have launched a sort operation");
  }
}
