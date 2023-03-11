import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsCategoryService } from '../../../../services/recruitment/jobsCategory/jobs-category.service';
import { JobsService } from '../../../../services/recruitment/jobs/jobs.service';
import { Options } from '@angular-slider/ngx-slider';
import { JobsCategory } from '../../../../models/JobsCategory';
import { Router } from '@angular/router';
import './ckeditor.component';
import 'ckeditor';
import { JobOffer } from '../../../../models/JobOffer';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';

@Component({
  selector: 'ngx-category-jobs',
  templateUrl: './category-jobs.component.html',
  styleUrls: ['./category-jobs.component.scss']
})
export class CategoryJobsComponent implements OnInit {

  showForm = true;
  showJobForm ;
  categoryJobForm : FormGroup;
  jobForm : FormGroup;
  categoryJ : JobsCategory = new JobsCategory();
  job : JobOffer = new JobOffer();
  jobs_category : JobsCategory [] = [];
  jobs : JobOffer []=[];
  selectedItem: string= "";
  profile_values: Set<any> = new Set([[3]]);



  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  options: Options = {
    floor: 0,
    ceil: 200
  };
  
  constructor(private toastrService: NbToastrService,private jobService : JobsService, private router : Router, private jobsCategoryService : JobsCategoryService) {
    
   }

   get categoryName(){return this.categoryJobForm.get('categoryName');}

   get hiringDate(){return this.categoryJobForm.get('hiringDate');}
   get hiringSource(){return this.categoryJobForm.get('hiringSource');}
   get jobTitle(){return this.categoryJobForm.get('jobTitle');}
   get jobOffice(){return this.categoryJobForm.get('jobOffice');}
   get jobStatus(){return this.categoryJobForm.get('jobStatus');}
   get nb_people_positions(){return this.categoryJobForm.get('nb_people_positions');}
   get jobDescription(){return this.categoryJobForm.get('jobDescription');}
   get jobsCategory(){return this.categoryJobForm.get('jobsCategory');}

  ngOnInit(): void {
    this.categoryJobForm = new FormGroup({
      categoryName : new FormControl('', Validators.required)
    });

    this.jobForm = new FormGroup({
      hiringDate : new FormControl(''),
      hiringSource : new FormControl(''),
      jobTitle : new FormControl('',Validators.required),
      jobOffice : new FormControl(''),
      jobStatus : new FormControl(''),
      place: new FormControl(''),
      nb_people_positions : new FormControl('',Validators.required),
      jobDescription : new FormControl(''),
      profile_needed : new FormControl(''),
      jobsCategory : new FormControl('', Validators.required),
    })

    this.callRecords();
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

  onClickForm()
  {
    this.showForm = !this.showForm;
  }

  onClickJobForm(event)
  {
    console.log(event);
    
    this.showJobForm = !this.showJobForm;
  }

  getCategorySelected(event){
    this.selectedItem=event;

  }

  callRecords(){
    this.jobsCategoryService.findAll().subscribe((data)=>{
      this.jobs_category = data;    
    })
  }
  
  callAddJobCategory()
  {
     this.jobsCategoryService.add(this.categoryJ).subscribe((res)=>{
      this.showToast('success','SUCESS','Data Added Successfuly');
      this.categoryJobForm.reset();
      this.router.navigate(["/hr/recruitment/jobs/addJob"]).then(()=>{
        this.callRecords();
      })
       
     })
  }

  callAddJobOffer()
  {
    this.categoryJ.id=this.selectedItem;
    this.job.jobsCategory= this.categoryJ;
    this.jobService.add(this.job).subscribe((res)=>{
      this.showToast('success','SUCESS','Data Added Successfuly');
      this.router.navigate(["/hr/recruitment/jobs/grid"]).then(()=>{
        this.callRecords();
      })
    },(err)=>{
      console.log(err);
      
    })
  }

  onChange(event){
    console.log(event);
  }
  onEditorChange(event){
    console.log(event);
  }

  onReady(event){
    console.log(event)
  }
  onFocus(event){
    console.log(event)
  }

  
  onBlur(event){
    console.log(event)
  }

  onTagRemove(tagToRemove : NbTagComponent): void {
     this.profile_values.delete(tagToRemove.text);
  }

  onTagAdd({value, input}: NbTagInputAddEvent): void {
    // =""+ value;
    if(value){
      this.profile_values.add(value);
    }
    input.nativeElement.value= '';
  }

}
