import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Loginrequest } from '../model/Loginrequest';
import { Auth } from '../model/Auth';

import {ForgetRequest} from '../model/ForgetRequest';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  authUrl =environment.auth;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }),
  };
  constructor(private http: HttpClient) { }

  logout(email): Observable<any> {
    return this.http.put<any>(`${this.authUrl}logout/${email}`,this.httpOptions);
  }

  register(auth: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.authUrl}signup`,auth,this.httpOptions);
  }

  login(loginRequest: Loginrequest): Observable<Auth> {
    return this.http.post<Auth>(`${this.authUrl}signin`,loginRequest,this.httpOptions);
  }
    forgetPWD(forgetRequest: ForgetRequest){
    return this.http.post<ForgetRequest>(`${this.authUrl}forgotPassword`,forgetRequest);
  }
  
      resetPWD(forgetRequest: ForgetRequest, token:string){
        
    return this.http.put<ForgetRequest>(`${this.authUrl}resetPassword?token=`+token,forgetRequest);
  }

  getAllUsers(): Observable<Auth[]> {
    console.log('servvice : ',this.http.get<Auth>(`${this.authUrl}getAllUsers`,this.httpOptions))
    return this.http.get<Auth[]>(`${this.authUrl}getAllUsers`,this.httpOptions);
 
  }


  getnbUsers(): Observable<Auth[]> {

    return this.http.get<Auth[]>(`${this.authUrl}count-users`,this.httpOptions);
 
  }


  getUserById(id : String ): Observable<Auth>{
    return this.http.get<Auth>(`${this.authUrl}User-by-id/${id}`);
  }

/*
  findAllBYScreening(): Observable<Auth[]> {
    return this.http.get<Auth[]>(`${this.authUrl}application/screening-applications`);
  }


  validate(application:Auth, id : string): Observable<Auth> {
    const path = `${this.authUrl}application/validate/`+id ;
    //@ts-ignore
    return this.http.put<Application>(path ,application , this.httpOptions);
  }

  reject(application:Auth, id : string): Observable<Auth> {
    const path = `${this.authUrl}application/reject/`+id ;
    //@ts-ignore
    return this.http.put<Application>(path ,application , this.httpOptions);
  }
*/







findAll(): Observable<Auth[]> {
  return this.http.get<Auth[]>(`${this.authUrl}application/list-applications`);
}

findAllBYScreening(): Observable<Auth[]> {
  return this.http.get<Auth[]>(`${this.authUrl}application/screening-applications`);
}

getApplication(id : string): Observable<Auth>{
  return this.http.get<Auth>(`${this.authUrl}application/app/${id}`, this.httpOptions);
}

screen(application:Auth, id : string): Observable<Auth> {
  const path = `${this.authUrl}application/screen/`+id ;
  //@ts-ignore
  return this.httpclient.put<Application>(path ,application , this.httpOptions);
}

validate(application:Auth, id : string): Observable<Auth> {
  const path = `${this.authUrl}application/validate/`+id ;
  //@ts-ignore
  return this.httpclient.put<Application>(path ,application , this.httpOptions);
}

reject(application:Auth, id : string): Observable<Auth> {
  const path = `${this.authUrl}application/reject/`+id ;
  //@ts-ignore
  return this.httpclient.put<Application>(path ,application , this.httpOptions);
}



}
