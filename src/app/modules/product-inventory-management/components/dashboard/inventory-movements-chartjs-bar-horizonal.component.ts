import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {InventoryMovementService} from "../../services/inventoryMovement/inventory-movement.service";
import moment from "moment";

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  template: `
    <nb-card>
        <nb-card-header>Inventory Movements
            <nb-select nbSelect placeholder="Year" style="float: right" [(selected)]="selectedItem"
                       (selectedChange)="selectYear($event)">
                <nb-option [value]="year" *ngFor="let year of lastFiveYears">{{year}}</nb-option>
            </nb-select> </nb-card-header>
        <nb-card-body>
            <chart type="horizontalBar" [data]="data" [options]="options" style="height: 400px"></chart>
        </nb-card-body>
    </nb-card>
  `,
})
export class ChartjsBarHorizontalComponent implements OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  moment: any = moment;
  presentDate: Date = new Date();
  presentYear: number = this.moment(this.presentDate).format("YYYY");
  selectedItem = this.presentYear;
  lastFiveYears: number[] = [];
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  entryJan = 0;
  entryFeb = 0;
  entryMar = 0;
  entryAp = 0;
  entryMay = 0;
  entryJune = 0;
  entryJuly = 0;
  entryAug = 0;
  entrySep = 0;
  entryOct = 0;
  entryNov = 0;
  entryDec = 0;

  exitJan = 0;
  exitFeb = 0;
  exitMar = 0;
  exitAp = 0;
  exitMay = 0;
  exitJune = 0;
  exitJuly = 0;
  exitAug = 0;
  exitSep = 0;
  exitOct = 0;
  exitNov = 0;
  exitDec = 0;

  selectYear(selectedYear): void {
    this.entryJan = 0;
    this.entryFeb = 0;
    this.entryMar = 0;
    this.entryAp = 0;
    this.entryMay = 0;
    this.entryJune = 0;
    this.entryJuly = 0;
    this.entryAug = 0;
    this.entrySep = 0;
    this.entryOct = 0;
    this.entryNov = 0;
    this.entryDec = 0;

    this.exitJan = 0;
    this.exitFeb = 0;
    this.exitMar = 0;
    this.exitAp = 0;
    this.exitMay = 0;
    this.exitJune = 0;
    this.exitJuly = 0;
    this.exitAug = 0;
    this.exitSep = 0;
    this.exitOct = 0;
    this.exitNov = 0;
    this.exitDec = 0;
    this.presentYear = selectedYear;
    this.imService.getAllIMs().subscribe(ims => {
      for (let i = 0; i < ims.length; i++) {
        if (ims[i].material?.addedBy?.company === this.userConnected.company) {
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "January" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryJan = this.entryJan + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "February" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryFeb = this.entryFeb + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "March" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryMar = this.entryMar + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "April" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryAp = this.entryAp + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "May" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryMay = this.entryMay + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "June" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryJune = this.entryJune + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "July" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryJuly = this.entryJuly + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "August" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryAug = this.entryAug + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "September" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entrySep = this.entrySep + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "October" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryOct = this.entryOct + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "November" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryNov = this.entryNov + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "December" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryDec = this.entryDec + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }

          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "January" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitJan = this.exitJan + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "February" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitFeb = this.exitFeb + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "March" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitMar = this.exitMar + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "April" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitAp = this.exitAp + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "May" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitMay = this.exitMay + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "June" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitJune = this.exitJune + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "July" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitJuly = this.exitJuly + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "August" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitAug = this.exitAug + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "September" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitSep = this.exitSep + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "October" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitOct = this.exitOct + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "November" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitNov = this.exitNov + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "December" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitDec = this.exitDec + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          } 
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'],
          datasets: [{
            label: 'Entries',
            backgroundColor: colors.successLight,
            borderWidth: 1,
            data: [this.entryJan, this.entryFeb, this.entryMar, this.entryAp, this.entryMay, this.entryJune,
              this.entryJuly, this.entryAug, this.entrySep, this.entryOct, this.entryNov, this.entryDec],
          }, {
            label: 'Exits',
            backgroundColor: colors.dangerLight,
            data: [this.exitJan, this.exitFeb, this.exitMar, this.exitAp, this.exitMay, this.exitJune,
              this.exitJuly, this.exitAug, this.exitSep, this.exitOct, this.exitNov, this.exitDec],
          },
          ],
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            rectangle: {
              borderWidth: 2,
            },
          },
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
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            position: 'right',
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      });
    });
  }

  constructor(private theme: NbThemeService, private imService: InventoryMovementService) {
    this.imService.getAllIMs().subscribe(ims => {
      for (let i = 0; i < ims.length; i++) {
        if (ims[i].material?.addedBy?.company === this.userConnected.company) {
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "January" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryJan = this.entryJan + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "February" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryFeb = this.entryFeb + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "March" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryMar = this.entryMar + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "April" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryAp = this.entryAp + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "May" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryMay = this.entryMay + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "June" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryJune = this.entryJune + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "July" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryJuly = this.entryJuly + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "August" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryAug = this.entryAug + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "September" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entrySep = this.entrySep + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "October" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryOct = this.entryOct + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "November" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryNov = this.entryNov + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }
          if (ims[i].material?.quantityStock < ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "December" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.entryDec = this.entryDec + (ims[i].material?.quantityReel - ims[i].material?.quantityStock);
          }

          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "January" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitJan = this.exitJan + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "February" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitFeb = this.exitFeb + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "March" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitMar = this.exitMar + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "April" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitAp = this.exitAp + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "May" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitMay = this.exitMay + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "June" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitJune = this.exitJune + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "July" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitJuly = this.exitJuly + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "August" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitAug = this.exitAug + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "September" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitSep = this.exitSep + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "October" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitOct = this.exitOct + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "November" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitNov = this.exitNov + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          }
          if (ims[i].material?.quantityStock > ims[i].material?.quantityReel &&
            this.moment(ims[i].imCreationDate).format("MMMM") === "December" &&
            this.moment(ims[i].imCreationDate).format("YYYY") === this.presentYear) {
            this.exitDec = this.exitDec + (ims[i].material?.quantityStock - ims[i].material?.quantityReel);
          } 
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'],
          datasets: [{
            label: 'Entries',
            backgroundColor: colors.successLight,
            borderWidth: 1,
            data: [this.entryJan, this.entryFeb, this.entryMar, this.entryAp, this.entryMay, this.entryJune,
              this.entryJuly, this.entryAug, this.entrySep, this.entryOct, this.entryNov, this.entryDec],
          }, {
          label: 'Exits',
          backgroundColor: colors.dangerLight,
          data: [this.exitJan, this.exitFeb, this.exitMar, this.exitAp, this.exitMay, this.exitJune,
            this.exitJuly, this.exitAug, this.exitSep, this.exitOct, this.exitNov, this.exitDec],
        },
          ],
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            rectangle: {
              borderWidth: 2,
            },
          },
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
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            position: 'right',
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
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