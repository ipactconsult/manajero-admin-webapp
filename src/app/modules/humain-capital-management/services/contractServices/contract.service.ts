import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Contract } from '../../models/Contract';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient : HttpClient) { }

  findAll(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all`);
  }

  findAllAscHiringDate(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/hiringDate/asc`);
  }

  findAllDescHiringDate(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/hiringDate/desc`);
  }

  findAllAscEndDate(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/endDate/asc`);
  }

  findAllDescEndDate(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/endDate/desc`);
  }

  findAllAscOfficialSignature(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/officialSignature/asc`);
  }

  findAllDescOfficialSignature(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/officialSignature/desc`);
  }

  findAllAscGrossAnnualSalary(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/grossAnualSalary/asc`);
  }

  findAllDescGrossAnnualSalary(): Observable<[Contract]> {
    return this.httpclient.get<[Contract]>(`${environment.employees_hcm}contract/all/sorting/grossAnualSalary/desc`);
  }

  assignContract(contract : Contract , id : string) {
    return this.httpclient.post<Contract>(`${environment.employees_hcm}contract/assign/`+id ,contract , this.httpOptions);
  }

  getContract(id : string) {
    return this.httpclient.get<Contract>(`${environment.employees_hcm}contract/get/`+id , this.httpOptions);
  }

  makeItArchive(contract : Contract , id : string) {
    return this.httpclient.put<Contract>(`${environment.employees_hcm}contract/update-is-archived/`+id ,contract , this.httpOptions);
  }

  makeItRestored(contract : Contract , id : string) {
    return this.httpclient.put<Contract>(`${environment.employees_hcm}contract/update-is-restore/`+id ,contract , this.httpOptions);
  }

  updateContract(contract: Contract, id: string){
    return this.httpclient.put<Contract>(`${environment.employees_hcm}contract/update/`+id ,contract , this.httpOptions);
  }

  deleteContract(contract: Contract | string): Observable<string>
  {
    const id = typeof contract === 'string' ? contract : contract.id;
    const path = `${environment.employees_hcm}contract/delete/`+id;
    //@ts-ignore
    return this.httpclient.delete<string>(path, httpOptionsPlain);
  }

}
