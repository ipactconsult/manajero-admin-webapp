import {Component, OnInit,TemplateRef} from '@angular/core';
import {taxrate} from '../../../accounting-management/models/taxrate'
import {TaxrateService} from '../../services/taxRate/taxrate.service';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {HttpErrorResponse} from '@angular/common/http';
import {LocalDataSource} from 'ng2-smart-table';
import {TypeTypeComponent} from "../../utils/type-type/type-type.component";


@Component({
  selector: 'ngx-add-taxrate',
  templateUrl: './add-taxrate.component.html',
  styleUrls: ['./add-taxrate.component.scss']
})
export class AddTaxrateComponent implements OnInit {

  
  config: NbToastrConfig;
  taxerates: taxrate [] = [];
  source: LocalDataSource = new LocalDataSource();

  index = 1;
  destroyByClick = true;
  duration = 5100;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  title = 'HI there!';
  content = `I'm cool toaster!`;

  datataxrates: taxrate [] = [];

  constructor(private dialogService: NbDialogService,
    private router: Router, private windowService: NbWindowService,
    private toastrService: NbToastrService, private trs: TaxrateService) { 
      this.trs.getAll().subscribe((result: []) => {
        this.taxerates = result;
        this.source.load(this.taxerates);
      }, (error) => {
        console.log(error);
      });
    }

  ngOnInit(): void {
    this.trs.getAll().subscribe(
      (data: taxrate[]) => {
        this.datataxrates = data;

      }
    );
  }
  onDeleteConfirm(event) {

    if (window.confirm('Are you sure you want to delete?')) {
      this.trs.delete(event.data.id).subscribe(
        () => {
          this.showToast("success", "Deleted", "tax rate deleted !!");
          event.confirm.resolve(event.data);
          this.ngOnInit();
        })
    } else {
      this.showToast("danger", "Delete !!", "Rejected !!");

      event.confirm.reject();
    }
  }
  addTaxRate(event) {
    this.trs.addTaxRate(event.newData).subscribe(result => {
      this.showToast("success", "Added new tax", "tax rate added !!");
    this.ngOnInit();
    
  },
    (err) => {
      alert('Erreur ! Vérifiez vos informations');

    },
  );
}
updateRecord(event) {
  this.trs.putTaxRate(event.newData).subscribe(
    res => {
      this.showToast("success", "Update ! ", "Tax rate Updated !!");
      event.confirm.resolve(event.newData);
      this.ngOnInit();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.showToast("danger", "Update !!", err.error.message);

      } else {
        this.showToast("danger", "Update !!", err.error.message);

      }
    });
}

openWindow(contentTemplate) {
  this.windowService.open(
    contentTemplate,
    {
      title: 'New tax rate added successfully',
    },
  );
}

open2(dialog: TemplateRef<any>) {
  this.dialogService.open(
    dialog,
    {context: 'Are you sure to delete this taxrate ?'});
}
settings = {

  add: {
    addButtonContent: '<i class="nb-plus" ></i>',
    createButtonContent: '<i class="nb-checkmark" ></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmCreate: true,

  },
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmSave: true
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true,
  },
  columns: {

    name: {
      title: 'Name',
      type: 'string',
      filter: true,
    },
    type: {
      title: 'Type',
      type: 'string',
      filter: true,
      
      
    },
    status: {
      title: 'Status',
      type: 'string',
      filter: {
        type: 'list',
        config:{
          list:[
              { value: 'ACTIVE', title: 'ACTIVE' },
             { value: 'ARCHIEVED', title: 'ARCHIEVED' },
          ],
        }
      },
      editor:{
         type :'custom', component:TypeTypeComponent
       }
    },
    reportTaxType:{
      title: 'ReportTaxType',
      type: 'string',
      filter: true,
    },
  } 
};

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


}
