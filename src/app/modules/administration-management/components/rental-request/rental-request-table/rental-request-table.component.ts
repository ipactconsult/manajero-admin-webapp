import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { RentalRequest } from '../../../models/RentalRequest';
import { RentatlRequestService } from '../../../service/rental-request/rentatl-request.service';

@Component({
  selector: 'ngx-rental-request-table',
  templateUrl: './rental-request-table.component.html',
  styleUrls: ['./rental-request-table.component.scss']
})
export class RentalRequestTableComponent implements OnInit {

  selectedRentalRequest = null;
    @Input() dataRentalRequest: RentalRequest = null;

  refDialog = null;
  flippedState: boolean = false;
  list:RentalRequest[]= [];
  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: "First Name",
        type: "string",
      },
      lastName: {
        title: "Last Name",
        type: "string",
      },
      email: {
        title: "Email",
        type: "string",
      },
      phone: {
        title: "Phone",
        type: "string",
      },
      company: {
        title: "Company",
        type: "string",
      },
      matriculateFiscal: {
        title: "Matriculate Fiscal",
        type: "string",
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (status) => {

          switch (status) {
            case "PENDING": {
              return `<h5><span class="badge badge-light">${status} </span></h5>`;
            }
            case "APPROVED": {
              return `<h5><span class="badge badge-success">${status} </span></h5>`;
            }
            case "DENIED": {
              return `<h5><span class="badge badge-danger">${status} </span></h5>`;
            }
            case "UNDER_VALIDATION": {
              return `<h5><span class="badge badge-warnig">${status} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${status} </span></h5>`;
            }
          }
        },
      },
    },
  };
  constructor(    private dialogService: NbDialogService,private rentatlRequestService:RentatlRequestService
    ) { }

  ngOnInit(): void {
    this.rentatlRequestService.findAllActive().subscribe({
      next: (rentalRequest: RentalRequest[]) => {
        this.list = rentalRequest || [];
        
      },
      error: (err: any) => {
        console.log(err);
      },
     
    });
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedRentalRequest = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {
    console.log("test");
    
  }
 

  onUserRowSelect(event): void {
    this.selectedRentalRequest = event.data;    
    this.flip();
  }
  
  flip(): void {
    this.flippedState = !this.flippedState;
  }
  flipBack(){
    this.selectedRentalRequest=null;
    this.flip();
  }
  refresh(rentalRequest:RentalRequest){

   this.list.forEach((element)=>{
     if (element.id === rentalRequest.id){
       element = rentalRequest;
     }
   })
const array=this.list;
   this.list=[];
   this.list= [...array]
    this.flipBack();

  }
}
