import { Component,OnInit} from '@angular/core';
import {TransactionService} from "../../../service/Transaction/transaction.service";
import Chart from "chart.js";
import {GlobalTransactions} from "../../../models/GlobalTransactions";

import {DisabledInputComponent} from "../../Transactions/annual-cashflow/months/Utils/Editors/disabled-input/disabled-input.component";
import {BudgetsService} from "../../../service/BudgetService/budgets.service";

@Component({
  selector: 'ngx-cash-flow-risk',
  templateUrl: './cash-flow-risk.component.html',
  styleUrls: ['./cash-flow-risk.component.scss']
})
export class CashFlowRiskComponent implements OnInit{

  constructor( private bs : BudgetsService,private ts: TransactionService) { 
    
  }
  

  
  chosenYear;
  date: Date = new Date();
  array =[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052]
  incomeArray= new Array<number>(12)
  turnState= ""
  rateState=""
  yieldState=""
  productivityState=""
  data=[]
  gData=[]
  yieldArray = new Array<number>(12)
  rateArray=new Array<number>(11)
  rate;
  turnoverChart
  yieldChart
  productivityChart
  rateChart:any;
  turnCo
  rateCo
  dataIds=[]
  tab =[]
  tabSource=[]
  difference
  employeeNumber;
  productivityArray= new Array<number>(12)
  yearChange(event) {
    localStorage.setItem("chosenYear",event)
    location.reload()
  }
    ngOnInit() {
    if (localStorage.getItem("chosenYear")==undefined) {
      this.chosenYear=this.date.getFullYear()
    }
    else {
      this.chosenYear= Number(localStorage.getItem("chosenYear"))
    }
    
    this.bs.getRiskInfos(this.chosenYear).subscribe(result=>{
      this.tab.push(result)
      this.difference =result.difference
      this.tabSource=this.tab
    })
    this.ts.getGlobal(this.chosenYear,0).subscribe((result:GlobalTransactions[])=>{
      this.gData=result
      this.gData.sort((a,b) => a.id - b.id)
      this.ts.getOperatingTransactions(this.chosenYear).subscribe((result2:GlobalTransactions[])=>{

          this.data=result2
          this.data.sort((a,b) => a.id - b.id)
          this.data.forEach(ele=>{
            if (ele.id in ['1','2','3','4','5','6','7','8','9','10','11','12'])
            {
              this.dataIds.push(Number(ele.id))
              this.incomeArray.splice(Number(ele.id)-1,1,ele.totalincome)}

          })
          const max = Math.max(...this.dataIds)
          let inter =this.dataIds.filter(obj=>obj != max)
          const secondMax = Math.max(...inter)
          let inter2 = inter.filter(obj=>obj!=secondMax)
          const thirdMax= Math.max(...inter2)
          for (let i=0;i<this.incomeArray.length-1;i++) {
            if ( this.incomeArray[i]==0) {
              this.rate=this.incomeArray[i+1]*100
            }
            else {
            this.rate = (this.incomeArray[i+1] - this.incomeArray[i])/this.incomeArray[i] *100}
            this.rateArray.splice(i,1,this.rate);}
          let interm= this.incomeArray.filter(obj=>obj!= undefined)
          let maxTurnover = Math.max(...interm)
        
        //productivity
        this.ts.getEmployeeNumber().subscribe(result3=>{
          this.employeeNumber=result3
          this.incomeArray.forEach(ele=>{
            if (this.employeeNumber==0)
            {
              this.productivityArray.splice(this.incomeArray.indexOf(ele),1,0)}


            else
            {this.productivityArray.splice(this.incomeArray.indexOf(ele),1,ele/this.employeeNumber)}
            

          })
          //fourth chart analysis

          let intermProd= this.productivityArray.filter(obj=>obj!=undefined)
          let maxProductivity = Math.max(...intermProd)
          if (this.data.length==1 || this.data.length==0) {
            this.productivityState="neutral"

          }
          else if (this.productivityArray[max-1] >= maxProductivity)
          {
            this.productivityState="success"
          }
          else if (this.productivityArray[max-1]>this.productivityArray[secondMax-1] && this.productivityArray[max-1]<maxProductivity) {
            this.productivityState="warning"

          }

          else {
            this.productivityState="danger"
          }

          this.productivityChart = new Chart('productivity', {
            type: 'line',
            data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

              datasets: [{
                label: 'Productivity Ratio',
                data: this.productivityArray,
                fill: false,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [

                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: "black"
                }

              },
              responsive:true,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: false,
                    fontColor: "grey"

                  },


                }],
                xAxes: [{
                  ticks: {
                    beginAtZero: true,
                    fontColor: "grey"

                  },


                }]


              }
            }
          })
        })
        
        

          // first curve analysis

          if (this.data.length==1 || this.data.length==0) {
            this.turnState="neutral"
            this.productivityState="neutral"

          }
          else if (this.incomeArray[max-1]> this.incomeArray[secondMax-1] && this.incomeArray[max-1]>= maxTurnover) {
            this.turnState="success"
          }
          else if (this.incomeArray[max-1]< this.incomeArray[secondMax-1] ) {
            this.turnState="danger"
          }
          else {
            this.turnState="warning"
          }

          //second curve analysis
          let intermRate = this.rateArray.filter(obj=>obj!= undefined)
          let maxRate = Math.max(...intermRate)

          let check =0
          this.rateArray.forEach(ele=>{
            if(isNaN(ele)){
              check++

            }

          })
          if (check>=10) {
            this.rateState="neutral"
          }
          else if (this.rateArray[max-2]> 0) {
            this.rateState="success"
          }

          else if (this.rateArray[max-2]< this.rateArray[thirdMax-2] &&this.rateArray[max-2]< 0 && this.rateArray[max-2]< maxRate) {
            this.rateState="danger"
          }

          else {
            this.rateState="warning"
          }






          this.turnoverChart = new Chart('turnover', {
            type: 'line',
            data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

              datasets: [{
                label: 'Turnover',
                data: this.incomeArray,
                fill: false,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [

                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: "black"
                }

              },
              responsive:true,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: false,
                    fontColor: "grey"

                  },


                }],
                xAxes: [{
                  ticks: {
                    beginAtZero: true,
                    fontColor: "grey"

                  },


                }]


              }
            }
          })
          this.rateChart = new Chart('rate', {
            type: 'bar',

            data: {
              labels:['Jan-Feb', 'Feb-Mar', 'Mar-Apr', 'Apr-May', 'May-Jun', 'Jun-Jul', 'Jul-Aug', 'Aug-Sep', 'Sep-Oct', 'Oct-Nov', 'Nov-Dec'],

              datasets: [{
                label: 'Evolution Rate',
                data: this.rateArray,
                fill:true,

                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)'

                ],
                borderColor: [

                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderWidth: 1
              }]
            },
            options: {
              legend :{
                display:false,
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
          })
          for (let i= 0; i<12;i++)   {
            for (let j=0;j<this.data.length;j++) {

              if (Number(this.gData[i].id)==Number(this.data[j].id)) {
                this.yieldArray.splice(Number(this.gData[i].id)-1,1,this.gData[i].totalbalance/this.data[j].totalincome*100)

              }

            }

          }
        this.yieldChart = new Chart('yield', {
          type: 'bar',

          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

            datasets: [{
              label: 'Evolution Rate',
              data: this.yieldArray,
              fill:true,

              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'

              ],
              borderColor: [

                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend :{
              display:false,
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
        })

        //third Chart analysis
        let intermYield = this.yieldArray.filter(obj=>obj!=undefined)
        let maxYield = Math.max(...intermYield)
        
          this.yieldArray.forEach(ele=>{
            if(isNaN(ele)){
              check++

            }

          })
          if (check>=10) {
            this.yieldState="neutral"
          }
        
          else if (this.yieldArray[max-2]> 0  && this.yieldArray[max-2]>= maxYield) {
            this.yieldState="success"
          }
          else if (this.yieldArray[max-2]< 0 && this.yieldArray[max-2]< maxYield) {
            this.yieldState="danger"
          }
          else  {
            this.yieldState="warning"
          }
         

        }


      )
    })
     
   

      







    }


  tabSettings ={
    actions:{
      add:false,
      edit:false,
      delete:false,
    },


    columns :{
      
      actual: {
        title: 'Total Year Balance',
        type: 'number',
        addable: true,


      },
      budget: {
        title: 'Total Needed Budget',
        type: 'number',
       
      },
      difference: {
        title:'Difference',
        type :'html',
        editor:{type:'custom',component:DisabledInputComponent},
        valuePrepareFunction: (difference) => {
          switch (true) {
            case (difference >0 ): {
              return `<h5><span class="badge badge-success">${difference} </span></h5>`;
            }
            case (difference <=0) :{
              return `<h5><span class="badge badge-danger">${difference} </span></h5>`;
            }

          }




        },
      }





    },
    pager :{
      display :true,
      perPage: 15,
    }
  }


  

  

}
