import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Litige } from '../../../models/Litige';

@Component({
  selector: 'ngx-rapport-chart',
  templateUrl: './rapport-chart.component.html',
  styleUrls: ['./rapport-chart.component.scss'],
  template: `
  <div echarts [options]="options" class="echart"></div>
`,

})
export class RapportChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  litigeList: Litige[]= [];

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;
      
      this.options = {  title: {
        text: 'DISPUTE REPORT',
        align: "center",

        textStyle: {
          color: echarts.textColor,

        },
      },
      
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight,colors.danger],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          data: ['Quality dispute', 'Price dispute', 'Litige administratif', 'Event date dispute', 'Missing equipment dispute','Double billing dispute'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Disputes',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Quality dispute'},
              { value: 310, name: 'Price dispute' },
              { value: 234, name: 'Litige administratif' },
              { value: 135, name: 'Event date dispute' },
              { value: 1548, name: 'Missing equipment dispute' },
              { value: 100, name: 'Double billing dispute' },

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
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
