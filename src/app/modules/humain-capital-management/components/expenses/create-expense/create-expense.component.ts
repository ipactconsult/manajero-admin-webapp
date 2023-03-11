import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Employee } from '../../../models/Employee';
import { Expenses } from '../../../models/Expenses';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { ExpenseService } from '../../../services/expenses/expense.service';

@Component({
  selector: 'ngx-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  ckeConfig: any;
  @ViewChild("fiscalPower") myckeditor: any;
  @ViewChild("comments") myckeditorP: any;
  expense: Expenses= new Expenses();

  formExpense : FormGroup;

  employees : Employee[]=[];
  _employee : Employee = new Employee();
  selectedItem = "";

  config : NbToastrConfig;
  title = 'Create Training';
  content = 'Operation achieved';
  duration = 2000;
  _status : NbComponentStatus = 'success';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;


  user : any;

  constructor(
    
    private tokenStorageService: TokenStorageService,
    private expenseService : ExpenseService
             ,private employeeService : EmployeeService
             ,private nbToastrService: NbToastrService) {

              
              }

  ngOnInit(): void {
    this.formExpense = new FormGroup({
      expenseName : new FormControl(''),
      expenseType : new FormControl(''),
      expenseDate : new FormControl(''),
      toBeInvoiced : new FormControl(''),
      totalTTCAmount : new FormControl(''),
      comments : new FormControl(''),
      tvaAmount : new FormControl(''),
      status : new FormControl(''),
      htAmount : new FormControl(''),
      distanceDriven : new FormControl(''),
      startingCity : new FormControl(''),
      endingCity : new FormControl(''),
      fiscalPower : new FormControl(''),
      employee: new FormControl('')
    });

    this.ckeConfig = {
      allowedContent: true,
  } ; 



    this.getEmployees();
    this.user = this.tokenStorageService.getUser();
  }

  get expenseName(){return this.formExpense.get('expenseName');}
  get expenseType(){return this.formExpense.get('expenseType');}
  get expenseDate(){return this.formExpense.get('expenseDate');}
  get totalTTCAmount(){return this.formExpense.get('totalTTCAmount');}
  get toBeInvoiced(){return this.formExpense.get('toBeInvoiced');}
  get comments(){return this.formExpense.get('comments');}
  get status(){return this.formExpense.get('status');}
  get htAmount(){return this.formExpense.get('htAmount');}
  get distanceDriven(){return this.formExpense.get('distanceDriven');}
  get endingCity(){return this.formExpense.get('endingCity');}
  get fiscalPower(){return this.formExpense.get('fiscalPower');}
  get startingCity(){return this.formExpense.get('startingCity');}
  get employee(){return this.formExpense.get('employee');}


  addExpense()
  {
    this._employee.id = this.selectedItem;
    this.expense.employee= this._employee;
    this.expenseService.addExpense(this.expense).subscribe(()=>{
      this.showToast('success','SUCCESS','Created Successfully');      
    },()=>{      
      this.showToast('danger','DANGER','Error While Create A New expense');
    })
  }

  getEmployees()
  {
    this.employeeService.findAll().subscribe((data)=>{
      this.employees = data.filter((e)=>e.isArchived == 'No');
    });
  }

  getEmployeeSelected(event)
  {
    this.selectedItem = event;
    console.log(this.selectedItem)
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      _status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? ` ${title}` : '';
    this.nbToastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }

  onChange(event){
    console.log("OnChange Event  : "+event);
    this.expense.comments = event;
    console.log("On Change Description : "+this.expense.comments);
  }
  onEditorChange(event){
    console.log(event);
    
  }

  onReady(event){
    console.log(event);
    
  }
  onFocus(event){
    console.log("OnChange Event  : "+event);
    this.expense.fiscalPower = event;
    console.log("On Change Description : "+this.expense.fiscalPower);
  }

  
  onBlur(event){
    console.log("OnChange Event  : "+event);
    this.expense.fiscalPower = event;
    console.log("On Change Description : "+this.expense.fiscalPower);
  }


  onContentDom(event)
  {
    console.log(event);
    
  }

  onFileUploadRequest(event)
  {
    console.log(event);
    
  }
  onFileUploadResponse(event)
  {
    console.log(event);
    
  }

  onPaste(event)
  {
    console.log(event);
  }

  onDrop(event)
  {
    console.log(event);
  }


  

}
