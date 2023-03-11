import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Release } from '../../../models/Release';
import { ReleaseService } from '../../../services/releaseServices/release.service';

@Component({
  selector: 'ngx-edit-release',
  templateUrl: './edit-release.component.html',
  styleUrls: ['./edit-release.component.scss']
})
export class EditReleaseComponent implements OnInit {

  release : Release = new Release();
  id: string;
  release_form : FormGroup = new FormGroup({});

  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  config : NbToastrConfig;
  title = 'Edit Request';
  content = 'Operation achieved';
  _duration = 2000;
  
  clicked = false;

  constructor(private releaseService : ReleaseService,
              private toastrService : NbToastrService,
              private route : ActivatedRoute) {
                  this.release_form = new FormGroup({
                    motifRelease : new FormControl(''),
                    startTime : new FormControl(''),
                    endTime : new FormControl(''),
                    commentsRelease : new FormControl(''),
                    releaseStatus : new FormControl('')
                  })
               }

  ngOnInit(): void {
    this.release = new Release();
    this.id= this.route.snapshot.params["id"];
    this.releaseService.getRelease(this.id).subscribe(data=>{
      this.release = data;
    }, error => console.log(error))
  }

  get motifRelease (){return this.release_form.get('motifRelease');}
  get startTime (){return this.release_form.get('startTime');}
  get endTime (){return this.release_form.get('endTime');}
  get commentsRelease (){return this.release_form.get('commentsRelease');}
  get releaseStatus (){return this.release_form.get('releaseStatus');}
  
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this._duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Release ${titleContent}`,
      config);
  }
  
  validateRelease(){  

    this.releaseService.validate(this.release,this.id).subscribe(
      ()=> {this.showToast('success','SUCESS','Release Validate, an email will be sent to inform the employee.');},
      (err)=>{console.log(err);}  
    )
  }

  rejectRelease(){  

    this.releaseService.rejected(this.release,this.id).subscribe(
      ()=> {this.showToast('danger','Danger','Release Rejected, an email will be sent to inform the employee.');},
      (err)=>{console.log(err);}  
    )
  }


}
