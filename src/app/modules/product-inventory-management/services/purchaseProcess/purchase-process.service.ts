import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {PurchaseProcess} from "../../models/purchaseProcess/purchase-process";

@Injectable({
  providedIn: 'root'
})
export class PurchaseProcessService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllPPs(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/pp/all`, this.httpOptions);
  }
  
  getOnePP(ppId): Observable<PurchaseProcess> {
    return this.httpClient.get<PurchaseProcess>(`${environment.stockUrl}/pp/${ppId}`, this.httpOptions);
  }
  
  createPurchaseProcess(purchaseProcess: PurchaseProcess): Observable<PurchaseProcess> {
    return this.httpClient.post<PurchaseProcess>(`${environment.stockUrl}/pp/create`, purchaseProcess, this.httpOptions);
  }
  
  firstEditPP(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/first-edit/${ppId}`, purchaseProcess, this.httpOptions);
  }
  
  editPP_PR(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/edit-pp-pr/${ppId}`, purchaseProcess, this.httpOptions);
  }
  
  secondEditPP(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/second-edit/${ppId}`, purchaseProcess, this.httpOptions);
  }
  
  thirdEditPP(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/third-edit/${ppId}`, purchaseProcess, this.httpOptions);
  }
  
  fourthEditPP(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/fourth-edit/${ppId}`, purchaseProcess, this.httpOptions);
  }
  
  fifthEditPP(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/fifth-edit/${ppId}`, purchaseProcess, this.httpOptions);
  }
  
  sixthEditPP(ppId, purchaseProcess: PurchaseProcess): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/sixth-edit/${ppId}`, purchaseProcess, this.httpOptions);
  }

  seventhEditPPService(ppId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/seventh-edit-service/${ppId}`, this.httpOptions);
  }

  seventhEditPP(ppId, materialId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/seventh-edit/${ppId}/${materialId}`, this.httpOptions);
  }

  finalEditPPNoService(ppId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pp/final-edit/${ppId}`, this.httpOptions);
  }
  
  deletePP(ppId): Observable<any> {
    return this.httpClient.delete(`${environment.stockUrl}/pp/delete/${ppId}`, this.httpOptions);
  }
  
}
