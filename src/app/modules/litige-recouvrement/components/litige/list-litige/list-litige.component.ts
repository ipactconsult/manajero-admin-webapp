import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Litige } from '../../../models/Litige';
import { LitigeService } from '../../../services/litige/litige.service';
import { CreateLitigeComponent } from '../create-litige/create-litige.component';



@Component({
  selector: 'ngx-list-litige',
  templateUrl: './list-litige.component.html',
  styleUrls: ['./list-litige.component.scss']
})
export class ListLitigeComponent implements OnInit {

  litigeList: Litige[]= [];
  config: NbToastrConfig;
  
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  preventDuplicates = false;
  a: TemplateRef<any>;
  idDeleted: string;



  source: LocalDataSource = new LocalDataSource();

  constructor( private windowService: NbWindowService,
    private router: Router,
    private litigesc: LitigeService,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
) {

  }



 

  ngOnInit(): void {
    this.litigesc.getAllLitige().subscribe((res) => {
      this.litigeList = res;
    });

  }
  settings = {
    
  
    columns: {
      typelitige: {
        title: 'Type Of Dispute',
        type: 'string',
  
      },
      date: {
        title: 'Date Added',
        type: 'Date',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, "dd MMM yyyy");
          return formatted;
        },
      },
      nouvelledatechance: {
        title: 'New Due Date ',
        type: 'Date',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, "dd MMM yyyy");
          return formatted;
        
      },
    },
    
      statut: {
        title: 'Statut Of Dispute',
        type: 'Statut',
  
      },
      
    },
    actions: {
      custom: [
  {
    name: 'edit',
    title: '<i  class="nb-edit text-warning" title="Edit"></i>',
    
  },
  {
    name: 'delete',
    title: '<i  class="nb-trash text-danger" title="Delete"></i>',
  },
 
],
edit: false,
delete: false,
add:false,
position: 'right',


    },
    pager: {
      display: true,
      perPage: 5,
    },
   
  };
  onUserRowSelect(event): void {
    this.router.navigate([
      "/litige/litigedetails/" + event.data.id,
    ]);
  }
  onDeleteConfirm() : void  {
    console.log("hello")

    this.litigesc.deleteLitige(this.idDeleted).subscribe(
      (result) => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        window.location.reload();
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete category');
        console.log(err);
      }
    )

  }
  
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }
  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Law ?'});
  }
  onCreate(): void {
    this.windowService.open(CreateLitigeComponent, {
      title: `Create Litige `,
    });
  }
  onCustom(event, dialog: TemplateRef<any>) {
    if (event.action === 'edit') {
      this.router.navigateByUrl('/litige/updatelitige/' + event.data.id);
      }
     else if (event.action === 'delete') {
      this.idDeleted = event.data.id;
      this.dialogService.open(dialog);
    }
  }



}



