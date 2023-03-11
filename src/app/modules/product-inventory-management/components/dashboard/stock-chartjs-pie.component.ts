import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbColorHelper, NbThemeService} from '@nebular/theme';
import moment from "moment";
import {StockEntryService} from "../../services/stockEntry/stock-entry.service";
import {StockExitService} from "../../services/stockExit/stock-exit.service";

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <nb-card>
        <nb-card-header>Stock
            <nb-select nbSelect placeholder="Year" style="float: right" [(selected)]="selectedItem"
                       (selectedChange)="selectYear($event)">
                <nb-option [value]="year" *ngFor="let year of lastFiveYears">{{year}}</nb-option>
            </nb-select></nb-card-header>
        <nb-card-body>
            <chart type="pie" [data]="data" [options]="options" style="height: 400px"></chart>
        </nb-card-body>
    </nb-card>
  `,
})
export class StockChartjsPieComponent implements OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  numberStockEntries = 0;
  numberStockExits = 0;
  moment: any = moment;
  presentDate: Date = new Date();
  presentYear: number = this.moment(this.presentDate).format("YYYY");
  selectedItem = this.presentYear;
  lastFiveYears: number[] = [];
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));

  selectYear(selectedYear): void {
    this.numberStockEntries = 0;
    this.numberStockExits = 0;
    this.presentYear = selectedYear;
    this.stockEntryService.getAllStockEntries().subscribe(stockEntries => {
      this.stockExitService.getAllStockExits().subscribe(stockExits => {
        for (let se = 0; se < stockEntries.length; se++) {
          if (stockEntries[se].material?.addedBy?.company === this.userConnected.company && 
            this.moment(stockEntries[se].stockEntryDate).format("YYYY") === this.presentYear) {
            this.numberStockEntries = this.numberStockEntries + stockEntries[se].quantityIn; 
          }
        }
        for (let sexit = 0; sexit < stockExits.length; sexit++) {
          if (stockExits[sexit].material?.addedBy?.company === this.userConnected.company && 
            this.moment(stockExits[sexit].stockEntryDate).format("YYYY") === this.presentYear) {
            this.numberStockExits = this.numberStockExits + stockExits[sexit].quantityOut; 
          }
        }
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data = {
            labels: ['Quantities In', 'Quantities Out'],
            datasets: [{
              data: [this.numberStockEntries, this.numberStockExits],
              backgroundColor: [colors.successLight, colors.infoLight],
            }],
          };

          this.options = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
              yAxes: [
                {
                  display: false,
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
    });
  }

  constructor(private theme: NbThemeService, private stockEntryService: StockEntryService,
              private stockExitService: StockExitService) {
    
    this.stockEntryService.getAllStockEntries().subscribe(stockEntries => {
      this.stockExitService.getAllStockExits().subscribe(stockExits => {
        for (let se = 0; se < stockEntries.length; se++) {
          if (stockEntries[se].material?.addedBy?.company === this.userConnected.company && 
            this.moment(stockEntries[se].stockEntryDate).format("YYYY") === this.presentYear) {
            this.numberStockEntries = this.numberStockEntries + stockEntries[se].quantityIn;
          }
        }
        for (let sexit = 0; sexit < stockExits.length; sexit++) {
          if (stockExits[sexit].material?.addedBy?.company === this.userConnected.company && 
            this.moment(stockExits[sexit].stockEntryDate).format("YYYY") === this.presentYear) {
            this.numberStockExits = this.numberStockExits + stockExits[sexit].quantityOut;
          }
        }
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data = {
            labels: ['Quantities In', 'Quantities Out'],
            datasets: [{
              data: [this.numberStockEntries, this.numberStockExits],
              backgroundColor: [colors.successLight, colors.infoLight],
            }],
          };

          this.options = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
              yAxes: [
                {
                  display: false,
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
    });
  }
  
  ngOnInit(): void {
    this.lastFiveYears.push(this.presentYear);
    for (let i = 1; i < 6; i++) {
      this.lastFiveYears.push(this.presentYear - i);
    }
  }
}