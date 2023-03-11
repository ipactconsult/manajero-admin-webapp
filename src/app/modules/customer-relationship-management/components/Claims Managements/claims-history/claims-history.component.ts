import { Component, OnInit } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Claim} from '../../../models/Claim';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';
import {ClaimsService} from '../../../services/claims/claims.service';

@Component({
  selector: 'ngx-claims-history',
  templateUrl: './claims-history.component.html',
  styleUrls: ['./claims-history.component.scss']
})
export class ClaimsHistoryComponent implements OnInit {
//current number page for pagination
  current: number = 1;
  
  //getting customers per page 
  pageSize: number = 9;
  
  //declaration for filter string variable
  search: string;
  
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  dataClaims: Claim[] = [];

  constructor(private toastrService: NbToastrService,
              private router: Router, 
              private exportService: ExportService,
              private claimsService: ClaimsService) {
  }

  ngOnInit(): void {

    //getting all visits data
    this.getAllClaims();
   
  }


 

  //getting all visits data
  getAllClaims() {
    this.claimsService.getAllClaimsArchived()
      .subscribe(
        (data: Claim[]) => {
          this.dataClaims = data;
        }
      );
  }

  //archive contract function
  onRestoreConfirm(claim: Claim, id: string) {
    this.claimsService.cancelArchiveClaim(claim, id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Claim Restored !!');
        this.getAllClaims();
        this.router.navigate(['/crm/claims']).then(() => {
          this.getAllClaims();
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

 //export visits data as excel file
  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataClaims, 'dataClaims');
  }
}
