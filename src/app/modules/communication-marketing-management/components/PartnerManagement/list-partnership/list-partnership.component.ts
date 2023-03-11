import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Parternership} from './../../../models/parternership';
import {ParternershipService} from './../../../services/parternership.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {ExportService} from "../../../../../shared/exports/export.service";
import {HttpErrorResponse} from "@angular/common/http";
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-list-partnership',
  templateUrl: './list-partnership.component.html',
  styleUrls: ['./list-partnership.component.scss']
})
export class ListPartnershipComponent implements OnInit {

  countries : any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  parternership : Parternership = new Parternership();
  config: NbToastrConfig;
  current: number=1;
  search: string="";
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  dataParternerships: Parternership [] = [];

  @Output() addParternershipOutputEvent = new EventEmitter<Parternership>();

  constructor(private parternershipService: ParternershipService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllPartners();
     this.countries = GoogleCountries;
  }

  getAllPartners(){
    this.parternershipService.getParternerships().subscribe(
      (data: Parternership[]) => {
        this.dataParternerships = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }


    );
  }





  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Partner',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Partner ?'});
  }

  add_Partner(p: Parternership) {
    this.addParternershipOutputEvent.emit(p);
  }



  onDeleteConfirm(p: Parternership) {

    this.parternershipService.deleteParternership(p.id).subscribe(
      () => {
        this.showToast("success", "Deleted", "Event deleted !!");
        this.router.navigate(["/communicationMarketing/Parternership"])
        window.location.reload()
      })
  }

  getPartnersDesc() {
    this.parternershipService.findAllPartnerDesc().subscribe(
      (data: Parternership[]) => {
        this.dataParternerships = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }
      );
  }

  getPartnersAsc() {
    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParternerships = data.filter(
          (c => c.archive === false )
        );

      }, (err) => {
        return err;
      }
  );
  }





  addPartner(event) {
    this.parternershipService.addParternership(event.newData).subscribe(result => {
        this.showToast("success", "Add !!", "Partner Added successffully  !!");
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast("danger", "Add !!", err.error.message);

        } else {
          this.showToast("danger", "Add !!", err.error.message);

        }
      }
    );
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
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataParternerships, 'dataParternerships');
  }



  getPartnerbyCountry(e, x) {
    this.filtrePartnerByCountry(e, x);
  }

  filtrePartnerByCountry(e, x) {
    this.parternershipService.findAllPartnerAsc().subscribe(
      (data: Parternership[]) => {
        this.dataParternerships = [];
        console.log(e);
        this.dataParternerships = data.filter(
          (c =>
              x == 'country' ? c.country === e : c.country === e  || c.archive === false
          )
        );
      }, (err) => {
        return err;
      });
  }

  onArchiveConfirm(p: Parternership, id: string) {


    this.parternershipService.archivePartner(p, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully', 'Patner Archived !!');
        this.ngOnInit();
      });

}




}