import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Application } from '../../../models/Application';
import { ApplicationServiceService } from '../../../services/recruitment/applicationService/application-service.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'ngx-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.scss']
})
export class JitsiComponent implements OnInit, AfterViewInit {

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;

  config : NbToastrConfig;
  title = 'Application';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  applications : Application[]=[];

  clicked = false;

  clicked_ = false;


  getCopyPaste()
  {
    this.clicked = true;
    this.showToast('success','SUCESS','Email Copied');

  }

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;



  constructor(
      private route : ActivatedRoute,
      private router: Router,
      private appService : ApplicationServiceService,
      private toastrService : NbToastrService
  ) { }

  ngOnInit(): void {
      this.room = 'hcm-erp-rec'
      this.user = {
          name: 'HR MANAGER' // Set your username
      }

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
    this.appService.findAllBYScreening().subscribe((data : Application[])=>{
        this.applications = data;
        this.showToast('success','SUCESS','Data Loaded Successfuly');
    },(err)=>{
      console.log(err);
      this.showToast('danger','DANGER','Error While Retrieving Data');
      
    })
  }

  validateStep(app : Application , id : string){
    this.appService.validate(app, id).subscribe((res)=>{
      this.showToast("success","SUCCESS","Operation Achieved Successfuly"); 
        console.log(app);
        console.log(id);

    
      console.log(res);       
    },(err)=> console.log(err))
  }

  rejectStep(app : Application , id : string){
    this.appService.reject(app, id).subscribe((res)=>{
      this.showToast("success","SUCCESS","Operation Achieved Successfuly");
      console.log("ID : "+id);
      console.log(res);
    },(err)=> console.log(err))
  }

  

  ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          width: 800,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

       // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }

  handleClose = () => {
    console.log("handleClose");
    alert("Meet Closed");
}

handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
}

handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
   // this.router.navigate(['/hr/recruitment/interview/annexe']);
}

handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
}

executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
     // this.router.navigate(['/hr/recruitment/interview/annexe']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}

}
