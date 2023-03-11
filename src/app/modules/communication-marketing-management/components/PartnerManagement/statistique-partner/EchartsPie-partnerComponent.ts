import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ParternershipService} from './../../../services/parternership.service';

@Component({
  selector: 'ngx-echarts-pie-partner',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPiePartnerComponent implements OnInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  numberFinishedProducts: number = 0;
  numberRawMaterials: number = 0;
  numberServices: number = 0;

  chartColors = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  constructor(private theme: NbThemeService, private parternershipService: ParternershipService) {
    this.parternershipService.getParternerships().subscribe((materials) => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].country === 'Algeria') {
          this.numberFinishedProducts = this.numberFinishedProducts + 1;
        }
      /*  if (materials[m].materialType === 'Raw Material') {
          this.numberRawMaterials = this.numberRawMaterials + 1;
        }
        if (materials[m].materialType === 'Service') {
          this.numberServices = this.numberServices + 1;
        }*/
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

     // const colors = config.variables;
      const echarts: any = config.variables;

      this.options = {
        backgroundColor: echarts.bg,
    //    color: [colors.warningLight, colors.infoLight, colors.successLight],
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

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
