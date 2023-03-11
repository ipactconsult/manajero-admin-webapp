import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../models/Contract';
import { ContractService } from '../../../services/contractServices/contract.service';
import { ExportService } from '../../../../../shared/exports/export.service';

@Component({
  selector: 'ngx-grid-contracts',
  templateUrl: './grid-contracts.component.html',
  styleUrls: ['./grid-contracts.component.scss']
})
export class GridContractsComponent implements OnInit {

  contracts : Contract[]=[];
  search : string = "";
  pageSize:number = 4;

  constructor(private cs : ContractService, private exportService : ExportService) { }

  ngOnInit(): void {
    this.getContracts();
  }

  getContracts()
  {
    this.cs.findAll().subscribe(
      (data : Contract[])=> {this.contracts = data;},
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

}
