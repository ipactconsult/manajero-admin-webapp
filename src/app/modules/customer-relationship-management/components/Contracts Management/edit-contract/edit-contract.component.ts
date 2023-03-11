import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {ContractService} from '../../../services/contracts/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoiService} from '../../../../litige-recouvrement/services/lois/loi.service';
import {Contract} from '../../../models/Contract';
import {Deals} from '../../../models/Deals';
import {DealsService} from '../../../services/deals/deals.service';

@Component({
  selector: 'ngx-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.scss']
})
export class EditContractComponent implements OnInit {
  contract: Contract;
  //difference var
  difference;
  idUri;
  contractGroup: FormGroup;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  dataDeals: Deals[] = [];

   options = [
    {key: 1, value: 'REDC'}, //Real estate development contract
    {key: 2, value: 'SFSC'},//Sale in Future State of Completion 
    {key: 3, value: 'SFSR'},//Sale in Future State of Renovation 
  ];

  selectedItem = this.options['CPI'];
  selectedOption;

  constructor(private cs: ContractService, private router: Router,
              private activatedroute: ActivatedRoute,
              private fb: FormBuilder, private ds: DealsService,
              private toastrService: NbToastrService, private loisc: LoiService) {
    const formcontrols = {
      contractCode: new FormControl(''),
      contractName: new FormControl(''),
      contractType: new FormControl(''),
      state: new FormControl(''),
      designation: new FormControl(''),
     
      priceEffective: new FormControl(''),
      finalPrice: new FormControl(''),
      tax: new FormControl(''),

      deal: new FormControl(''),


    };
    this.contractGroup = this.fb.group(formcontrols);
  }

  get contractCode() {
    return this.contractGroup.get('contractCode');
  }

  get tax() {
    return this.contractGroup.get('tax');
  }

  get finalPrice() {
    return this.contractGroup.get('finalPrice');
  }

  get dateFin() {
    return this.contractGroup.get('dateFin');
  }

  get dateContract() {
    return this.contractGroup.get('dateContract');
  }

  get contractType() {
    return this.contractGroup.get('contractType');
  }

  get contractName() {
    return this.contractGroup.get('contractName');
  }

  get state() {
    return this.contractGroup.get('state');
  }

  get designation() {
    return this.contractGroup.get('designation');
  }

  get priceEffective() {
    return this.contractGroup.get('priceEffective');
  }

  get deal() {
    return this.contractGroup.get('deal');
  }

  onMenuItemSelectedContractType(selectedOne) {
    this.selectedItem = selectedOne;
  }

  onMenuItemSelectedDeal(selectedOne) {
    this.selectedOption = selectedOne;
  }

  ngOnInit(): void {


    this.contract = new Contract();
    this.ds.getAllDeals().subscribe(
      (data: Deals[]) => {
        this.dataDeals = data;
      }
    );
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');

    });

    this.cs.getContractById(this.idUri).subscribe(data => {
      this.contract = data;
     // this.selectedOption = data?.deal?.id;
      error => {
        this.showToast('danger', 'Get Contract ! ', error.toString());
      };
    });
  }

  updateContractFunction() {
  //  this.difference= this.contract.dateFin.getDate()-this.contract.dateContract.getDate();
    //this.contract.duration=this.difference;

   // this.contract.deal = <Deals>{id: this.selectedOption};
    
    this.cs.updateContract(this.contract, this.idUri).subscribe((result) => {
        this.showToast('success', 'Update ! ', 'Contract updated Successfully!!');

        this.router.navigateByUrl('/crm/contracts');
      },
      (err) => {
                this.showToast('danger', 'Update ! ', 'Something wents wrong while updating a contract!!!');

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