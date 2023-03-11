import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import * as moment from 'moment';
import {Journallines} from "../../models/journallines.model";
import {JournallinesService} from "../../services/journalLines/journallines.service";
import {InvoiceService} from "../../services/invoice/invoice.service";

@Component({
  selector: 'ngx-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

  data: any;
  data2: any;
  data3: any;
  data4: any;
  options: any;
  themeSubscription: any;
  themeSubscription2: any;
  themeSubscription3: any;
  themeSubscription4: any;
  moment: any = moment;
  presentDate: Date = new Date();
  presentYear: number = this.moment(this.presentDate).format("YYYY");
  selectedItem = this.presentYear;
  lastFiveYears: number[] = [];
  selectedYear;
  
  adJan = 0;
  adFeb = 0;
  adMar = 0;
  adAp = 0;
  adMay = 0;
  adJune = 0;
  adJuly = 0;
  adAug = 0;
  adSep = 0;
  adOct = 0;
  adNov = 0;
  adDec = 0;

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


  prJan = 0;
  prFeb = 0;
  prMar = 0;
  prAp = 0;
  prMay = 0;
  prJune = 0;
  prJuly = 0;
  prAug = 0;
  jlep = 0;
  prOct = 0;
  prNov = 0;
  prDec = 0;

  etJan = 0;
  etFeb = 0;
  etMar = 0;
  etAp = 0;
  etMay = 0;
  etJune = 0;
  etJuly = 0;
  etAug = 0;
  etep = 0;
  etOct = 0;
  etNov = 0;
  etDec = 0;

  inJan = 0;
  inFeb = 0;
  inMar = 0;
  inAp = 0;
  inMay = 0;
  inJune = 0;
  inJuly = 0;
  inAug = 0;
  inep = 0;
  inOct = 0;
  inNov = 0;
  inDec = 0;


  caJan = 0;
  caFeb = 0;
  caMar = 0;
  caAp = 0;
  caMay = 0;
  caJune = 0;
  caJuly = 0;
  caAu = 0;
  caSep = 0;
  caOct = 0;
  caNov = 0;
  caDec = 0;

  acJan = 0;
  acFeb = 0;
  acMar = 0;
  acAp = 0;
  acMay = 0;
  acJune = 0;
  acJuly = 0;
  acAug = 0;
  acSep = 0;
  acOct = 0;
  acNov = 0;
  acDec = 0;

  vtJan = 0;
  vtFeb = 0;
  vtMar = 0;
  vtAp = 0;
  vtMay = 0;
  vtJune = 0;
  vtJuly = 0;
  vtAug = 0;
  vtSep = 0;
  vtOct = 0;
  vtNov = 0;
  vtDec = 0;

  csJan = 0;
  csFeb = 0;
  csMar = 0;
  csAp = 0;
  csMay = 0;
  csJune = 0;
  csJuly = 0;
  csAug = 0;
  csSep = 0;
  csOct = 0;
  csNov = 0;
  csDec = 0;

  pluJan = 0;
  pluFeb = 0;
  pluMar = 0;
  pluAp = 0;
  pluMay = 0;
  pluJune = 0;
  pluJuly = 0;
  pluAug = 0;
  pluSep = 0;
  pluOct = 0;
  pluNov = 0;
  pluDec = 0;

  minJan = 0;
  minFeb = 0;
  minMar = 0;
  minAp = 0;
  minMay = 0;
  minJune = 0;
  minJuly = 0;
  minAug = 0;
  minSep = 0;
  minOct = 0;
  minNov = 0;
  minDec = 0;




  constructor(private theme: NbThemeService, private jls: JournallinesService, private is: InvoiceService) { }

  ngOnInit(): void {
    
    this.lastFiveYears.push(this.presentYear);
    for (let i = 1; i < 6; i++) {
      this.lastFiveYears.push(this.presentYear - i);
    }
    this.selectedYear = this.presentYear;
    this.generateChartLine(this.selectedYear);
    this.generateChartLineJournal(this.selectedYear);
    this.generateChartInvoice(this.selectedYear);
    this.generateChartInvoiceEntries(this.selectedYear);

  }
  
  generateChartLine(selectedYear): void {
    this.prJan = 0;
    this.prFeb = 0;
    this.prMar = 0;
    this.prAp = 0;
    this.prMay = 0;
    this.prJune = 0;
    this.prJuly = 0;
    this.prAug = 0;
    this.jlep = 0;
    this.prOct = 0;
    this.prNov = 0;
    this.prDec = 0;

    this.adJan = 0;
    this.adFeb = 0;
    this.adMar = 0;
    this.adAp = 0;
    this.adMay = 0;
    this.adJune = 0;
    this.adJuly = 0;
    this.adAug = 0;
    this.adSep = 0;
    this.adOct = 0;
    this.adNov = 0;
    this.adDec = 0;

    this.etJan = 0;
    this.etFeb = 0;
    this.etMar = 0;
    this.etAp = 0;
    this.etMay = 0;
    this.etJune = 0;
    this.etJuly = 0;
    this.etAug = 0;
    this.etep = 0;
    this.etOct = 0;
    this.etNov = 0;
    this.etDec = 0;

    this.inJan = 0;
    this.inFeb = 0;
    this.inMar = 0;
    this.inAp = 0;
    this.inMay = 0;
    this.inJune = 0;
    this.inJuly = 0;
    this.inAug = 0;
    this.inep = 0;
    this.inOct = 0;
    this.inNov = 0;
    this.inDec = 0;
    
    
    this.presentYear = selectedYear;
    
    this.jls.getAll().subscribe(jl =>{
      for (let pr = 0; pr < jl.length; pr++){
        if (this.moment(jl[pr].createdAt).format("MMMM") === "January" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear ) {
          this.prJan = this.prJan + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etJan = this.etJan + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adJan = this.adJan + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inJan = this.inJan + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "February" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prFeb = this.prFeb + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etFeb = this.etFeb + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adFeb = this.adFeb + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inFeb = this.inFeb + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "March" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prMar = this.prMar + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etMar = this.etMar + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adMar = this.adMar + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inMar = this.inMar + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "April" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prAp = this.prAp + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etAp = this.etAp + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adAp = this.adAp + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inAp = this.inAp + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "May" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prMay = this.prMay + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etMay = this.etMay + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adMay = this.adMay + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inMay = this.inMay + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "June" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prJune = this.prJune + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etJune = this.etJune + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adJune = this.adJune + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inJune = this.inJune + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "July" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prJuly = this.prJuly + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etJuly = this.etJuly + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adJuly = this.adJuly + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inJuly = this.inJuly + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "August" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prAug = this.prAug + jl[pr].balance;
          if(jl[pr].account.name === "Entertainment"){
            this.etAug = this.etAug + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Advertising"){
            this.adAug = this.adAug + jl[pr].balance;
          }
          else if(jl[pr].account.name === "Inventory"){
            this.inAug = this.inAug + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "September" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.jlep = this.jlep + jl[pr].balance;
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "October" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prOct = this.prOct + jl[pr].balance;
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "November" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prNov = this.prNov + jl[pr].balance;
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "December" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.prDec = this.prDec + jl[pr].balance;
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            data: [this.prJan, this.prFeb, this.prMar, this.prAp, this.prMay, this.prJune, this.prJuly, this.prAug,
              this.jlep, this.prOct, this.prNov, this.prDec],
            label: 'Global',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
            borderColor: colors.primary,
          },
            {
            label: 'Entertainment',
              backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
              borderColor: colors.danger,
            data: [this.etJan, this.etFeb, this.etMar, this.etAp, this.etMay, this.etJune,
              this.etJuly, this.etAug, this.etep, this.etOct, this.etNov, this.etDec],
          },
            {
              label: 'Advertising',
              backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
              borderColor: colors.info,
              data: [this.adJan, this.adFeb, this.adMar, this.adAp, this.adMay, this.adJune,
                this.adJuly, this.adAug, this.adSep, this.adOct, this.adNov, this.adDec],
            },
            {
              label: 'Inventory',
              borderColor: colors.primary,
              data: [this.inJan, this.inFeb, this.inMar, this.inAp, this.inMay, this.inJune,
                this.inJuly, this.inAug, this.inep, this.inOct, this.inNov, this.inDec],
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
})

  }

  generateChartLineJournal(selectedYear): void {
    this.caJan = 0;
    this.caFeb = 0;
    this.caMar = 0;
    this.caAp = 0;
    this.caMay = 0;
    this.caJune = 0;
    this.caJuly = 0;
    this.caAu = 0;
    this.caSep = 0;
    this.caOct = 0;
    this.caNov = 0;
    this.caDec = 0;

    this.acJan = 0;
    this.acFeb = 0;
    this.acMar = 0;
    this.acAp = 0;
    this.acMay = 0;
    this.acJune = 0;
    this.acJuly = 0;
    this.acAug = 0;
    this.acSep = 0;
    this.acOct = 0;
    this.acNov = 0;
    this.acDec = 0;

    this.vtJan = 0;
    this.vtFeb = 0;
    this.vtMar = 0;
    this.vtAp = 0;
    this.vtMay = 0;
    this.vtJune = 0;
    this.vtJuly = 0;
    this.vtAug = 0;
    this.vtSep = 0;
    this.vtOct = 0;
    this.vtNov = 0;
    this.vtDec = 0;

    this.csJan = 0;
    this.csFeb = 0;
    this.csMar = 0;
    this.csAp = 0;
    this.csMay = 0;
    this.csJune = 0;
    this.csJuly = 0;
    this.csAug = 0;
    this.csSep = 0;
    this.csOct = 0;
    this.csNov = 0;
    this.csDec = 0;


    this.presentYear = selectedYear;

    this.jls.getAll().subscribe(jl =>{
      for (let pr = 0; pr < jl.length; pr++){
        if (this.moment(jl[pr].createdAt).format("MMMM") === "January" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear ) {
          if(jl[pr].journal.name === "Caisse"){
            this.caJan = this.caJan + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtJan = this.vtJan + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acJan = this.acJan + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csJan = this.csJan + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "February" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caFeb = this.caFeb + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtFeb = this.vtFeb + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acFeb = this.acFeb + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csFeb = this.csFeb + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "March" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caMar = this.caMar + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtMar = this.vtMar + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acMar = this.acMar + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csMar = this.csMar + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "April" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caAp = this.caAp + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtAp = this.vtAp + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acAp = this.acAp + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csAp = this.csAp + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "May" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caMay = this.caMay + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtMay = this.vtMay + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acMay = this.acMay + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csMay = this.csMay + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "June" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caJune = this.caJune + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtJune = this.vtJune + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acJune = this.acJune + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csJune = this.csJune + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "July" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caJuly = this.caJuly + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtJuly = this.vtJuly + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acJuly = this.acJuly + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csJuly = this.csJuly + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "August" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          if(jl[pr].journal.name === "Caisse"){
            this.caAu = this.caAu + jl[pr].balance;}
          if(jl[pr].journal.name === "Divers operations"){
            this.vtAug = this.vtAug + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "ACHAT"){
            this.acAug = this.acAug + jl[pr].balance;
          }
          else if(jl[pr].journal.name === "VENTE"){
            this.csAug = this.csAug + jl[pr].balance;
          }
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "September" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.caSep = this.caSep + jl[pr].balance;
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "October" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.caOct = this.caOct + jl[pr].balance;
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "November" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.caNov = this.caNov + jl[pr].balance;
        }
        if (this.moment(jl[pr].createdAt).format("MMMM") === "December" &&
          this.moment(jl[pr].createdAt).format("YYYY") === this.presentYear) {
          this.caDec = this.caDec + jl[pr].balance;
        }
      }
      this.themeSubscription2 = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data2 = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            data: [this.caJan, this.caFeb, this.caMar, this.caAp, this.caMay, this.caJune, this.caJuly, this.caAu,
              this.caSep, this.caOct, this.caNov, this.caDec],
            label: 'Caisse',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
            borderColor: colors.primary,
          },
            {
              label: 'Divers operations',
              backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
              borderColor: colors.danger,
              data: [this.vtJan, this.vtFeb, this.vtMar, this.vtAp, this.vtMay, this.vtJune,
                this.vtJuly, this.vtAug, this.vtSep, this.vtOct, this.vtNov, this.vtDec],
            },
            {
              label: 'ACHAT',
              backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
              borderColor: colors.info,
              data: [this.acJan, this.acFeb, this.acMar, this.acAp, this.acMay, this.acJune,
                this.acJuly, this.acAug, this.acSep, this.acOct, this.acNov, this.acDec],
            },
            {
              label: 'VENTE',
              borderColor: colors.primary,
              data: [this.csJan, this.csFeb, this.csMar, this.csAp, this.csMay, this.csJune,
                this.csJuly, this.csAug, this.csSep, this.csOct, this.csNov, this.csDec],
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
    })

  }

  generateChartInvoice(selectedYear): void {
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
    this.is.getAll().subscribe(ims => {
      for (let i = 0; i < ims.length; i++) {
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "January" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryJan = this.entryJan + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "February" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryFeb = this.entryFeb + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "March" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryMar = this.entryMar + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "April" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryAp = this.entryAp + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "May" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryMay = this.entryMay + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "June" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryJune = this.entryJune + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "July" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryJuly = this.entryJuly + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "August" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryAug = this.entryAug + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "September" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entrySep = this.entrySep + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "October" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryOct = this.entryOct + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "November" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryNov = this.entryNov + 1;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "December" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.entryDec = this.entryDec + 1;
        }

        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "January" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitJan = this.exitJan + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "February" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitFeb = this.exitFeb + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "March" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitMar = this.exitMar + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "April" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitAp = this.exitAp + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "May" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitMay = this.exitMay + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "June" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitJune = this.exitJune + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "July" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitJuly = this.exitJuly + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "August" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitAug = this.exitAug + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "September" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitSep = this.exitSep + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "October" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitOct = this.exitOct + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "November" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitNov = this.exitNov + 1;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "December" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.exitDec = this.exitDec + 1;
        }
      }
      this.themeSubscription3 = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data3 = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'],
          datasets: [{
            label: 'Paid',
            backgroundColor: colors.successLight,
            borderWidth: 1,
            data: [this.entryJan, this.entryFeb, this.entryMar, this.entryAp, this.entryMay, this.entryJune,
              this.entryJuly, this.entryAug, this.entrySep, this.entryOct, this.entryNov, this.entryDec],
          }, {
            label: 'Not paid',
            backgroundColor: colors.dangerLight,
            borderWidth: 1,
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


  generateChartInvoiceEntries(selectedYear): void {
    this.pluJan = 0;
    this.pluFeb = 0;
    this.pluMar = 0;
    this.pluAp = 0;
    this.pluMay = 0;
    this.pluJune = 0;
    this.pluJuly = 0;
    this.pluAug = 0;
    this.pluSep = 0;
    this.pluOct = 0;
    this.pluNov = 0;
    this.pluDec = 0;

    this.minJan = 0;
    this.minFeb = 0;
    this.minMar = 0;
    this.minAp = 0;
    this.minMay = 0;
    this.minJune = 0;
    this.minJuly = 0;
    this.minAug = 0;
    this.minSep = 0;
    this.minOct = 0;
    this.minNov = 0;
    this.minDec = 0;
    this.presentYear = selectedYear;
    this.is.getAll().subscribe(ims => {
      for (let i = 0; i < ims.length; i++) {
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "January" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluJan = this.pluJan + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "February" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluFeb = this.pluFeb + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "March" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluMar = this.pluMar + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "April" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluAp = this.pluAp + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "May" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluMay = this.pluMay + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "June" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluJune = this.pluJune + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "July" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluJuly = this.pluJuly + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "August" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluAug = this.pluAug + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "September" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluSep = this.pluSep + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "October" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluOct = this.pluOct + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "November" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluNov = this.pluNov + ims[i].total;
        }
        if (ims[i].paidStatus &&
          this.moment(ims[i].createdAt).format("MMMM") === "December" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.pluDec = this.pluDec + ims[i].total;
        }

        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "January" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minJan = this.minJan + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "February" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minFeb = this.minFeb + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "March" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minMar = this.minMar + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "April" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minAp = this.minAp + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "May" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minMay = this.minMay + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "June" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minJune = this.minJune + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "July" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minJuly = this.minJuly + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "August" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minAug = this.minAug + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "September" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minSep = this.minSep + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "October" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minOct = this.minOct + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "November" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minNov = this.minNov + ims[i].total;
        }
        if (ims[i].paidStatus === false &&
          this.moment(ims[i].createdAt).format("MMMM") === "December" &&
          this.moment(ims[i].createdAt).format("YYYY") === this.presentYear) {
          this.minDec = this.minDec + ims[i].total;
        }
      }
      this.themeSubscription4 = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data4 = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'],
          datasets: [{
            label: 'Paid',
            backgroundColor: colors.successLight,
            borderWidth: 1,
            data: [this.pluJan, this.pluFeb, this.pluMar, this.pluAp, this.pluMay, this.pluJune,
              this.pluJuly, this.pluAug, this.pluSep, this.pluOct, this.pluNov, this.pluDec],
          }, {
            label: 'Not paid',
            backgroundColor: colors.dangerLight,
            borderWidth: 1,
            data: [this.minJan, this.minFeb, this.minMar, this.minAp, this.minMay, this.minJune,
              this.minJuly, this.minAug, this.minSep, this.minOct, this.minNov, this.minDec],
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




}
