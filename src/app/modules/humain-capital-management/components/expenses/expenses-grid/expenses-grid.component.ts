import { Component, OnInit } from '@angular/core';

import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { Expenses } from '../../../models/Expenses';
import {ExpenseService} from '../../../services/expenses/expense.service';
import { ExportService } from '../../../../../shared/exports/export.service';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-expenses-grid',
  templateUrl: './expenses-grid.component.html',
  styleUrls: ['./expenses-grid.component.scss']
})
export class ExpensesGridComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Data Loaded Successfuly';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  dataExpenses : Expenses[]= [];
  pageSize= 11;
  current = 1;
  searchbyfields = "";
  constructor(private expenseService : ExpenseService, private toastrService : NbToastrService,
              private router: Router,
              private exportService: ExportService,) { }

  ngOnInit(): void {

    this.getAllExpenses();
  }

  getAllExpenses(){
  this.expenseService.findAllExpenses().subscribe((data:Expenses[])=>{
    this.dataExpenses=data;
  });

  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }
  filterByEmployee(e) {
    this.expenseService.findAllExpenses().subscribe(
      (data: Expenses[]) => {
        this.dataExpenses = [];
        this.dataExpenses = data.filter(
          (d =>
              //@ts-ignore
              d?.employee?.id === e
          )
        );
        this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  filterByStatus(e) {
    this.expenseService.findAllExpenses().subscribe(
      (data: Expenses[]) => {
        this.dataExpenses = [];
        this.dataExpenses = data.filter(
          (d =>
              //@ts-ignore
              d.status === e
          )
        );
        this.showToast('success','SUCCESS',"You have launched a filtering operation");
      }, (err) => {
        this.showToast('danger','DANGER',err.data);
      });
  }

  getExpensesDesc()
  {
    this.dataExpenses = this.dataExpenses.sort(
      (a,b)=>
        b['expenseName'].localeCompare(a['expenseName'])
    )

    this.showToast('success','SUCCESS',"You have launched a sort operation");
  }


  getExpensesAsc()
  {
    this.dataExpenses = this.dataExpenses.sort(
      (a,b)=>
        a['expenseName'].localeCompare(b['expenseName'])
    )

    this.showToast('success','SUCCESS',"You have launched a sort operation");
  }

  archiveExpense(expense: Expenses, id: string){
    this.expenseService.archiveExpense(expense, id).subscribe(()=>{
    
    })
  }
//archive expense function
  onArchiveConfirm(expenses: Expenses, id: string) {
    this.expenseService.archiveExpense(expenses, id).subscribe(
      () => {
        this.showToast('success', 'Archived Successfully',
          'Expense Archived !!');
        this.getAllExpenses();
        this.router.navigate(['/hr/expenses/keypad']).then(() => {
          this.getAllExpenses();
        });
      });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataExpenses, 'dataExpenses');
  }


}
