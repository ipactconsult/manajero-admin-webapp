import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contract} from '../../models/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };


  constructor(private httpClient: HttpClient) {
  }

  
   getAllContracts(): Observable<[Contract]> {

    return this.httpClient.get<[Contract]>(`${environment.crmUrl}contract/allContracts`);
  }
  
   getAllContractsNonArchived(): Observable<[Contract]> {

    return this.httpClient.get<[Contract]>(`${environment.crmUrl}contract/contracts-non-archived/False`);
  }

   getAllContractsArchived(): Observable<[Contract]> {
    return this.httpClient.get<[Contract]>(`${environment.crmUrl}contract/contracts-archived`);
  }

  addContract(contract: Contract) {
    return this.httpClient.post<Contract>(`${environment.crmUrl}contract/add`, contract, this.httpOptions);
  }

  getContractById(id: string) {
    return this.httpClient.get<Contract>(`${environment.crmUrl}contract/contract-by-id/`+id);
  }
  
  updateContract(contract: Contract, id: string): Observable<Contract> {
    return this.httpClient.put<Contract>(`${environment.crmUrl}contract/update-contract/`+id, contract, this.httpOptions);
  }
  
 
  
    cancelArchiveContract(contract: Contract, id: string): Observable<Contract> {
    return this.httpClient.put<Contract>(
      `${environment.crmUrl}contract/cancel-archive-contract/` + id,
      contract, this.httpOptions);
  }
  
  archiveContract(contract: Contract, id: string): Observable<Contract> {
    return this.httpClient.put<Contract>(
      `${environment.crmUrl}contract/archive-contract/` + id,
      contract, this.httpOptions);
  }
}
