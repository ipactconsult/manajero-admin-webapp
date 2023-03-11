import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../service/Transaction/transaction.service";
import {DatePipe} from "@angular/common";
import Chart from "chart.js";
import {SalesService} from "../../service/Sales/sales.service";
import {ProductsSalesService} from "../../service/ProductsSales/products-sales.service";
import {BudgetsService} from "../../service/BudgetService/budgets.service";

@Component({
  selector: 'ngx-finance-insights',
  templateUrl: './finance-insights.component.html',
  styleUrls: ['./finance-insights.component.scss']
})
export class FinanceInsightsComponent implements OnInit {

  constructor( private ts:TransactionService,private ss:SalesService,private ps :ProductsSalesService,private bs:BudgetsService) {}
  
  date: Date= new Date()
  dateString= new DatePipe('en-EN').transform(this.date, 'mediumDate' );
  year = this.date.getFullYear()
  totalBalance;
  totalIncome;
  totalExpense;
  monthBalance;
  monthIncome;
  monthExpense;
  total;
  month;
  monthBalancePercentage;
  monthExpensePercentage;
  monthIncomePercentage;
  todayTransactions;
  todayBalance=0
  todayExpense=0
  todayIncome=0
  todayBalancePercentage;
  todayExpensePercentage;
  todayIncomePercentage;
  totalBalances=[]
  totalIncomes=[]
  totalExpenses=[]
  maxBalMonth;
  maxIncMonth;
  maxExMonth;
  cashFlowChart;
  incomesTypeChart;
  expenseTypeChart;
  transactionsDirectionChart;
  transactionsStatesChart;
  deliveryChart;
  paymentChart;
  incomeChart;
  expenseChart;
  forecastChart;
  numOpIncome=0
  numNonOpIncome=0
  numOpExpense=0
  numNonOpExpense=0
  numReconciledTransactions=0
  numNonReconciledTransactions=0
  undeliveredBills;
  deliveredBills;
  paidCommands;
  unpaidCommands;
  expenseActual=0
  incomeActual=0;
  expenseBudget=0;
  incomeBudget=0;
  forecastExpenses;
  
  toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  ngOnInit(): void {
    this.ts.getGlobal(this.year,0).subscribe(next=>{
      this.total= next.filter(ele=>ele.id=="Total")
      this.totalBalance=this.total[0].totalbalance/1000
      this.totalIncome=this.total[0].totalincome/1000
      this.totalExpense=this.total[0].totalexpense/1000
      
      this.month=next.filter(ele=>ele.id==""+(this.date.getMonth()+1))
      this.monthBalance=(this.month[0].totalbalance/1000).toFixed(2)
      this.monthIncome=this.month[0].totalincome/1000
      this.monthExpense=this.month[0].totalexpense/1000
      this.monthBalancePercentage=(this.monthBalance*100/this.totalBalance).toFixed(2)
      this.monthIncomePercentage=(this.monthIncome*100/this.totalIncome).toFixed(2)
      this.monthExpensePercentage=(this.monthExpense*100/this.totalExpense).toFixed(2)
      if (this.totalBalance==0) {
        this.monthBalancePercentage=0
      }
      if (this.totalIncome==0) {
        this.monthIncomePercentage=0
      }
      if (this.totalExpense ==0) {
        this.monthExpensePercentage=0
      }
      
      let filtered= next.filter(ele=>ele.id!="Total" && ele.id!="Averages")
      filtered.sort((a,b)=>Number(a.id)-Number(b.id))
      filtered.forEach(obj=>{
        this.totalBalances.push(obj.totalbalance)
        this.totalIncomes.push(obj.totalincome)
        this.totalExpenses.push(obj.totalexpense)


      })
      
      if ( next[12].totalbalance==0) {
        this.maxBalMonth ="None"
      }
      else {
      let maxBalances = Math.max(...this.totalBalances)
      let maxBalIndex = this.totalBalances.indexOf(maxBalances)
      this.maxBalMonth=this.toMonthName(maxBalIndex+1)}
      if ( next[12].totalincome==0) {
        this.maxIncMonth ="None"
      }
      else {
      let maxIncomes = Math.max(...this.totalIncomes)
      let maxIncIndex = this.totalIncomes.indexOf(maxIncomes)
      this.maxIncMonth=this.toMonthName(maxIncIndex+1)}
      if ( next[12].totalexpense==0) {
        this.maxExMonth ="None"
      }
      else {
      let maxExpenses = Math.max(...this.totalExpenses)
      let maxExIndex = this.totalExpenses.indexOf(maxExpenses)
      this.maxExMonth=this.toMonthName(maxExIndex+1)}
      this.bs.retrieveForecastMoneyFlowTotalExpense(this.year).subscribe(result=>{
        this.forecastExpenses=result
        this.forecastChart = new Chart('forecast', {
          type: 'bar',
          data: {
            labels: ["This Year's Balance",'Potential Expense'],

            datasets: [{
              
              data: [this.totalBalance*1000,this.forecastExpenses],
              fill:false,
              backgroundColor: [
                '#16A085',
                '#2E86C1'
              ],

              borderWidth: 1
            },


            ]
          },
          options: {

            legend :{
              display:false,
              labels :{
                fontColor: "black"
              }},

            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontColor:"grey"

                },


              }],
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontColor:"grey"

                },


              }]



            }
          }
        })
      })
      this.cashFlowChart = new Chart('cashFlow', {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],

          datasets: [{
            label: 'Balance',
            data: this.totalBalances,
            fill:false,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [

              'rgba(54, 162, 235, 1)',
             
            ],
            borderWidth: 1
          },
            
            {
              label: 'Income',
              data: this.totalIncomes,
              fill:false,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [

               'green'
              ],
              borderWidth: 1
            },
            {
              label: 'Expense',
              data: this.totalExpenses,
              fill:false,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
'red'
              ],
              borderWidth: 1
            },
          
          ]
        },
        options: {
          legend :{
            labels :{
              fontColor: "black"
            }

          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }]



          }
        }
      });

      this.ts.getAllTransactions().subscribe(result=>{

        result.forEach(ele=>{
          if (new DatePipe('en-EN').transform(new Date(ele.date), 'mediumDate' ) ==new DatePipe('en-EN').transform(this.date, 'mediumDate' )) {
            this.todayBalance=Number(((this.todayBalance+ ele.balance)/1000).toFixed(2))
            this.todayIncome=Number((this.todayIncome+ ele.income/1000).toFixed(2))
            this.todayExpense=Number((this.todayExpense+ ele.expense/1000).toFixed(2))



          }
          if(ele.income>0 && ele.type=="Operating") {
            this.numOpIncome++
          }
          if(ele.income>0 && ele.type=="Non Operating") {
            this.numNonOpIncome++
          }
          if(ele.expense>0 && ele.type=="Operating") {
            this.numOpExpense++
          }
          if(ele.expense>0 && ele.type=="Non Operating") {
            this.numNonOpExpense++
          }
          if( ele.reconciled ==false){
            this.numNonReconciledTransactions ++
            
          }
          else {
            this.numReconciledTransactions ++

          }
          
          
        })
        this.incomesTypeChart = new Chart('incomeTypes', {
          type: 'doughnut',
          data: {
            labels: ['Operating','Non Operating'],

            datasets: [{
              label: 'Incomes Types',
              data: [this.numOpIncome,this.numNonOpIncome],
              fill:false,
              backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
              ],
             
              borderWidth: 1
            },

              
            ]
          },
          options: {
            legend :{
              labels :{
                fontColor: "black"
              }

            },
           
          }
        })
        this.expenseTypeChart = new Chart('expenseTypes', {
          type: 'doughnut',
          data: {
            labels: ['Operating','Non Operating'],

            datasets: [{
              label: 'Expenses Types',
              data: [this.numOpExpense,this.numNonOpExpense],
              fill:false,
              backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
              ],

              borderWidth: 1
            },


            ]
          },
          options: {
            legend :{
              labels :{
                fontColor: "black"
              }

            },

          }
        })
        this.transactionsStatesChart = new Chart('transactionsStates', {
          type: 'doughnut',
          data: {
            labels: ['Non Reconciled','Reconciled'],

            datasets: [{
              label: 'States',
              data: [this.numNonReconciledTransactions,this.numReconciledTransactions],
              fill:false,
              backgroundColor: [
                '#8B0000',
                'rgba(54, 162, 235, 1)',
                
              ],

              borderWidth: 1
            },


            ]
          },
          options: {
            legend :{
              labels :{
                fontColor: "black"
              }

            },

          }
        })

        this.transactionsDirectionChart = new Chart('transactionsDirection', {
          type: 'doughnut',
          data: {
            labels: ['Expense','Income'],

            datasets: [{
              label: 'Expenses Types',
              data: [this.numOpExpense+this.numNonOpExpense,this.numOpIncome+this.numNonOpIncome],
              fill:false,
              backgroundColor: [
                '#8B0000',
                'rgba(54, 162, 235, 1)',

              ],

              borderWidth: 1
            },


            ]
          },
          options: {
            legend :{
              labels :{
                fontColor: "black"
              }

            },

          }
        })



        this.todayBalancePercentage=(this.todayBalance*100/this.monthBalance).toFixed(2)
        this.todayIncomePercentage=(this.todayIncome*100/this.monthIncome).toFixed(2)
        this.todayExpensePercentage=(this.todayExpense*100/this.monthExpense).toFixed(2)
        if (this.monthBalance==0) {
          this.todayBalancePercentage=0
        }
        if (this.monthIncome==0) {
          this.todayIncomePercentage=0
        }
        if (this.monthExpense==0) {
          this.todayExpensePercentage=0
        }
      })

    })
    
    
   this.ss.countUndeliveredBills().subscribe(result=>{
     this.undeliveredBills=result
     this.ss.getBills().subscribe(next=>{
       this.deliveredBills= next.length -this.undeliveredBills
       this.ps.getProductBills().subscribe(then=>{
         this.deliveredBills= this.deliveredBills +then.length
         this.deliveryChart = new Chart('delivery', {
           type: 'horizontalBar',
           data: {
             labels: ['Delivered','Undelivered'],

             datasets: [{
               label: 'Number of Orders',
               data: [this.deliveredBills,this.undeliveredBills],

               backgroundColor: [
                 'rgba(54, 162, 235, 1)',
                 '#8B0000'
               ],

               borderWidth: 1
             },


             ]
           },
           options: {

             legend :{
               display:false,
               labels :{
                 fontColor: "black"
               }},

             scales: {
               yAxes: [{
                 ticks: {
                   beginAtZero: true,
                   fontColor:"grey"

                 },


               }],
               xAxes: [{
                 ticks: {
                   beginAtZero: true,
                   fontColor:"grey"

                 },


               }]



             }
           }
         })       })     })
     
     
   }
   )
    
    this.ss.countUnpaidOrders().subscribe(result=>{
      this.unpaidCommands=result
      this.ss.getAllOrders().subscribe(next=>{
        this.paidCommands=next.length-this.unpaidCommands
        this.ps.getProductPurchaseOrders().subscribe(then=>{
          this.paidCommands= this.paidCommands +then.length
          this.paymentChart = new Chart('payment', {
            type: 'horizontalBar',
            data: {
              labels: ['Paid','Unpaid'],

              datasets: [{
                label: 'Number of Orders',
                data: [this.paidCommands,this.unpaidCommands],
                fill:false,
                backgroundColor: [
                  'rgba(54, 162, 235, 1)',
                  '#8B0000'
                ],

                borderWidth: 1
              },


              ]
            },
            options: {

              legend :{
                display:false,
                labels :{
                  fontColor: "black"
                }},

              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    fontColor:"grey"

                  },


                }],
                xAxes: [{
                  ticks: {
                    beginAtZero: true,
                    fontColor:"grey"

                  },


                }]



              }
            }
          })
        })
      })
      
        
    }
    )
    
    this.bs.getAllMoneyFlow("Income",this.year,"void","Yearly").subscribe(result=>{
      result.forEach(ele=>{
        if ( ele.subCategory =="Total Income") {
          this.incomeActual=ele.actual
          this.incomeBudget=ele.budget
        }
        
      })
      this.incomeChart = new Chart('income', {
        type: 'bar',
        data: {
          labels: ['Actual','Budget'],

          datasets: [{
            label: 'Amount',
            data: [this.incomeActual,this.incomeBudget],
            fill:false,
            backgroundColor: [
              '#900C3F',
              '#000080'
            ],

            borderWidth: 1
          },


          ]
        },
        options: {

          legend :{
            display:false,
            labels :{
              fontColor: "black"
            }},

          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }]



          }
        }
      })
    })
    this.bs.getAllMoneyFlow("Expense",this.year,"void","Yearly").subscribe(result=>{
     
      result.forEach(ele=>{
        if ( ele.subCategory =="Total Expense") {
          this.expenseActual=ele.actual
          this.expenseBudget=ele.budget
        }
      })
      this.expenseChart = new Chart('expense', {
        type: 'bar',
        data: {
          labels: ['Actual','Budget'],

          datasets: [{
            label: 'Amount',
            data: [this.expenseActual,this.expenseBudget],
            fill:false,
            backgroundColor: [
              '#900C3F',
              '#000080'
            ],

            borderWidth: 1
          },


          ]
        },
        options: {

          legend :{
            display:false,
            labels :{
              fontColor: "black"
            }},

          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor:"grey"

              },


            }]



          }
        }
      })
    })
    
   
  }

}
