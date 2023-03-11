import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from "chart.js";
import {DatePipe} from "@angular/common";
import { PersonaService } from 'app/modules/communication-marketing-management/services/persona.service';
import { EventMarketingService } from 'app/modules/communication-marketing-management/services/event-marketing.service';
import moment from "moment";
import { NbThemeService, NbColorHelper } from '@nebular/theme';


@Component({
  selector: 'ngx-persona-stat',
  templateUrl: './persona-stat.component.html',
  styleUrls: ['./persona-stat.component.scss']
})
export class PersonaStatComponent implements OnInit, OnDestroy {

 
  constructor( private personaService:PersonaService , private theme: NbThemeService,
    private eventMarketingService : EventMarketingService ) {}
  

  data: any;
  options: any;
  themeSubscription: any;
  moment: any = moment;
  presentDate: Date = new Date();
  presentYear: number = this.moment(this.presentDate).format("YYYY");
  selectedItem = this.presentYear;
  lastFiveYears: number[] = [];
  selectedYear;
  eventJan = 0;
  eventFeb = 0;
  eventMar = 0;
  eventAp = 0;
  eventMay = 0;
  eventJune = 0;
  eventJuly = 0;
  eventAug = 0;
  eventSep = 0;
  eventOct = 0;
  eventNov = 0;
  eventDec = 0;
  
  
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
  female=0
  male=0
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
  single=0
  Divorced=0
  inarelationship=0
  married=0




  selectYear(selectedYear): void {
    this.eventJan = 0;
    this.eventFeb = 0;
    this.eventMar = 0;
    this.eventAp = 0;
    this.eventMay = 0;
    this.eventJune = 0;
    this.eventJuly = 0;
    this.eventAug = 0;
    this.eventSep = 0;
    this.eventOct = 0;
    this.eventNov = 0;
    this.eventDec = 0;
    this.presentYear = selectedYear;
    this.eventMarketingService.getAllEvents().subscribe(events => {
      for (let e = 0; e < events.length; e++) {
        if (this.moment(events[e].date).format("MMMM") === "January" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventJan = this.eventJan + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "February" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventFeb = this.eventFeb + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "March" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventMar = this.eventMar + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "April" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventAp = this.eventAp + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "May" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventMay = this.eventMay + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "June" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventJune = this.eventJune + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "July" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventJuly = this.eventJuly + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "August" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventAug = this.eventAug + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "September" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventSep = this.eventSep + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "October" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventOct = this.eventOct + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "November" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventNov = this.eventNov + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "December" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventDec = this.eventDec + 1;
          }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            data: [this.eventJan, this.eventFeb, this.eventMar, this.eventAp, this.eventMay, this.eventJune, this.eventJuly, this.eventAug,
              this.eventSep, this.eventOct, this.eventNov, this.eventDec],
            label: 'Events',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
            borderColor: colors.primary,
          }
          ],
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      });
    });

  }

  
  toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  ngOnInit(): void {


    this.lastFiveYears.push(this.presentYear);
    for (let i = 1; i < 6; i++) {
      this.lastFiveYears.push(this.presentYear - i);
    }
    this.selectedYear = this.presentYear;
    this.eventMarketingService.getAllEvents().subscribe(events => {
      for (let e = 0; e < events.length; e++) {
        if (this.moment(events[e].date).format("MMMM") === "January" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventJan = this.eventJan + 1;
            console.log(this.eventJan);
          } else 
          if (this.moment(events[e].date).format("MMMM") === "February" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventFeb = this.eventFeb + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "March" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventMar = this.eventMar + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "April" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventAp = this.eventAp + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "May" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventMay = this.eventMay + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "June" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventJune = this.eventJune + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "July" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventJuly = this.eventJuly + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "August" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventAug = this.eventAug + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "September" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventSep = this.eventSep + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "October" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventOct = this.eventOct + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "November" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventNov = this.eventNov + 1;
          }
          if (this.moment(events[e].date).format("MMMM") === "December" &&
            this.moment(events[e].date).format("YYYY") === this.presentYear) {
            this.eventDec = this.eventDec + 1;
          }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
          'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            data: [this.eventJan, this.eventFeb, this.eventMar, this.eventAp, 
              this.eventMay, this.eventJune, this.eventJuly, this.eventAug,
              this.eventSep, this.eventOct, this.eventNov, this.eventDec],
            label: 'Events',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
            borderColor: colors.primary,
          }
          ],
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      });
    });




    this.personaService.getPersonas().subscribe(
      result=>{

      result.forEach(ele=>{
    
        if(ele.gender=="female") {
          this.female++
        }
        if( ele.gender=="male") {
          this.male++
        }  
        console.log(this.female)
      })
      this.incomesTypeChart = new Chart('gender', {
        type: 'doughnut',
        data: {
          labels: ['female','male'],

          datasets: [{
            label: 'gender',
            data: [this.female,this.male],
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
    
   
  })


  this.personaService.getPersonas().subscribe(
    result=>{

    result.forEach(ele=>{
  
      if(ele.gender=="female") {
        this.female++
      }
      if( ele.gender=="male") {
        this.male++
      }  
      console.log(this.female)
    })
    this.incomesTypeChart = new Chart('gender', {
      type: 'doughnut',
      data: {
        labels: ['female','male'],

        datasets: [{
          label: 'gender',
          data: [this.female,this.male],
          fill:false,
          backgroundColor: [
            'rgba(240, 128, 128)',
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
  
 
})


this.personaService.getPersonas().subscribe(
  result=>{

  result.forEach(ele=>{

    if(ele.situation=="married") {
      this.married++
    }
    if( ele.situation=="Divorced") {
      this.Divorced++
    }  
    if( ele.situation=="single") {
      this.single++
    }  
    if( ele.situation=="in a relationship") {
      this.inarelationship++
    }  
    console.log(this.female)
  })
  this.incomesTypeChart = new Chart('situation', {
    type: 'doughnut',
    data: {
      labels: ['married','Divorced' ,'single' ,'in a relationship' ],

      datasets: [{
        label: 'situation',
        data: [this.married,this.Divorced , this.single , this.inarelationship],
        fill:false,
        backgroundColor: [
          'rgba(139,0,0)',
          'rgba(139,69,19)',
          'rgba(30,144,255)',
          'rgba(199,21,133)',
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


})








  
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  }