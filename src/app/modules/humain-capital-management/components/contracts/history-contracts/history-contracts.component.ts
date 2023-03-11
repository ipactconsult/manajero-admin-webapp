import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Contract } from '../../../models/Contract';
import { ContractService } from '../../../services/contractServices/contract.service';
import { ExportService } from '../../../../../shared/exports/export.service';

@Component({
  selector: 'ngx-history-contracts',
  templateUrl: './history-contracts.component.html',
  styleUrls: ['./history-contracts.component.scss']
})
export class HistoryContractsComponent implements OnInit {

  contracts : Contract[]=[];

  config : NbToastrConfig;
  title = 'Restore Contract';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  pageSize:number = 11;

  constructor(private cs : ContractService
            , private router:Router
            , private exportService: ExportService
            , private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts(){
    this.cs.findAll().subscribe(
      (data: Contract[])=>
      {
        this.contracts = data.filter((c)=>c.isArchived === "Yes");
      },
      (err)=>{console.log(err);}
    )
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


  restoreContract(contract : Contract , id: string){
    this.cs.makeItRestored(contract,id).subscribe(
      ()=> {
        this.showToast('success','SUCESS','Item Is Restored');
        this.router.navigate(['/hr/contracts/history']).then(() => {
          this.getAllContracts();  
         });
      }
    )
  }

  deleteContract(contract : Contract){
    this.cs.deleteContract(contract).subscribe(
      () => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        this.router.navigate(['/hr/contracts/history']).then(() => {
          this.getAllContracts();  
         });
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete Employee');
        console.log(err);
      }
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

}
