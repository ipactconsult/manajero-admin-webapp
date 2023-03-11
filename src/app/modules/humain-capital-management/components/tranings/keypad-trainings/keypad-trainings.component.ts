import { Component, OnInit } from '@angular/core';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Employee } from '../../../models/Employee';
import { Training } from '../../../models/Training';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { TrainingService } from '../../../services/trainingServices/training.service';

@Component({
  selector: 'ngx-keypad-trainings',
  templateUrl: './keypad-trainings.component.html',
  styleUrls: ['./keypad-trainings.component.scss']
})
export class KeypadTrainingsComponent implements OnInit {

  employees : Employee[]=[];
  searchbyfields = "";
  DT : string ="Hrs"
  config : NbToastrConfig;
  title = 'Data Loaded Successfuly';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;


  trainings : Training[]=[];
  pageSize= 9 ;
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

  constructor(private es: EmployeeService, private trainingService : TrainingService, private toastrService : NbToastrService) { }

  ngOnInit(): void {
    this.getTrainings();
    this.getAllEmps();
  }

  getTrainings()
  {
    this.trainingService.findAll().subscribe((data:Training[])=>{
      this.trainings = data;
      this.showToast('success','SUCESS','Data Loaded Successfuly');
    }, ()=>{
      this.showToast('danger','DANGER','Error While Loading Data');
    })
  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.employees = data.filter((e)=>e.isArchived === 'No');  }, (err) => {
        console.log(err);
      },
    );
  }


  getTrainingsClick()
  {
    this.trainingService.findAll().subscribe((data:Training[])=>{
      this.trainings = data;
      this.showToast('success','SUCESS','Data Loaded Successfuly');
    }, ()=>{
      this.showToast('danger','DANGER','Error While Loading Data');
    })
  }

  filterByEmployee(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
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

  filterByCostLess200(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                d.cost <= 200
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByCostBetwwen200AND400(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                d.cost >= 200 && d.cost <= 400
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByCostBetwwen400AND800(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                d.cost >= 400 && d.cost <= 800
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByCostMoreThen800(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                d.cost >= 800
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }


  filterByStartDate(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                d.startDate === e
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByObjects(e) {
    console.log(e);
    
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                //@ts-ignore
                d.object === e
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByHours(e) {
    this.trainingService.findAll().subscribe(
      (data: Training[]) => {
        this.trainings = [];
        this.trainings = data.filter(
            (d =>
                d.nbHours === e
            )
          );  
        
            
          this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }


  getAscObject()
  {
    this.trainings = this.trainings.sort(
      (a,b)=> 
        a['object'].localeCompare(b['object'])
      )    
  }

  getDescObject()
  {
    this.trainings = this.trainings.sort(
      (a,b)=> 
       b['object'].localeCompare(a['object'])
      )
  }


 
  getAscHours()
  {
    this.trainings = this.trainings.sort(
      (a,b)=> 
        a.nbHours - b.nbHours
      )    
  }

  getDescHours()
  {
    this.trainings = this.trainings.sort(
      (a,b)=> 
        b.nbHours - a.nbHours
      )
  }


  getAscCost()
  {
    this.trainings = this.trainings.sort(
      (a,b)=> 
        a.nbHours - b.nbHours
      )    
  }

  getDescCost()
  {
    this.trainings = this.trainings.sort(
      (a,b)=> 
        b.nbHours - a.nbHours
      )
  }


}
