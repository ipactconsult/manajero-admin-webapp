import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Litige } from '../../models/Litige';
import { LitigeService } from '../../services/litige/litige.service';

@Component({
  selector: 'ngx-echartstype-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class PieEchartType implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  
  litiges: Litige[] = [];
  Quality = 0;
  Admin = 0;
  Equip = 0;
  Build = 0;
  Event = 0;
  Price = 0;



  constructor(private theme: NbThemeService,private litigeService: LitigeService) {
  }

  ngAfterViewInit() {
    this.litigeService.getAllLitige().subscribe(litiges => {
      this.litiges = litiges;
      for (let i = 0; i < this.litiges.length; i++) {
        if (this.litiges[i].typelitige === 'Price dispute') {
          this.Price = this.Price + 1;
        }
        if (this.litiges[i].typelitige === 'Litige administratif') {
          this.Admin = this.Admin + 1;
        }
        if (this.litiges[i].typelitige === 'Event date dispute') {
          this.Event = this.Event + 1;
        }
        if (this.litiges[i].typelitige === 'Quality dispute') {
          this.Quality = this.Quality + 1;
        }
        if (this.litiges[i].typelitige=== 'Missing equipement dispute') {
          this.Equip = this.Equip + 1;
        }
        if (this.litiges[i].typelitige === 'Double billing dispute') {
          this.Build = this.Build + 1;
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight,colors.dangerLight,],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          left: 'right',
          data: ['Price dispute','Administrative dispute','Quality dispute','Double billing dispute','Event date dispute','Missing equipement dispute'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Litiges',
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: [
              { value: this.Admin, name: 'Administrative dispute' },
              { value: this.Quality, name: 'Quality dispute' },
              { value: this.Build, name: 'Double billing dispute' },
              { value: this.Price, name: 'Price dispute'},
              { value: this.Event, name: 'Event date dispute' },
              { value: this.Equip, name: 'Missing equipement dispute' },

              

            
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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
