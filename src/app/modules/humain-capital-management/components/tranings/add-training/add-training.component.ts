import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Employee } from '../../../models/Employee';
import { Training } from '../../../models/Training';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import {TrainingService} from '../../../services/trainingServices/training.service';

import '../../recruitment/category/category-jobs/ckeditor.component';
import 'ckeditor';
import { TokenStorageService } from '../../../../auth/service/token/token.service';

@Component({
  selector: 'ngx-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  ckeConfig: any;
  @ViewChild("description") myckeditor: any;
  @ViewChild("program") myckeditorP: any;

  training : Training = new Training();
  formTraining : FormGroup;

  employees : Employee[]=[];
  _employee : Employee = new Employee();
  selectedItem = "";

  config : NbToastrConfig;
  title = 'Create Training';
  content = 'Operation achieved';
  duration = 2000;
  _status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  options: Options = {
    floor: 0,
    ceil: 1000,
  };


  options1: Options = {
    floor: 0,
    ceil: 20,
  };

  user : any;

  constructor(
    
    private tokenStorageService: TokenStorageService
              ,private trainingService : TrainingService
             ,private employeeService : EmployeeService
             ,private nbToastrService: NbToastrService) {

              
              }

  ngOnInit(): void {
    this.formTraining = new FormGroup({
      object : new FormControl(''),
      category : new FormControl(''),
      nbHours : new FormControl(''),
      startDate : new FormControl(''),
      endDate : new FormControl(''),
      description : new FormControl(''),
      program : new FormControl(''),
      status : new FormControl(''),
      score : new FormControl(''),
      budget : new FormControl(''),
      cost : new FormControl(''),
      employee: new FormControl('')
    });

    this.ckeConfig = {
      allowedContent: true,
  } ; 



    this.getEmployees();
    this.user = this.tokenStorageService.getUser();
  }

  get object(){return this.formTraining.get('object');}
  get category(){return this.formTraining.get('category');}
 // get nbHours(){return this.formTraining.get('nbHours');}
  get startDate(){return this.formTraining.get('startDate');}
  get endDate(){return this.formTraining.get('endDate');}
  get description(){return this.formTraining.get('description');}
  get program(){return this.formTraining.get('program');}
  get status(){return this.formTraining.get('status');}
//  get score(){return this.formTraining.get('score');}
  get budget(){return this.formTraining.get('budget');}
  get cost(){return this.formTraining.get('cost');}
  get employee(){return this.formTraining.get('employee');}


  addTraining()
  {
    this._employee.id = this.selectedItem;
    this.training.employee = this._employee;
    this.training.user =  this.user.email;
    this.trainingService.add(JSON.parse(JSON.stringify(this.training))).subscribe(()=>{
      this.showToast('success','SUCCESS','Created Successfuly');      
    },()=>{      
      this.showToast('danger','DANGER','Error While Create A New Training');
    })
  }

  getEmployees()
  {
    this.employeeService.findAll().subscribe((data)=>{
      this.employees = data.filter((e)=>e.isArchived == 'No');
    });
  }

  getEmployeeSelected(event)
  {
    this.selectedItem = event;
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      _status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? ` ${title}` : '';
    this.nbToastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }

  onChange(event){
    console.log("OnChange Event  : "+event);
    this.training.description = event;
    console.log("On Change Description : "+this.training.description);
  }
  onEditorChange(event){
    console.log(event);
    
  }

  onReady(event){
    console.log(event);
    
  }
  onFocus(event){
    console.log("OnChange Event  : "+event);
    this.training.description = event;
    console.log("On Change Description : "+this.training.description);
  }

  
  onBlur(event){
    console.log("OnChange Event  : "+event);
    this.training.description = event;
    console.log("On Change Description : "+this.training.description);
  }


  onContentDom(event)
  {
    console.log(event);
    
  }

  onFileUploadRequest(event)
  {
    console.log(event);
    
  }
  onFileUploadResponse(event)
  {
    console.log(event);
    
  }

  onPaste(event)
  {
    console.log(event);
  }

  onDrop(event)
  {
    console.log(event);
  }





  onChange1(event){
    console.log(event);
  }
  onEditorChange1(event){
    console.log(event);
  }

  onReady1(event){
    console.log(event)
  }
  onFocus1(event){
    console.log(event)
  }

  
  onBlur1(event){
    console.log(event)
  }

  onContentDom1(event)
  {
    console.log(event);
  }

  onFileUploadRequest1(event)
  {
    console.log(event);
    
  }
  onFileUploadResponse1(event)
  {
    console.log(event);
    
  }

  onPaste1(event)
  {
    console.log(event);
  }

  onDrop1(event)
  {
    console.log(event);
  }



}
