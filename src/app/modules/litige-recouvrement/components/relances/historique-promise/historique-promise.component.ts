import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Promise } from '../../../models/Promise';
import { Relance } from '../../../models/Relance';
import { RelanceService } from '../../../services/relance.service';

@Component({
  selector: 'ngx-historique-promise',
  templateUrl: './historique-promise.component.html',
  styleUrls: ['./historique-promise.component.scss']
})
export class HistoriquePromiseComponent implements OnInit {
  relanceList: Relance[]= [];
  config: NbToastrConfig;
  @Input() relance: Relance;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  promiseObj:Promise ;
  destroyByClick = true;
  duration = 2000;
  id :string= '' ;
  preventDuplicates = false;
  a: TemplateRef<any>



  source: LocalDataSource = new LocalDataSource();
  constructor( private windowService: NbWindowService,
    private router: Router,
    private rs: RelanceService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
) {

  }
  ngOnInit(): void {
    console.log(this.relance)
    this.promiseObj=this.relance.promise;
  }
  settings = {
    
    columns: {
     
      rapportsms: {
        title: 'The amount given ',
        type: 'string',
        valuePrepareFunction: (amount) => {
          return (amount!=null);
        },

      
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
