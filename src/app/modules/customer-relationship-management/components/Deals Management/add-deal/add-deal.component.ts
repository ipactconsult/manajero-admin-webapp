import {Component, OnInit} from '@angular/core';
import {Deals} from '../../../models/Deals';
import {DealsService} from '../../../services/deals/deals.service';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {Visit} from '../../../models/visit';
import {VisitService} from '../../../services/visits/visit.service';

@Component({
  selector: 'ngx-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss']
})
export class AddDealComponent implements OnInit {
  dataVisits: Visit [] = [];
  deal: Deals = new Deals();
  dealGroup: FormGroup;
  extra_form: FormGroup = new FormGroup({});
  quotes_form: FormGroup = new FormGroup({});
  budget_form: FormGroup = new FormGroup({});
  visit_form: FormGroup = new FormGroup({});
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
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
  selectedOptionTypeDeal = this.optionsType['prospect'];
  private selectedItem: number;

  constructor(private ds: DealsService, private vs: VisitService,
              private toastrService: NbToastrService, private router: Router) {

    this.dealGroup = new FormGroup({
      dealName: new FormControl(''),
      dealValue: new FormControl(''),
      forecastDate: new FormControl(''),
      winChance: new FormControl(''),
      dealStatus: new FormControl(''),
      dealType: new FormControl(''),
      dealDate: new FormControl(""),

      quotes_form: new FormGroup({
        quoteValue: new FormControl(''),
        quoteDate: new FormControl(''),
        quoteVsBudget: new FormControl(''),
      }),

      budget_form: new FormGroup({
        customerBudget: new FormControl(''),
        budgetStage: new FormControl(''),
      }),

      visit_form: new FormGroup({
        visit: new FormControl(''),

      }),

      extra_form: new FormGroup({
        source: new FormControl(''),
        comment: new FormControl(''),
        negotiation: new FormControl(''),
      }),


    });
  }

  get dealName() {
    return this.dealGroup.get('dealName');
  }

  get dealValue() {
    return this.dealGroup.get('dealValue');
  }

  get forecastDate() {
    return this.dealGroup.get('forecastDate');
  }

  get customerBudget() {
    return this.dealGroup.get('customerBudget');
  }

  get winChance() {
    return this.dealGroup.get('winChance');
  }
  
  
  get dealDate() {
    return this.dealGroup.get('dealDate');
  }

  get budgetStage() {
    return this.dealGroup.get('budgetStage');
  }

  get quoteValue() {
    return this.dealGroup.get('quoteValue');
  }

  get visit() {
    return this.dealGroup.get('visit');
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
    this.vs.getAllVisitsNonArchived().subscribe(
      (data: Visit[]) => {
        this.dataVisits = data;

      }
    );
  }

  onMenuItemSelected(selectedOne) {
    this.selectedOption = selectedOne;
  }

  onDealFormSubmit() {
    this.dealGroup.markAsDirty();
  }

  onExtraFormSubmit() {
    this.extra_form.markAsDirty();
  }

  onQuotesFormSubmit() {
    this.quotes_form.markAsDirty();
  }

  onBudgetFormSubmit() {
    this.budget_form.markAsDirty();
  }

  onVisitFormSubmit() {
    this.visit_form.markAsDirty();
  }

  onMenuItemSelectedTypeDeal(selectedOne) {
    this.selectedOption = selectedOne;
  }

  onMenuItemSelectedVisit(selectedOne) {
    this.selectedItem = selectedOne;
  }

  addDealFunction() {
    this.deal.visit = <Visit>{id: this.selectedItem};
    this.ds.addDeal(this.deal).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Deal Added Successfully!!');
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
