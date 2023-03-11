import {Component, OnInit, ViewChild} from '@angular/core';
import {Expenses} from "../../../models/Expenses";
import {FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../../../models/Employee";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from "@nebular/theme";
import {TokenStorageService} from "../../../../auth/service/token/token.service";
import {ExpenseService} from "../../../services/expenses/expense.service";
import {EmployeeService} from "../../../services/employeeServices/employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ngx-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {

  ckeConfig: any;
  @ViewChild("fiscalPower") myckeditor: any;
  @ViewChild("comments") myckeditorP: any;
  expense: Expenses= new Expenses();
  id: string= "";
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

    private tokenStorageService: TokenStorageService, private activatedroute: ActivatedRoute,
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

    this.activatedroute.paramMap.subscribe(result => {
      this.id = result.get('id');
    });

    this.expenseService.getExpenses(this.id).subscribe(data => {
      this.expense = data;
      // @ts-ignore
      this.selectedEmployee=data?.assignee?.id;
      error => console.log(error);
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


  updateExpense()
  {
    this._employee.id = this.selectedItem;
    this.expense.employee= this._employee;
    this.expenseService.updateExpense(this.expense, this.id).subscribe(()=>{
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

 
}
