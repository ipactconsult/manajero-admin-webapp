import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Employee } from '../../models/Employee';
import { EmployeeData} from '../../models/EmployeeData';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  countriesUrl : string = 'https://api.serpwow.com/live/search?api_key=demo&q=pizza&gl=fr';
  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  
  constructor(private httpclient: HttpClient) { }
  addEmployee(employee: Employee)
  {
    return this.httpclient.post<Employee>(`${environment.employees_hcm}employee/create`, employee, this.httpOptions);
  }

  findAll(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/all`);
  }

  findEmployeesWithNameAndImage(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/employees_select`);
  }

  findAllEmps(): Observable<[EmployeeData]> {
    return this.httpclient.get<[EmployeeData]>(`${environment.employees_hcm}employee/all_Emps`);
  }

  findAllEmployeesDesc(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/all/descending`);
  }
  findAllEmployeesAsc(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/all/ascending`);
  }
  findAllEmployeesHomme(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/all/homme`);
  }
  findAllEmployeesFemme(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/all/femme`);
  }
  
  deleteEmployeeById(employee: Employee | string): Observable<string>
  {
    const id = typeof employee === 'string' ? employee : employee.id;
    const path = `${environment.employees_hcm}employee/delete/`+id;
    //@ts-ignore
    return this.httpclient.delete<string>(path, this.httpOptions);
  }
  updateEmployee(id:string,employee:Employee): Observable<Employee> {
    const path = `${environment.employees_hcm}employee/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<Employee>(path ,employee , this.httpOptions);
  }

  getEmployee(id: string):Observable<Employee>{
    return this.httpclient.get<Employee>(`${environment.employees_hcm}employee/findbyid/`+id  , this.httpOptions);
  }

  updateIsArchived(employee: Employee, id: string): Observable<Employee>{
    const path = `${environment.employees_hcm}employee/update-is-archived/`+id ;
    //@ts-ignore
    return this.httpclient.put<Employee>(path ,employee , this.httpOptions);
  }

  updateIsRestored(employee: Employee, id: string): Observable<Employee>{
    const path = `${environment.employees_hcm}employee/update-is-restored/`+id ;
    //@ts-ignore
    return this.httpclient.put<Employee>(path ,employee , this.httpOptions);
  }

  
  //shared with syrine
   findAllCommercialsEmployees(): Observable<[Employee]> {
    return this.httpclient.get<[Employee]>(`${environment.employees_hcm}employee/commercial`);
  }

  invite(email : string, matriculate : string, role : string){
    const path = `${environment.mailing}invite/${email}/${matriculate}/${role}` ;
    return this.httpclient.post(path,this.httpOptions);
  }

  getAllRoles()
  {
    return this.httpclient.get<[any]>(`${environment.authRoles}findAll`);

  }
}
