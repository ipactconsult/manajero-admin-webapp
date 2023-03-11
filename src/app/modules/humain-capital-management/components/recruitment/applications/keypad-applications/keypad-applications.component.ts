import { Component, OnInit } from '@angular/core';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Application } from '../../../../models/Application';
import { ApplicationServiceService } from '../../../../services/recruitment/applicationService/application-service.service';

@Component({
  selector: 'ngx-keypad-applications',
  templateUrl: './keypad-applications.component.html',
  styleUrls: ['./keypad-applications.component.scss']
})
export class KeypadApplicationsComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Application';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  
  applications : Application[]=[];

  searchbyfields : string ="";

  pageSize = 4;

  current = 1;

  constructor(private as : ApplicationServiceService, private toastrService : NbToastrService) { }

  ngOnInit(): void {
    this.getApplications();
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


  getApplications(){
    this.as.findAll().subscribe((data : Application[])=>{
        this.applications = data;
        this.showToast('success','SUCESS','Data Loaded Successfuly');
    },(err)=>{
      console.log(err);
      this.showToast('danger','DANGER','Error While Retrieving Data');
      
    })
  }

  



  getFirstNameSelected(event)
  {
    this.as.findAll().subscribe((data : Application[])=>{
      this.applications = data.filter((e)=>e.firstName === event)
    },(err)=>{
      console.log(err);
      
    })
  }

  getLastNameSelected(event)
  {
    this.as.findAll().subscribe((data : Application[])=>{
      this.applications = data.filter((e)=>e.lastName === event)
    },(err)=>{
      console.log(err);
      
    })
  }


  getStatusSelected(event)
  {
    this.as.findAll().subscribe((data : Application[])=>{
      this.applications = data.filter((e)=>e.status === event)
    },(err)=>{
      console.log(err);
      
    })
  }

  getJobSelected(event)
  {
    this.as.findAll().subscribe((data : Application[])=>{
      this.applications = data.filter((e)=>e.refJob === event)
    },(err)=>{
      console.log(err);
      
    })
  }

}
