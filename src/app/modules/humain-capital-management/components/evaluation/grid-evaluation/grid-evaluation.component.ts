import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Employee } from '../../../models/Employee';
import { Evaluation } from '../../../models/Evaluation';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { EvaluationService } from '../../../services/EvaluationService/evaluation.service';

@Component({
  selector: 'ngx-grid-evaluation',
  templateUrl: './grid-evaluation.component.html',
  styleUrls: ['./grid-evaluation.component.scss']
})
export class GridEvaluationComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Create New Skill';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  
  searchbyfields : string ="";
  evaluations : Evaluation[]=[];
  employees : Employee[]=[];

  pageSize= 4;
  current = 1;
  constructor(private es : EmployeeService, private evaluationService : EvaluationService, private toastrService : NbToastrService) { }

  ngOnInit(): void {
    this.getEvaluations();
    this.getAllEmps();
  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.employees = data }, (err) => {
        console.log(err);
      },
    );
  }

  filterByEmployee(e) {
    this.evaluationService.findAll().subscribe(
      (data: Evaluation[]) => {
        this.evaluations = [];
        this.evaluations = data.filter(
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

  filterByType(e) {
    console.log(e);
    
    this.evaluationService.findAll().subscribe(
      (data: Evaluation[]) => {
        this.evaluations = [];
        this.evaluations = data.filter(
            (d =>        
               d.evaluationType === e
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
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


  getEvaluations()
  {
    this.evaluationService.findAll().subscribe(
      (data: Evaluation[]) => 
        {
           this.evaluations = data;  
           this.showToast('success','SUCESS','Data Loaded Successfuly');
        }, (err) => {
          this.showToast('danger','DANGER','Error While Retrieving Data');

      },
    );
  }


  getEvaluationsAsc()
  {
    this.evaluations = this.evaluations.sort(
      (a,b)=> 
        a['limitDate'].toLocaleString().localeCompare(b['limitDate'].toLocaleString())
      )  
      
      this.showToast('success','SUCESS','Data Sorted Successfuly');
  }

  getEvaluationsDesc()
  {
    this.evaluations = this.evaluations.sort(
      (a,b)=> 
        b['limitDate'].toLocaleString().localeCompare(a['limitDate'].toLocaleString())
      )
      this.showToast('success','SUCESS','Data Sorted Successfuly');

  }

}
