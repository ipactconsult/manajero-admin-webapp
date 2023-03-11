import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../models/Contract';
import { ContractService } from '../../../services/contractServices/contract.service';
import { ExportService } from '../../../../../shared/exports/export.service';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-contracts-table',
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.scss']
})
export class ContractsTableComponent implements OnInit {

  contracts : Contract[]=[];
  search : string = "";
  pageSize:number = 11;

  myDate = new Date().toDateString();
  public config_ = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Contracts Data',
    templateString: `<header>Contracts Data \n : Date ${this.myDate} </header>{{printBody}}`,
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: black; }', '.table td { color: black; }' , '.table .printbtn {height:25px;width:25px;}']
  }

  config : NbToastrConfig;
  title = 'Restore Contract';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;


  constructor(private cs : ContractService
            , private exportService: ExportService
            , private toastrService : NbToastrService
            , private router: Router) { }

  ngOnInit(): void {
    this.getContracts();
  }

  getContracts()
  {
    this.cs.findAll().subscribe(
      (data : Contract[])=> {
        this.contracts = data.filter((c)=>c.isArchived === "No");
      },
      (err)=> {console.log(err);}
    )
  }

  getContractsAscHiringDate()
  {
    this.cs.findAllAscHiringDate().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  getContractsDescHiringDate()
  {
    this.cs.findAllDescHiringDate().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }
  
  getContractsAscEndDate()
  {
    this.cs.findAllAscEndDate().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  getContractsDescEndDate()
  {
    this.cs.findAllDescEndDate().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  getContractsAscOfficialSignature()
  {
    this.cs.findAllAscOfficialSignature().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  getContractsDescOfficialSignature()
  {
    this.cs.findAllDescOfficialSignature().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  getContractsAscGrossAnnualSalary()
  {
    this.cs.findAllAscGrossAnnualSalary().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  getContractsDescGrossAnnualSalary()
  {
    this.cs.findAllDescGrossAnnualSalary().subscribe(
      (data : Contract[])=> {this.contracts = data;  },
      (err)=> {console.log(err);}
    )
  }

  filtreByContratType(e,x) {
    this.cs.findAll().subscribe(
      (data: Contract[]) => {
        this.contracts = []
        this.contracts = data.filter(
          (contr =>               
              x == 'contractType' ? contr.contractType === e : contr.contractType === e             
          )
        )
      }, (err) => {
        return err;
      })
  }

  filtreByStatus(e,x) {
    this.cs.findAll().subscribe(
      (data: Contract[]) => {
        this.contracts = [];
        this.contracts = data.filter(
          (contr =>               
              x == 'status' ? contr.status === e : contr.status === e             
          )
        )
      }, (err) => {
        return err;
      })
  }

  filtreByHoursPlan(e,x) {
    this.cs.findAll().subscribe(
      (data: Contract[]) => {
        this.contracts = [];
        this.contracts = data.filter(
          (contr =>               
              x == 'hourlyDistribution' ? contr.hourlyDistribution === e : contr.hourlyDistribution === e             
          )
        )
      }, (err) => {
        return err;
      })
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.contracts, 'dataContracts');
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }

  archiveContract(contract : Contract , id: string){
    this.cs.makeItArchive(contract,id).subscribe(
      ()=> {
        this.showToast('success','SUCESS','Item Is Archived');
        this.router.navigate(['/hr/contracts/table']).then(() => {
          this.getContracts();  
         });
      }
    )
  }

}
