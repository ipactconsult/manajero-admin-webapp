import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'ngx-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit, AfterViewInit {

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;

  isAudioMuted = false;
  isVideoMuted = false;

  positions = NbGlobalPhysicalPosition;

  constructor(
    private router: Router,
    private location: Location,
    private toastrService: NbToastrService
  ) {
  }

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    
    this.user = JSON.parse(sessionStorage.getItem("auth-user"));
    this.room = 'manazello-stock';
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverwrite: {prejoinPageEnabled: false},
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: "Stock Manager ("+this.user.email+")"
      }
    };

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
    // console.log("handleClose");
  }

  handleParticipantLeft = async (participant) => {
    // console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant) => {
    // console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant) => {
    //  console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
    this.showToast('Hello '+this.user.email, this.positions.TOP_RIGHT, 'success');
  }

  handleVideoConferenceLeft = () => {
//        console.log("handleVideoConferenceLeft");
    this.location.back();
  }

  handleMuteStatus = (audio) => {
    //  console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video) => {
    // { muted: true }
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }

}
