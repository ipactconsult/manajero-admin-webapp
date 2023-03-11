import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../../../models/Customer';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from '@nebular/theme';
import {CustomerService} from '../../../services/customers/customer.service';
import {Router} from '@angular/router';
import {ExportService} from '../../../../../shared/exports/export.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'ngx-prospects-history',
  templateUrl: './prospects-history.component.html',
  styleUrls: ['./prospects-history.component.scss']
})
export class ProspectsHistoryComponent implements OnInit {
countries: any [] = [];

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  customer: Customer = new Customer();
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  dataCustomers: Customer [] = [];
  
  constructor(private cs: CustomerService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService, private exportService: ExportService) {
  }


  ngOnInit(): void {
    this.getAllCustomers();
    this.countries = GoogleCountries;
  }

  getAllCustomers() {
    this.cs.findProspectsArchived().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (c => c.archive === "True" )
        );

      }, (err) => {
        return err;
      }
    );
  }
  
  
   onRestoreConfirm(customer: Customer, id: string) {
    this.cs.cancelArchiveCustomer(customer,id).subscribe(
      () => {
        this.showToast('success', 'Restored Successfully',
          'Customer restored !!');
        this.router.navigate(['/crm/list-prospects']).then(() => {
         window.location.reload();
        });
      });
  }
  
  getCustomersDesc() {
    this.cs.findAllCustomerDesc().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
                    ( cut =>  cut.archive=== "True" || cut.status === 'Prospect')
                )
      }, (err) => {
        console.log(err);
      },
    );
  }

  getCustomersAsc() {
    this.cs.findAllCustomerAsc().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data.filter(
          (cut =>  cut.archive=== "True")
        );
      }, (err) => {
        console.log(err);
      },
    );
  }

  getCustomersByStatus(e) {
    this.filterByStatus(e);
  }

  filterByStatus(e) {
    this.cs.getAllCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = [];
        this.dataCustomers = data.filter(
          (d =>
              d.status === e  &&  d.archive=== "True"
          )
        );
      }, (err) => {
        return err;
      });
  }
  

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataCustomers, 'dataCustomers');
  }

  public openPDF(): void {

    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4', true);
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('customers.pdf');
    });
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

}
