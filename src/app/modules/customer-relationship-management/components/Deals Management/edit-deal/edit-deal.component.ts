import {Component, OnInit} from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup} from '@angular/forms';
import {DealsService} from '../../../services/deals/deals.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Deals} from '../../../models/Deals';
import {Visit} from '../../../models/visit';
import {VisitService} from '../../../services/visits/visit.service';

@Component({
  selector: 'ngx-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.scss']
})
export class EditDealComponent implements OnInit {
  dataVisits: Visit [] = [];

  currentDate= new Date();
  deal: Deals = new Deals();
  idUri = '';
  dealGroup: FormGroup;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  selectedItem: any;
  options = [
    {key: 1, value: 'In Progress'},
    {key: 2, value: 'paused'},
    {key: 3, value: 'Done'},
    {key: 4, value: 'Canceled'},
  ];
  selectedOption = this.options['In Progress'];
  optionsType = [
    {key: 1, value: 'Acquisition'},
    {key: 2, value: 'Financing'},
    {key: 3, value: 'Development'},
    {key: 4, value: 'Disposition'},
  ];

  constructor(private toastrService: NbToastrService, private vs: VisitService,
              private ds: DealsService, private router: Router,
              private activatedroute: ActivatedRoute) {

    this.dealGroup = new FormGroup({
      dealName: new FormControl(''),
      dealValue: new FormControl(''),
      forecastDate: new FormControl(''),
      customerBudget: new FormControl(''),
      winChance: new FormControl(''),
      budgetStage: new FormControl(''),
      quoteValue: new FormControl(''),
      quoteDate: new FormControl(''),
      quoteVsBudget: new FormControl(''),
      dealStatus: new FormControl(''),
      source: new FormControl(''),
            dealDate: new FormControl(),

      comment: new FormControl(''),
      dealType: new FormControl(''),
      negotiation: new FormControl(''),
      visit: new FormControl(''),

    });
  }

  get dealName() {
    return this.dealGroup.get('dealName');
  }

  get dealValue() {
    return this.dealGroup.get('dealValue');
  }

  get dealDate() {
    return this.dealGroup.get('dealDate');
  }

  get forecastDate() {
    return this.dealGroup.get('forecastDate');
  }

  get customerBudget() {
    return this.dealGroup.get('customerBudget');
  }

  get visit() {
    return this.dealGroup.get('visit');
  }

  get winChance() {
    return this.dealGroup.get('winChance');
  }

  get budgetStage() {
    return this.dealGroup.get('budgetStage');
  }

  get quoteValue() {
    return this.dealGroup.get('quoteValue');
  }

  get quoteDate() {
    return this.dealGroup.get('quoteDate');
  }

  get quoteVsBudget() {
    return this.dealGroup.get('quoteVsBudget');
  }

  get dealStatus() {
    return this.dealGroup.get('dealStatus');
  }

  get source() {
    return this.dealGroup.get('source');
  }

  get comment() {
    return this.dealGroup.get('comment');
  }

  get dealType() {
    return this.dealGroup.get('dealType');
  }

  get negotiation() {
    return this.dealGroup.get('negotiation');
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.ds.getDealById(this.idUri).subscribe(data => {
      this.deal = data;
      this.selectedItem = data?.visit?.id;
//      this.selectedOption = data.dealStatus;
      error => console.log(error);
    });

    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = data;

      }
    );
  }

  onMenuItemSelected(selectedOne) {
    console.log(selectedOne);
    this.selectedOption = selectedOne;
  }

  onMenuItemSelectedTypeDeal(selectedOne) {
    console.log(selectedOne);
    this.selectedOption = selectedOne;
  }

  onMenuItemSelectedVisit(selectedOne) {
    this.selectedItem = selectedOne;
  }

  updateDealFunction() {
    this.deal.visit = <Visit>{id: this.selectedItem};
    
      console.log("dataa : "+this.deal)
    this.ds.updateDeal(this.idUri, this.deal).subscribe(result => {
            console.log("dataa : "+this.deal)
        this.showToast('success', 'Update ! ', 'Deal Updated Successfully!!');
            this.router.navigateByUrl('/crm/deals');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast('danger', 'Update !!', err.error.message);

        } else {
          this.showToast('danger', 'Update !!', err.error.message);
        }
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
