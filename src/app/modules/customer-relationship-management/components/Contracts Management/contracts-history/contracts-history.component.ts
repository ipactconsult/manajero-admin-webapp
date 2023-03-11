import { Component, OnInit } from '@angular/core';
import {ContractService} from '../../../services/contracts/contract.service';
import {Contract} from '../../../models/Contract';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from '@nebular/theme';
import {ExportService} from '../../../../../shared/exports/export.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-contracts-history',
  templateUrl: './contracts-history.component.html',
  styleUrls: ['./contracts-history.component.scss']
})
export class ContractsHistoryComponent implements OnInit {
//toast configuration
  index = 1;
   config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  //data contracts list initialize
  dataContracts: Contract[]=[];
  constructor( private toastrService: NbToastrService,
               private exportService: ExportService,
               private router: Router,
               private contractService: ContractService) { }

  ngOnInit(): void {
   this.getAllContracts();
  }
  
  getAllContracts(){
     this.contractService.getAllContractsArchived().subscribe((data:Contract[])=>{
      this.dataContracts= data;
    });
  }

  //export data as excel file
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataContracts, 'dataContracts');
  }

  //archive contract function
  onRestoreConfirm(contract: Contract, id: string) {
    this.contractService.cancelArchiveContract(contract, id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Contract Archived !!');
        this.getAllContracts();
        this.router.navigate(['/crm/contracts']).then(() => {
          this.getAllContracts();
        });
      });
  }

  //show toast notification
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
