import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Customer } from '../../../../customer-relationship-management/models/Customer';
import { Avocat } from '../../../models/Avocat';
import { AvocatService } from '../../../services/avocat/avocat.service';

@Component({
  selector: 'ngx-avocat-table',
  templateUrl: './avocat-table.component.html',
  styleUrls: ['./avocat-table.component.scss']
})
export class AvocatTableComponent implements OnInit {

  
  //current numer =1 for pagination event
  current: number = 1;
  // search filter declaration
  search: string = '';
  
  //instanciate customer
  avocat: Avocat = new Avocat();
  
  //toaster config
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  pageSize: number = 9;

  dataAvocats: Avocat [] = [];



  constructor(private cs: AvocatService,
              private router: Router,
              private toastrService: NbToastrService,
             ) {
  }


  ngOnInit(): void {
    this.getAllAvocats();
   
  }


  getAllAvocats() {
    this.cs.findNonArchivedAvocats().subscribe(
      (data: Avocat[]) => {
        this.dataAvocats = data
      }, (err) => {
        return err;
      }
    );
  }

 
 
  onArchiveConfirm(avocat: Avocat, id: string) {
    this.cs.archiveAvocat(avocat, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Lawyer Archived !!');
        this.getAllAvocats();
        this.router.navigate(['/litige/listavocats']).then(() => {
          this.getAllAvocats();
        });
      });
  }

//get all customers descending
getAvocatDesc() {
 this.cs.findAllAvocatDesc().subscribe(
  (data: Avocat[]) => { this.dataAvocats = data;  }, (err) => {
    console.log(err);
  },
);
}

  //get all customers ascending
  getAvocatAsec() {
   this.cs.findAllAvocatAsc().subscribe(
    (data: Avocat[]) => { this.dataAvocats = data;  }, (err) => {
      console.log(err);
    },
  );
 }

  getAvocatsBySpeciality(e,x) {
    this.filterBySpeciality(e,x);
  }

  filterBySpeciality(e,x) {
    this.cs.getAllAvocats().subscribe(
      (data: Avocat[]) => {
        this.dataAvocats = []
        console.log(e);
        this.dataAvocats = data.filter(
          (avocat =>
             avocat.specialite === e 
          )

        )
      }, (err) => {
        return err;
      })

 }


  //toast notification
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

