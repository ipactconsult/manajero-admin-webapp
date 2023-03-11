import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Litige } from '../../models/Litige';
import { LitigeService } from '../../services/litige/litige.service';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements OnInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  litiges: Litige[] = [];
  numResolu = 0;
  numNR = 0;
  numEnCours = 0;

  constructor(private theme: NbThemeService, private litigeService: LitigeService) {
  }

  ngOnInit() {
    this.litigeService.getAllLitige().subscribe(litiges => {
      this.litiges = litiges;
      for (let i = 0; i < this.litiges.length; i++) {
        if (this.litiges[i].statut.toString() === 'Résolu') {
          this.numResolu = this.numResolu + 1;
        }
        if (this.litiges[i].statut.toString() === 'NonRésolu') {
          this.numNR = this.numNR + 1;
        }
        if (this.litiges[i].statut.toString() === 'Encours') {
          this.numEnCours = this.numEnCours + 1;
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Not Resolved','In Progress','Resolved'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Litiges',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
              { value: this.numNR, name: 'Not Resolved' },
              { value: this.numEnCours, name: 'In Progress' },
              { value: this.numResolu, name: 'Resolved' },

              

            
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
