import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/token/token.service';
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor   {

  constructor(private tokenService: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    
    if (token != null) {
      authReq = req.clone(
        {
          setHeaders:{Authorization: 'Bearer xxxx'} }
        );
    }
    return next.handle(authReq);
  }
}

