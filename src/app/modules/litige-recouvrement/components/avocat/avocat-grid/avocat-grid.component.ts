import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Avocat } from '../../../models/Avocat';
import { AvocatService } from '../../../services/avocat/avocat.service';

@Component({
  selector: 'ngx-avocat-grid',
  templateUrl: './avocat-grid.component.html',
  styleUrls: ['./avocat-grid.component.scss']
})
export class AvocatGridComponent implements OnInit {
  
   
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
 
   //getting customers per page 
   pageSize: number = 9;
 
   //declaration of customers list variable
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
 