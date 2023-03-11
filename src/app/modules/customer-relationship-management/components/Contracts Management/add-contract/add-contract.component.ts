import {Component, OnInit} from '@angular/core';
import {ContractService} from '../../../services/contracts/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Loi} from '../../../../litige-recouvrement/models/Loi';
import {Contract} from '../../../models/Contract';
import {LoiService} from '../../../../litige-recouvrement/services/lois/loi.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DealsService} from '../../../services/deals/deals.service';
import {Order} from '../../../models/Order';
import {OrderService} from '../../../services/orders/order.service';

@Component({
  selector: 'ngx-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {
  //instanciate contract 
  contract: Contract = new Contract();
  //difference var
  difference;
  
  //declaration of data deals list
  dataOrders: Order[] = [];
  
  idUri: string = '';
  order: Order = new Order();

  //declaration of laws data 
  LoiList: Loi[] = [];
  
  //declaration of forms
  contractGroup: FormGroup = new FormGroup({});
  periodGroup: FormGroup = new FormGroup({});
  extraGroup: FormGroup = new FormGroup({});
 
  
  
 //toast configuration
  index = 1;
  destroyByClick = true;
  toastduration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  selectedOption;
  
  options = [
    {key: 1, value: 'REDC'}, //Real estate development contract
    {key: 2, value: 'SFSC'},//Sale in Future State of Completion 
    {key: 3, value: 'SFSR'},//Sale in Future State of Renovation 
  ];

  selectedItem = this.options['CPI'];

  constructor(private cs: ContractService, private router: Router, private ds: DealsService,
              private activatedroute: ActivatedRoute,
              private activatedRoute: ActivatedRoute, private fb: FormBuilder,private orderService: OrderService,
              private toastrService: NbToastrService, private loisc: LoiService) {
  
    //  initialization of forms group
      this.contractGroup =new FormGroup({
       contractCode: new FormControl(''),
       contractName: new FormControl(''),
       contractType: new FormControl(''),
       state: new FormControl(''),
       designation: new FormControl(''),
     
      periodGroup: new FormGroup({
              dateContract: new FormControl(''),
              dateFin: new FormControl(''),
      }), 
     
      });
  }
  
  
   onPeriodFormSubmit() {
    this.periodGroup.markAsDirty();
  }  
  
   onContractFormSubmit() {
    this.contractGroup.markAsDirty();
  }

  onExtraFormSubmit() {
    this.extraGroup.markAsDirty();
  }
  
  get contractCode() {
    return this.contractGroup.get('contractCode');
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
  
    //selection contract type item onChange
  onMenuItemSelectedContractType(selectedOne) {
    this.selectedItem = selectedOne;
  }
  
  //selection deal item onChange
    onMenuItemSelectedOrder(selectedOne) {
    this.selectedOption = selectedOne;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });
  }
  
  //contract creation function
  addContractFunction() {
    this.difference= this.contract.dateFin.getDate()-this.contract.dateContract.getDate();
    this.contract.duration=this.difference;
    this.orderService.assignContractOrder(this.idUri, this.contract).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Contract assigned Successfully!!');
        this.router.navigateByUrl('/crm/contracts');
      },
      (err: HttpErrorResponse) => {      
      this.showToast('danger', 'Add ! ', 'Something goes wrong while aading a contract');
      });
  }

  
  //show toast notification
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.toastduration,
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
