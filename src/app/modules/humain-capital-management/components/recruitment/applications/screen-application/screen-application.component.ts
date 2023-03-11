import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Application } from '../../../../models/Application';
import { ApplicationServiceService } from '../../../../services/recruitment/applicationService/application-service.service';

@Component({
  selector: 'ngx-screen-application',
  templateUrl: './screen-application.component.html',
  styleUrls: ['./screen-application.component.scss']
})
export class ScreenApplicationComponent implements OnInit {

  config : NbToastrConfig;
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  application : Application;
  id: string;
  clicked= false;
  constructor(private router : Router, private appService : ApplicationServiceService, private toastrService : NbToastrService, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.application = new Application();
    this.id= this.route.snapshot.params["id"];
    
    this.appService.getApplication(this.id).subscribe(data=>{
      this.showToast("success","SUCCESS","Data Loaded Successfuly");
      this.application = data;
    
    }, err => console.log(err) )
  }

  screenStep(){
    this.appService.screen(this.application, this.id).subscribe((res)=>{
      this.showToast("success","SUCCESS","Operation Achieved Successfuly");
      this.router.navigate(["/hr/recruitment/application/app/"+this.id]).then(()=>{
        this.showToast("success","SUCCESS","Operation Achieved Successfuly");
      })
      this.application = new Application();
    },(err)=> console.log(err))
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
