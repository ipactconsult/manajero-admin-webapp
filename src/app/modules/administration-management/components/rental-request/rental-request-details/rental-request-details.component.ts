import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RentalRequest} from '../../../models/RentalRequest';
import {RentatlRequestService} from '../../../service/rental-request/rentatl-request.service';
import emailjs from '@emailjs/browser';
import {AuthService} from "../../../../auth/service/auth.service";

@Component({
  selector: 'ngx-rental-request-details',
  templateUrl: './rental-request-details.component.html',
  styleUrls: ['./rental-request-details.component.scss']
})
export class RentalRequestDetailsComponent implements OnInit {

    flippedState: boolean = false;
    @Input() rentalRequest: RentalRequest = null;
    @Input() selectedRentalRequest ;
     @Output() dataChanged = new EventEmitter<RentalRequest>();
     userRegister;
  templateParams;
  constructor(private rentalRequestService: RentatlRequestService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  
   flip(): void {
    this.flippedState = !this.flippedState;
  }

   updateStatus(event) {
    this.selectedRentalRequest.status = event;
    this.rentalRequestService.validation(this.selectedRentalRequest).subscribe({
      next: (result: any) => {
        this.selectedRentalRequest = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
         this.dataChanged.emit(this.selectedRentalRequest);
      },
    });
     if (event === 'APPROVED') {
       this.userRegister = {
         email: this.selectedRentalRequest.email,
         username: this.selectedRentalRequest.email.substring(0, this.selectedRentalRequest.email.indexOf('@')),
         password: this.selectedRentalRequest.email.substring(0, this.selectedRentalRequest.email.indexOf('@'))+'2022',
         roles: [{"name": "ROLE_ADMIN"}],
         company: this.selectedRentalRequest.company,
         matriculate: this.selectedRentalRequest.matriculateFiscal
       };
       this.authService.register(this.userRegister).subscribe(() => {
         this.templateParams = {
           email: this.selectedRentalRequest.email,
           password: this.userRegister.password
         };
         emailjs.send('service_aci1n5m', 'template_sdxtqbt', this.templateParams, 'mrNkt-18-V6ndi8O-');
       }, error => {
         console.log(error);
       })
     }
  }
}
