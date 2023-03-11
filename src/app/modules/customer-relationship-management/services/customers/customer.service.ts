import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Customer} from '../../models/Customer';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };


  constructor(private httpClient: HttpClient) {
  }

  
  //CLIENTS MANAGEMENT
  getAllCustomers(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/allCustomers`);
  }
  
  
    getAllClients(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/onlyClients`);
  }
  
    findAllCustomers() {
    return this.httpClient.get(`${environment.crmUrl}customer/allCustomers`);
  }

  addCustomer(c: Customer, idEmployee: string) {
    return this.httpClient.post<Customer>(`${environment.crmUrl}customer/add/`+idEmployee, c, this.httpOptions);
  }

  updateCustomer(customer: Customer, idEmployee: string): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `${environment.crmUrl}customer/update-customer/`+idEmployee,
      customer, this.httpOptions);
  }
  

  updateCustomerAsClient(customer: Customer, id: string): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `${environment.crmUrl}customer/update-customer-as-client/` + id,
      customer, this.httpOptions);
  }

  cancelArchiveCustomer(customer: Customer, id: string): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `${environment.crmUrl}customer/cancel-archive-client/` + id,
      customer, this.httpOptions);
  }

  archiveCustomer(customer: Customer, id: string): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `${environment.crmUrl}customer/archive-client/` + id,
      customer, this.httpOptions);
  }

  deleteCustomer(customer: Customer | string): Observable<string> {
    const id = typeof customer === 'string' ? customer : customer.id;
    const url = `${environment.crmUrl}customer/delete/` + id;
    // @ts-ignore
    return this.httpClient.delete<string>(url, httpOptionsPlain);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${environment.crmUrl}customer/customer-by-id/` + id);
  }

  findAllCustomerDesc(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/all/descending`);
  }

  findAllCustomerAsc(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/all/ascending`);
  }

  findNonArchivedCustomers() {
    return this.httpClient.get(`${environment.crmUrl}customer/non-archived-customers/False`);
  }

  
  
  //PROSPECTS MANAGEMENTS
 findProspects(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/customer-by-status/Prospect/False`);
  }

 //PROSPECTS MANAGEMENTS
 findProspectsArchived(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/customer-by-status/Prospect/True`);
  }


  
  findProspectsCreatedAtAsc(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/prospects-created-asc/Prospect`);
  }

    updateCustomerAsLead(customer: Customer, id: string): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `${environment.crmUrl}customer/update-customer-as-lead/` + id,
      customer, this.httpOptions);
  }

  findProspectsCreatedAtDesc(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/customer-by-desc-created/Prospect/False`);
  } 
  
  findProspectsNameDesc(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/customer-by-desc-name/Prospect/False`);
  }

    findProspectsNameAsc(): Observable<[Customer]> {
    return this.httpClient.get<[Customer]>(`${environment.crmUrl}customer/customer-by-asc-name/Prospect/False`);
  }

  


}
