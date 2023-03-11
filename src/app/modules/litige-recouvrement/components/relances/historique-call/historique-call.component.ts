import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CallRapport } from '../../../models/CallRapport';
import { Relance } from '../../../models/Relance';
import { RelanceService } from '../../../services/relance.service';
import { truncate_with_ellipsis } from '../../../share/function';

@Component({
  selector: 'ngx-historique-call',
  templateUrl: './historique-call.component.html',
  styleUrls: ['./historique-call.component.scss']
})
export class HistoriqueCallComponent implements OnInit {

  relanceList: Relance[]= [];
  config: NbToastrConfig;
  @Input() relance: Relance ;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  ListCall:CallRapport[] ;
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
    this.ListCall=this.relance.call;
  }
  settings = {
    
    columns: {
     
      rapport: {
        title: 'Content',
        type: 'string',
        valuePrepareFunction: (rapport) => {
          return (rapport!=null)&&truncate_with_ellipsis(rapport);
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
