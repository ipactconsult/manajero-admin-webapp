import {Component, ElementRef, Input, OnInit,  ViewChild} from '@angular/core';
import {DealsService} from '../../../services/deals/deals.service';
import {Deals} from '../../../models/Deals';

import {
  NbComponentStatus, NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';

declare var require: any;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {ExportService} from '../../../../../shared/exports/export.service';
import {Router} from '@angular/router';
import {VisitService} from '../../../services/visits/visit.service';
import {Visit} from '../../../models/visit';
import {CustomerService} from '../../../services/customers/customer.service';
import {Customer} from '../../../models/Customer';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';

const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  dataDeals: Deals [] = [];
  dataCustomers: Customer [] = [];
  properties;
  list: Employee[]=[];
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  selectedDeal: Deals;
  search: string;
  @Input() deal = Deals;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  current: number = 1;
  dataVisits: Visit [] = [];
  pageSize:number=6;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  optionsType = [
    {key: 1, value: 'Acquisition'},
    {key: 2, value: 'Financing'},
    {key: 3, value: 'Development'},
    {key: 4, value: 'Disposition'},
  ];
  selectedOptionTypeDeal = this.optionsType['Acquisition'];

  constructor(private ds: DealsService,private dialogService: NbDialogService,private  es: EmployeeService,
              private cs: CustomerService, private windowService: NbWindowService, private vs: VisitService,
              private exportService: ExportService, private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllDeals();
//employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );

    //properties data
    this.vs.findAllProperties().subscribe(
      (data) => {
        this.properties = data;

      }, error => console.log(error)
    );

    this.vs.getAllVisits()
      .subscribe(
        (data: any[]) => {
          this.dataVisits = data;
        }
      );
    this.cs.getAllCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data;

      }
    );
  }

  getAllDeals() {
    this.ds.getDealNotArchived().subscribe(
      (data: Deals[]) => {
        this.dataDeals = data;
      }
    );
  }

  onSelect(deal): void {
    this.selectedDeal = deal;
  }

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Deals Details',
      },
    );
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataDeals, 'dataDeals');
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = {
      pageOrientation: 'landscape',
      pageSize: 'A3',
      content: [html],
    };

    // @ts-ignore
    pdfMake.createPdf(documentDefinition).download();

  }

  filterByStatus(e) {
    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = [];
        this.dataDeals = data.filter(
          (d =>
              d.dealStatus === e

          )
        );
      }, (err) => {
        return err;
      });
  }

  getDealsByStatus(e) {
    this.filterByStatus(e);
  }

  filterByDealType(e) {
    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = [];
        this.dataDeals = data.filter(
          (d =>
              d.dealType === e
          )
        );
      }, (err) => {
        return err;
      });
  }

  getDealsByDealType(e) {
    this.filterByDealType(e);
  }

  onMenuItemSelectedTypeDeal(selectedOne) {
    this.selectedOptionTypeDeal = selectedOne;
  }

  filterByEmployee(e) {
    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = [];

        this.dataDeals = data.filter(
          (d =>
              //@ts-ignore
              d?.visit?.customer?.assignee?.id === e
          )
        );
      }, (err) => {
        return err;
      });
  }


  filterByProperty(e) {
    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = [];

        this.dataDeals = data.filter(
          (d =>
              //@ts-ignore
              d?.visit?.property?.propertyId === e
          )
        );
      }, (err) => {
        return err;
      });
  }

  getVisitsByCustomer(e) {
    this.filterByCustomer(e);
  }

  filterByCustomer(e) {
    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = [];

        this.dataDeals = data.filter(
          (d =>

              d?.visit?.customer?.id === e
          )
        );
      }, (err) => {
        return err;
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


  onArchiveConfirm(deals: Deals, id: string) {
    this.ds.archiveDeals(deals,id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Deal Archived !!');
        this.getAllDeals();
        this.router.navigate(['/crm/deals']).then(() => {
          this.getAllDeals();
        });
      });
  }

}