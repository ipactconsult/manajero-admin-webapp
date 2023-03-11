import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { LeaveRequestService } from '../../../services/leaveRequestServices/leave-request.service';

@Component({
  selector: 'ngx-edit-leave-request',
  templateUrl: './edit-leave-request.component.html',
  styleUrls: ['./edit-leave-request.component.scss']
})
export class EditLeaveRequestComponent implements OnInit {

  leaveRequest : LeaveRequest = new LeaveRequest();
  id : string ;
  leave_request_form : FormGroup = new FormGroup({});

  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  config : NbToastrConfig;
  title = 'Edit Request';
  content = 'Operation achieved';
  _duration = 2000;

  day1 : number = 0;
  day2 : number = 0;
  diff : number = 0;

  

  newRemainder : number = 0;

  clicked = false;

  user : any;
  
  constructor(private tokenStorageService: TokenStorageService, private rs : LeaveRequestService,private toastrService: NbToastrService,
    private route : ActivatedRoute) { 
      this.leave_request_form = new FormGroup(
        {
          motif : new FormControl(''),
          startDate : new FormControl(''),
          start : new FormControl(''),
          endDate : new FormControl(''),
          end : new FormControl(''),
          comments : new FormControl(''),
          requestStatus : new FormControl(''),
          remainder_quantity: new FormControl('')
        }
      )


    }

  ngOnInit(): void {

    this.leaveRequest = new LeaveRequest();
    this.id = this.route.snapshot.params["id"];

    this.rs.getLeaveRequest(this.id).subscribe(data=>{
    
      this.leaveRequest = data;
    }, error => console.log(error)
    )    
    
    this.user = this.tokenStorageService.getUser();



  }

  get motif(){return this.leave_request_form.get('motif');}
  get startDate(){return this.leave_request_form.get('startDate');}
  get start(){return this.leave_request_form.get('start');}
  get endDate(){return this.leave_request_form.get('endDate');}
  get end(){return this.leave_request_form.get('end');}
  get duration(){return this.leave_request_form.get('duration');}
  get unit(){return this.leave_request_form.get('unit');}
  get comments(){return this.leave_request_form.get('comments');}
  get requestStatus(){return this.leave_request_form.get('requestStatus');}
  get remainder_quantity(){return this.leave_request_form.get('remainder_quantity');}


  updateRequest(){  

    this.leaveRequest.user =  this.user.email;

    this.rs.validateRequest(this.leaveRequest,this.id).subscribe(
      ()=> {this.showToast('success','SUCCESS','Request Validate, an email will be sent to inform the employee.');},
      (err)=>{console.log(err);}
      
    )
  }

  rejectRequest(){  
    this.leaveRequest.user =  this.user.email;
    this.rs.rejectRequest(this.leaveRequest,this.id).subscribe(
      ()=> {this.showToast('danger','DANGER','Request Rejected, an email will be sent to inform the employee.');},
      (err)=>{console.log(err);}
      
    )
  }


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
      `Leave Request ${titleContent}`,
      config);
  }
}
