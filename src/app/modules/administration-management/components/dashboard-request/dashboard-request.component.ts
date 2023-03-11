import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {RentatlRequestService} from "../../service/rental-request/rentatl-request.service";

@Component({
  selector: 'ngx-dashboard-request',
  templateUrl: './dashboard-request.component.html',
  styleUrls: ['./dashboard-request.component.scss']
})
export class DashboardRequestComponent implements AfterViewInit, OnDestroy, OnInit {

  options: any = {};
  themeSubscription: any;
  
  countPE ;
  countAP ;
  countDE ;
  countUV ;

  constructor(private theme: NbThemeService, private rs: RentatlRequestService) {
  }
   pe;
   uv;
   de;
   ap;
  getTheme(cptPE,cptUV,cptDE, cptAP )
  {
   
    if(this.pe != undefined)
    {
      this.pe = cptPE;
    }
    if(this.uv != undefined)
    {
      this.uv = cptUV
    }
    if(this.ap != undefined)
    {
      this.ap = cptAP
    }
    if(this.de != undefined)
    {
      this.de = cptDE
    }
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Pending','Under Validation','Denied','Approved'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Values',
            type: 'bar',
            barWidth: '60%',
            data: [cptPE,cptUV,cptDE,cptAP],
          },
        ],
      };
    });
  }

  ngOnInit(): void {

    }

  ngAfterViewInit() {

    this.callCountPE();
    this.callCountAP();
    this.callCountDE();
    this.callCountUV();

  }
  
  callCountPE()
  {
    this.rs.countPendings().subscribe((data:number)=>{
      //this.countPE = data;
      this.getTheme(data,undefined,undefined,undefined)
    },(err)=>{
      console.log(err);
    })
  }

  callCountAP()
  {
    this.rs.countApproved().subscribe((data:number)=>{
      this.getTheme(undefined,undefined,undefined,data)
      console.log(this.countAP);
    },(err)=>{
      console.log(err);
    })
  }

  callCountUV()
  {
    this.rs.countUnderValidation().subscribe((data:number)=>{
      this.getTheme(undefined,data,undefined,undefined)
    },(err)=>{
      console.log(err);
    })
  }

  callCountDE()
  {
    this.rs.countDenied().subscribe((data:number)=>{
      this.getTheme(undefined,undefined,data,undefined)
    },(err)=>{
      console.log(err);
    })
  }
  

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
