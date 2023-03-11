import {Component, OnDestroy, OnInit} from '@angular/core';
import moment from "moment";
import { NbThemeService } from '@nebular/theme';
import {MaterialService} from "../../services/material/material.service";

@Component({
  selector: 'ngx-materials-echarts-pie',
  template: `
    <nb-card>
        <nb-card-header>Materials
            <nb-select nbSelect placeholder="Year" style="float: right" [(selected)]="selectedItem"
                       (selectedChange)="selectYear($event)">
                <nb-option [value]="year" *ngFor="let year of lastFiveYears">{{year}}</nb-option>
            </nb-select></nb-card-header>
        <nb-card-body>
            <div echarts [options]="options" class="echart"></div>
        </nb-card-body>
    </nb-card>
  `,
})
export class MaterialsEchartsPieComponent implements OnInit {
  options: any = {};
  themeSubscription: any;
  numberFinishedProducts: number = 0;
  numberRawMaterials: number = 0;
  numberServices: number = 0;
  moment: any = moment;
  presentDate: Date = new Date();
  presentYear: number = this.moment(this.presentDate).format("YYYY");
  selectedItem = this.presentYear;
  lastFiveYears: number[] = [];
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));

  selectYear(selectedYear): void {
    this.numberFinishedProducts = 0;
    this.numberRawMaterials = 0;
    this.numberServices = 0;
    this.presentYear = selectedYear;
    this.materialService.getAllMaterials().subscribe((materials) => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].materialType === 'Finished Product' 
          && materials[m].addedBy?.company === this.userConnected.company
          && this.moment(materials[m].materialCreationDate).format("YYYY") === this.presentYear) {
          this.numberFinishedProducts = this.numberFinishedProducts + 1;
        }
        if (materials[m].materialType === 'Raw Material' &&
          this.moment(materials[m].materialCreationDate).format("YYYY") === this.presentYear
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.numberRawMaterials = this.numberRawMaterials + 1;
        }
        if (materials[m].materialType === 'Service' &&
          this.moment(materials[m].materialCreationDate).format("YYYY") === this.presentYear
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.numberServices = this.numberServices + 1;
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.warningLight, colors.infoLight, colors.successLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Finished Products', 'Raw Materials', 'Services'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Materials',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: this.numberFinishedProducts, name: 'Finished Products' },
                { value: this.numberRawMaterials, name: 'Raw Materials' },
                { value: this.numberServices, name: 'Services' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    })
  }

  constructor(private theme: NbThemeService, private materialService: MaterialService) {
    this.materialService.getAllMaterials().subscribe((materials) => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].materialType === 'Finished Product' &&
          this.moment(materials[m].materialCreationDate).format("YYYY") === this.presentYear
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.numberFinishedProducts = this.numberFinishedProducts + 1;
        }
        if (materials[m].materialType === 'Raw Material' &&
          this.moment(materials[m].materialCreationDate).format("YYYY") === this.presentYear
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.numberRawMaterials = this.numberRawMaterials + 1;
        }
        if (materials[m].materialType === 'Service' &&
          this.moment(materials[m].materialCreationDate).format("YYYY") === this.presentYear
          && materials[m].addedBy?.company === this.userConnected.company) {
          this.numberServices = this.numberServices + 1;
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.successLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Finished Products', 'Raw Materials', 'Services'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Materials',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.numberFinishedProducts, name: 'Finished Products' },
              { value: this.numberRawMaterials, name: 'Raw Materials' },
              { value: this.numberServices, name: 'Services' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
    })
  }

  ngOnInit(): void {
    this.lastFiveYears.push(this.presentYear);
    for (let i = 1; i < 6; i++) {
      this.lastFiveYears.push(this.presentYear - i);
    }
  }
}
