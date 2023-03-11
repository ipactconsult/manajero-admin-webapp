import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import moment from "moment";
import {PurchaseOrderService} from "../../services/purchaseOrder/purchase-order.service";
import {PurchaseReturnService} from "../../services/purchaseReturn/purchase-return.service";

@Component({
  selector: 'ngx-chartjs-line',
  template: `
      <div class="row">
          <div class="col-lg-6">
              <nb-card>
                  <nb-card-header>Purchases
                      <nb-select nbSelect placeholder="Year" style="float: right" [(selected)]="selectedItem"
                                 (selectedChange)="selectYear($event)">
                          <nb-option [value]="year" *ngFor="let year of lastFiveYears">{{year}}</nb-option>
                      </nb-select> </nb-card-header>
                  <nb-card-body>
                      <chart type="line" [data]="data" [options]="options" style="height: 400px"></chart>
                  </nb-card-body>
              </nb-card>
          </div>
          <div class="col-lg-6">
                      <ngx-chartjs-bar-horizontal></ngx-chartjs-bar-horizontal>
          </div>
      </div>
    
  `,
})
export class PurchasesChartjsLineComponent implements OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  moment: any = moment;
  presentDate: Date = new Date();
  presentYear: number = this.moment(this.presentDate).format("YYYY");
  selectedItem = this.presentYear;
  lastFiveYears: number[] = [];
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  selectedYear;
  poJan = 0;
  poFeb = 0;
  poMar = 0;
  poAp = 0;
  poMay = 0;
  poJune = 0;
  poJuly = 0;
  poAug = 0;
  poSep = 0;
  poOct = 0;
  poNov = 0;
  poDec = 0;

  prJan = 0;
  prFeb = 0;
  prMar = 0;
  prAp = 0;
  prMay = 0;
  prJune = 0;
  prJuly = 0;
  prAug = 0;
  prSep = 0;
  prOct = 0;
  prNov = 0;
  prDec = 0;

  constructor(private theme: NbThemeService, private poService: PurchaseOrderService,
              private prService: PurchaseReturnService) {
    
    
  }

  selectYear(selectedYear): void {
    this.poJan = 0;
    this.poFeb = 0;
    this.poMar = 0;
    this.poAp = 0;
    this.poMay = 0;
    this.poJune = 0;
    this.poJuly = 0;
    this.poAug = 0;
    this.poSep = 0;
    this.poOct = 0;
    this.poNov = 0;
    this.poDec = 0;

    this.prJan = 0;
    this.prFeb = 0;
    this.prMar = 0;
    this.prAp = 0;
    this.prMay = 0;
    this.prJune = 0;
    this.prJuly = 0;
    this.prAug = 0;
    this.prSep = 0;
    this.prOct = 0;
    this.prNov = 0;
    this.prDec = 0;
    this.presentYear = selectedYear;
    this.poService.getAllPOs().subscribe(pos => {
      this.prService.getAllPurchaseReturns().subscribe(prs => {
        for (let pr = 0; pr < prs.length; pr++) {
          if (prs[pr].material?.addedBy?.company === this.userConnected.company) {
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "January" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prJan = this.poJan + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "February" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prFeb = this.poFeb + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "March" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prMar = this.poMar + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "April" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prAp = this.poAp + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "May" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prMay = this.poMay + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "June" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prJune = this.poJune + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "July" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prJuly = this.poJuly + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "August" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prAug = this.poAug + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "September" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prSep = this.poSep + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "October" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prOct = this.poOct + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "November" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prNov = this.poNov + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "December" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prDec = this.poDec + prs[pr].material?.materialQuantity;
            } 
          }
        }

        for (let po = 0; po < pos.length; po++) {
          for (let m = 0; m < pos[po].materials?.length; m++) {
            if (pos[po].addedBy?.company === this.userConnected.company) {
              if (this.moment(pos[po].receptionDate).format("MMMM") === "January" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poJan = this.poJan + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "February" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poFeb = this.poFeb + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "March" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poMar = this.poMar + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "April" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poAp = this.poAp + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "May" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poMay = this.poMay + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "June" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poJune = this.poJune + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "July" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poJuly = this.poJuly + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "August" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poAug = this.poAug + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "September" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poSep = this.poSep + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "October" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poOct = this.poOct + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "November" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poNov = this.poNov + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "December" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poDec = this.poDec + pos[po].materials[m]?.materialQuantity;
              }
            }
          }
        }
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              data: [this.poJan, this.poFeb, this.poMar, this.poAp, this.poMay, this.poJune, this.poJuly, this.poAug,
                this.poSep, this.poOct, this.poNov, this.poDec],
              label: 'Orders',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
              borderColor: colors.primary,
            }, {
              data: [this.prJan, this.prFeb, this.prMar, this.prAp, this.prMay, this.prJune, this.prJuly, this.prAug,
                this.prSep, this.prOct, this.prNov, this.prDec],
              label: 'Returns',
              backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
              borderColor: colors.danger,
            },
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
    });
  }
  
  ngOnInit(): void {
    this.lastFiveYears.push(this.presentYear);
    for (let i = 1; i < 6; i++) {
      this.lastFiveYears.push(this.presentYear - i);
    }
    this.selectedYear = this.presentYear;
    this.poService.getAllPOs().subscribe(pos => {
      this.prService.getAllPurchaseReturns().subscribe(prs => {
        for (let pr = 0; pr < prs.length; pr++) {
          if (prs[pr].material?.addedBy?.company === this.userConnected.company) {
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "January" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prJan = this.poJan + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "February" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prFeb = this.poFeb + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "March" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prMar = this.poMar + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "April" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prAp = this.poAp + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "May" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prMay = this.poMay + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "June" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prJune = this.poJune + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "July" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prJuly = this.poJuly + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "August" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prAug = this.poAug + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "September" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prSep = this.poSep + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "October" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prOct = this.poOct + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "November" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prNov = this.poNov + prs[pr].material?.materialQuantity;
            }
            if (this.moment(prs[pr].purchaseReturnDate).format("MMMM") === "December" &&
              this.moment(prs[pr].purchaseReturnDate).format("YYYY") === this.presentYear) {
              this.prDec = this.poDec + prs[pr].material?.materialQuantity;
            }
          }
        }

        for (let po = 0; po < pos.length; po++) {
          for (let m = 0; m < pos[po].materials?.length; m++) {
            if (pos[po].addedBy?.company === this.userConnected.company) {
              if (this.moment(pos[po].receptionDate).format("MMMM") === "January" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poJan = this.poJan + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "February" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poFeb = this.poFeb + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "March" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poMar = this.poMar + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "April" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poAp = this.poAp + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "May" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poMay = this.poMay + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "June" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poJune = this.poJune + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "July" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poJuly = this.poJuly + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "August" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poAug = this.poAug + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "September" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poSep = this.poSep + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "October" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poOct = this.poOct + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "November" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poNov = this.poNov + pos[po].materials[m]?.materialQuantity;
              }
              if (this.moment(pos[po].receptionDate).format("MMMM") === "December" &&
                this.moment(pos[po].receptionDate).format("YYYY") === this.presentYear) {
                this.poDec = this.poDec + pos[po].materials[m]?.materialQuantity;
              }
            }
          }
        }
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              data: [this.poJan, this.poFeb, this.poMar, this.poAp, this.poMay, this.poJune, this.poJuly, this.poAug,
                this.poSep, this.poOct, this.poNov, this.poDec],
              label: 'Orders',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
              borderColor: colors.primary,
            }, {
              data: [this.prJan, this.prFeb, this.prMar, this.prAp, this.prMay, this.prJune, this.prJuly, this.prAug,
                this.prSep, this.prOct, this.prNov, this.prDec],
              label: 'Returns',
              backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
              borderColor: colors.danger,
            },
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
    });
  }
}