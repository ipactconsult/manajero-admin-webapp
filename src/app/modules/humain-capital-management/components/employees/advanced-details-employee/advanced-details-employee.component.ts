import { DatePipe } from '@angular/common';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../models/Employee';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { LeaveRequestService} from '../../../services/leaveRequestServices/leave-request.service';
import { ReleaseService} from '../../../services/releaseServices/release.service';
import { RecommendedTrainingService} from '../../../services/recommendedTraining/recommended-training.service';

import { ExportService } from '../../../../../shared/exports/export.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {NgxPrintElementService} from "ngx-print-element";
import { FormControl, FormGroup } from '@angular/forms';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbThemeService } from '@nebular/theme';
import { Release } from '../../../models/Release';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import {Skills} from "../../../models/Skills";
import {SkillsService} from "../../../services/skillsService/skills.service";
import {Evaluation} from "../../../models/Evaluation";
import {EvaluationService} from "../../../services/EvaluationService/evaluation.service";
import {ContractService} from "../../../services/contractServices/contract.service";
import {ExpenseService} from "../../../services/expenses/expense.service";
import {Contract} from "../../../models/Contract";
import {Expenses} from "../../../models/Expenses";

@Component({
  selector: 'ngx-advanced-details-employee',
  templateUrl: './advanced-details-employee.component.html',
  styleUrls: ['./advanced-details-employee.component.scss']
})
export class AdvancedDetailsEmployeeComponent implements OnInit,OnDestroy   {
  @ViewChild('htmlData') htmlData!: ElementRef;

  day1 : number = 0;
  day2 : number = 0;
  diff : number = 0;

  newRemainder ;
  employee : Employee;
  id : string;
  date: Date;
  searchbyfields: string;

  leave_request_form : FormGroup;
  release_request_form: FormGroup;

  leaveRequest : LeaveRequest = new LeaveRequest();
  release : Release = new Release();

  leaveRequests:LeaveRequest[] = [];
  leavesDrafts : LeaveRequest[]=[];
  releases: Release[]=[];
  draftsReleases: Release[]=[];

  employees: Employee[] = [];
  skills: Skills[]=[];
  evaluation : Evaluation[]=[];
  contracts : Contract[]=[];
  expenses : Expenses[]=[];

  pageSize = 2;
  sizeDraft : number = 2;
  current  = 1;

  pageSizeD = 2;
  currentD = 1;

  pageSizeRelease = 2;
  currentRelease = 1;

  pageSizeReleaseDraft = 2;
  currentReleaseDraft = 1;

  clicked = false;

  config : NbToastrConfig;
  title = 'Send New Leave Request';
  content = 'Operation achieved, reload your page';
  _duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;


  single = [
   
   
  ];

  colorScheme: any;
  themeSubscription: any;



  user : any;
  myDate : any = new Date();

/*  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  begin()
  {
    this.countdown.begin();
  }*/
  
