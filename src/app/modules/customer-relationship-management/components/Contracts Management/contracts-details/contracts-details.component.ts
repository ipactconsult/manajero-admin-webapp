import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Order} from '../../../models/Order';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {OrderService} from '../../../services/orders/order.service';

const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-contracts-details',
  templateUrl: './contracts-details.component.html',
  styleUrls: ['./contracts-details.component.scss']
})
export class ContractsDetailsComponent implements OnInit {

   idUri: string = '';
  order: Order = new Order();
     @Output() dataChanged = new EventEmitter<Order>();
  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  constructor(private orderService: OrderService,     
              private toaster: NbToastrService,
              private activatedroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.orderService.getOrderById(this.idUri).subscribe(data => {
      this.order = data;

      error => console.log(error);
    });
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
    this.toaster.show(
      body,
      `${titleContent}`,
      config);
  }
  
  /*  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  idUri: string = '';
  contract: Contract = new Contract();
  visits;
  dataDeals: Deals [] = [];

  constructor(private cs: ContractService, private ds: DealsService, 
              private activatedroute: ActivatedRoute, private vs: VisitService) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.cs.getContractById(this.idUri).subscribe(data => {
      this.contract = data;
      error => console.log(error);
    });

    this.vs.getAllVisits()
      .subscribe(
        (data: Visit[]) => {
          this.visits = data;
        }
      );

    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = data;
      }
    );
  }

   public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    
    const documentDefinition = {
     
      pageSize: 'A3',
      content: [html],
    };

   
   // @ts-ignore
     pdfMake.createPdf(documentDefinition).open();

  }*/

}
