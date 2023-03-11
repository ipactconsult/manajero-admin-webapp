import { Component, OnInit } from '@angular/core';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { JobOffer } from '../../../models/JobOffer';
import { JobsCategory } from '../../../models/JobsCategory';
import { JobsService } from '../../../services/recruitment/jobs/jobs.service';
import { JobsCategoryService } from '../../../services/recruitment/jobsCategory/jobs-category.service';

@Component({
  selector: 'ngx-grid-jobs',
  templateUrl: './grid-jobs.component.html',
  styleUrls: ['./grid-jobs.component.scss']
})
export class GridJobsComponent implements OnInit {

  jobs : JobOffer [] = [];
  categories : JobsCategory []=[];
  searchItem : string ="";

  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  pageSize = 4;
  current  = 1;
   
  constructor(private toastrService: NbToastrService,private jobsService : JobsService, private categoryService : JobsCategoryService) { }

  ngOnInit(): void {
    this.callRecords();
    this.callRecordsCategory();
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

  callRecords()
  {
    this.jobsService.findAll().subscribe((data:JobOffer[])=>{
      this.showToast('success','SUCESS','Data Loaded Successfuly');
      
      this.jobs = data;
    },(err)=>{
      this.showToast('danger','DANGER','Error While Loading Data');
    })
  }

  callAll()
  {
    this.jobsService.findAll().subscribe((data:JobOffer[])=>{
      this.showToast('success','SUCESS','Data Loaded Successfuly');
      
      this.jobs = data;
    },(err)=>{
      this.showToast('danger','DANGER','Error While Loading Data');
    })
  }

  callRecordsCategory()
  {
    this.categoryService.findAll().subscribe((data:JobsCategory[])=>{
      this.categories = data;
    },(err)=>{
      console.log(err.data);
    })
  }

  filterByTitle(e){
    this.jobsService.findAll().subscribe(
      (data : JobOffer[])=>{
        this.jobs = data.filter((f=>f.jobTitle === e));
        this.showToast('success','SUCESS','You have launched a filtering operation');
      },(err)=>{
        this.showToast('danger','DANGER',err.data);
      }
      )
  }

  filterByCategory(e) {
    this.jobsService.findAll().subscribe(
      (data: JobOffer[]) => {
        this.jobs = [];
        this.jobs = data.filter(
          (d =>
              //@ts-ignore
              d?.jobsCategory?.id === e 
          )
        );       
          this.showToast('success','SUCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByOffice(e){
    this.jobsService.findAll().subscribe(
      (data : JobOffer[])=>{
        this.jobs = data.filter((f=>f.jobOffice === e));
        this.showToast('success','SUCESS','You have launched a filtering operation');
      },(err)=>{console.log(err);}
      )
  }

  filterByProfiles(e){
    this.jobsService.findAll().subscribe(
      (data : JobOffer[])=>{
        this.jobs = data.filter((f=>f.profile_needed === e));
        this.showToast('success','SUCESS','You have launched a filtering operation');
      },(err)=>{console.log(err);}
      )
  }

  callAscJobs()
  {
    this.jobsService.findAllAsc().subscribe((data:JobOffer[])=>{
      this.showToast('success','SUCESS','An Ascending Sort Was Successfully Applied');
      this.jobs = data;
    },(err)=>{
      console.log(err.data);
    })
  }

  callDescJobs()
  {
    this.jobsService.findAllDesc().subscribe((data:JobOffer[])=>{
      this.jobs = data;
      this.showToast('success','SUCESS','A Descending Sort Was Successfully Applied');
    },(err)=>{
      console.log(err.data);
    })
  }

  callAscJobs_Pos()
  {
    this.jobsService.findAllAsc_Pos().subscribe((data:JobOffer[])=>{
      this.showToast('success','SUCESS','An Ascending Sort Was Successfully Applied');
      this.jobs = data;
    },(err)=>{
      console.log(err.data);
    })
  }

  callDescJobs_Pos()
  {
    this.jobsService.findAllDesc_Pos().subscribe((data:JobOffer[])=>{
      this.showToast('success','SUCESS','A Descending Sort Was Successfully Applied');
      this.jobs = data;
    },(err)=>{
      console.log(err.data);
    })
  }

}