  constructor(
              private recService : RecommendedTrainingService,
              private theme: NbThemeService,
              private tokenStorageService: TokenStorageService
             ,public print: NgxPrintElementService
              ,private skillsService : SkillsService
              ,private evaluationService : EvaluationService
              ,private contractService : ContractService
              ,private expenseService : ExpenseService
             ,private exportService : ExportService
             ,private route: ActivatedRoute
             ,private es: EmployeeService
             ,private datePipe: DatePipe,
             private toastrService : NbToastrService
             ,private rs : LeaveRequestService
             ,private releaseService : ReleaseService) 
  {
    this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.leave_request_form = new FormGroup(
      {
        motif : new FormControl(''),
        startDate : new FormControl(''),
        start : new FormControl(''),
        endDate : new FormControl(''),
        end : new FormControl(''),
        comments : new FormControl(''),
      }
    )

    this.release_request_form = new FormGroup(
      {
        motifRelease : new FormControl(''),
        startTime : new FormControl(''),
        endTime : new FormControl(''),
        commentsRelease : new FormControl(''),
      }
    )



    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

    

  onfinish()
  {
    this.showToast("danger","Expiration Time","Time Has Been Expired");
  }
  get motif(){return this.leave_request_form.get('motif');}
  get startDate(){return this.leave_request_form.get('startDate');}
  get start(){return this.leave_request_form.get('start');}
  get endDate(){return this.leave_request_form.get('endDate');}
  get end(){return this.leave_request_form.get('end');}
  get duration(){return this.leave_request_form.get('duration');}
  get comments(){return this.leave_request_form.get('comments');}
  get remainder_quantity(){return this.leave_request_form.get('remainder_quantity');}


  get motifRelease(){return this.release_request_form.get('motifRelease');}
  get startTime(){return this.release_request_form.get('startTime');}
  get endTime(){return this.release_request_form.get('endTime');}
  get commentsRelease(){return this.release_request_form.get('commentsRelease');}


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      _duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Leave Request ${titleContent}`,
      config);
  }
  


  findRequestsByEmployee()
  {
      this.rs.allByEmployee(this.id).subscribe(
        (data : LeaveRequest[]) => {this.leaveRequests = data},
        (err)=> {console.log(err);}
      )
  }

  findRequestsByEmployee_Draft()
  {
      this.rs.allByEmployee(this.id).subscribe(
        (data : LeaveRequest[]) => {this.leavesDrafts = data.filter((e)=>e.requestStatus === 'Draft')},
        (err)=> {console.log(err);}
      )
  }

  findReleasesByEmployee()
  {
      this.releaseService.findByEmployee(this.id).subscribe(
        (data : Release[]) => {this.releases = data.filter((e)=>{e.releaseStatus==='Pending'||e.releaseStatus==='Validate'||e.releaseStatus==='Rejected'})},
        (err)=> {console.log(err);}
      )
  }

  findReleasesByEmployee_Draft()
  {
      this.releaseService.findByEmployee(this.id).subscribe(
        (data : Release[]) => {this.draftsReleases = data.filter((e)=>e.releaseStatus === 'Draft')},
        (err)=> {console.log(err);}
      )
  }

  findEmployees()
  {
      this.es.findAllEmployeesAsc().subscribe(
        (data : Employee[]) => {this.employees = data;},
        (err)=> {console.log(err);}
      )
  }

  findReleases()
  {
      this.releaseService.findAll().subscribe(
        (data : Release[]) => {this.releases = data;},
        (err)=> {console.log(err);}
      )
  }

  findDraftReleases()
  {
      this.releaseService.findAllDraft().subscribe(
        (data : Release[]) => {this.draftsReleases = data;},
        (err)=> {console.log(err);}
      )
  }


  createRequest(){
    this.leaveRequest.employee = <Employee>{id: this.id};
    this.leaveRequest.user =  this.user.email;
    this.rs.addLeaveRequest(this.leaveRequest).subscribe(
      (data)=> {
        console.log(data);
      
      },
      (err)=>{console.log(err);}
      
    )
  }
  
  


  draftMode(){
    this.leaveRequest.employee = <Employee>{id: this.id};
    this.leaveRequest.user =  this.user.email;
    this.rs.saveDraft(this.leaveRequest).subscribe(
      ()=> {
        this.showToast('success','SUCESS','Request Saved As Draft');                
      },
      (err)=>{console.log(err);}
      
    )
  }

  getSkills()
  { 
    this.skillsService.findAll().subscribe((data : Skills[])=>{
          this.skills = data;
    },(err)=>{
      console.log(err);
    })
  }

  getEvaluation()
  {
    this.evaluationService.findAll().subscribe((data : Evaluation[])=>{
      this.evaluation = data;
    },(err)=>{
      console.log(err);
    })
  }

  getContracts()
  {
    this.contractService.findAll().subscribe((data : Contract[])=>{
      this.contracts = data;
    },(err)=>{
      console.log(err);
    })
  }

  getExpenses()
  {
    this.expenseService.findAllExpenses().subscribe((data : Expenses[])=>{
      this.expenses = data;
    },(err)=>{
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.employee = new Employee();
    this.id = this.route.snapshot.params["id"];

    this.es.getEmployee(this.id).subscribe(data=>{
    
      this.employee = data;
    }, error => console.log(error)
    )

    this.findDraftReleases();
    this.findRequestsByEmployee();
    this.findRequestsByEmployee_Draft();
    this.findReleasesByEmployee();
    this.findReleasesByEmployee_Draft();
    this.getSkills();
    this.getEvaluation();
    this.getContracts();
    this.getExpenses();

    this.user = this.tokenStorageService.getUser();


    this.recService.getById(this.id).subscribe((data)=>{
      console.log(data);

      let late =  {
        name: 'Late Task',
        value: data.lateTask,
      }
      let early =  {
        name: 'Late Task',
        value: data.earlyTask,
      }

      let arrays = [];

      arrays.push(late);
      arrays.push(early);

      this.single = [...arrays]
      
    },(err)=>{console.log(err);})

  }

  getDate() {
    this.date = new Date();
    const d = this.datePipe.transform(this.date,'dd MMM YYYY');
  }

  public openPDF(): void {

    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('CV_Employee.pdf');
    });
  }

  
  createRelease(){

    this.release.employee = <Employee>{id: this.id};
    this.release.user =  this.user.email;
    this.releaseService.add(this.release,this.id).subscribe(
      ()=> {
        this.showToast('success','SUCESS','Release Created');          
      },
      (err)=>{console.log(err);
      
        this.showToast('danger','DANGER','Release not created');
      }
      
    )
  }

  createReleaseDraft(){

    this.release.employee = <Employee>{id: this.id};
    this.release.user = this.user.email;
    this.releaseService.addDraft(this.release,this.id).subscribe(
      ()=> {
        this.showToast('success','SUCESS','Release Created');          
      },
      (err)=>{console.log(err);
      
        this.showToast('danger','DANGER','Release not created');
      }
      
    )
  }

}
