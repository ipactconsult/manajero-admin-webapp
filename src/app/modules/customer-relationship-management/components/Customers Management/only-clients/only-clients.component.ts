import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../services/customers/customer.service';
import {Customer} from '../../../models/Customer';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-only-clients',
  templateUrl: './only-clients.component.html',
  styleUrls: ['./only-clients.component.scss']
})
export class OnlyClientsComponent implements OnInit {

  onlyClients: Customer[]=[];
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  constructor(private customerService: CustomerService,       private toastrService: NbToastrService) { }

  ngOnInit(): void {
    
    this.customerService.getAllClients().subscribe((data:Customer[])=>{
      this.onlyClients= data;
    })
  }
  
  getCopyPaste(){
            this.showToast('success', 'Copied ! ', 'Email copied Successfully!!');

  }
  
  //show toast
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
