import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Inventory} from "../../models/inventory/inventory";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllInventories(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/inventory/all`, this.httpOptions);
  }

  getAllInventoriesASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/inventory/all/asc`, this.httpOptions);
  }

  getAllInventoriesDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/inventory/all/desc`, this.httpOptions);
  }

  getOneInventory(inventoryId): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/inventory/${inventoryId}`, this.httpOptions);
  }

  createInventory(inventory: Inventory): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/inventory/create`, inventory, this.httpOptions);
  }

  fixInventoryStock(inventoryId, materialId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/inventory/fix-stock/${inventoryId}/${materialId}`, this.httpOptions);
  }

  fixInventory(inventoryId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/inventory/fix/${inventoryId}`, this.httpOptions);
  }

  archiveInventory(inventoryId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/inventory/archive/${inventoryId}`, this.httpOptions);
  }

  restoreInventory(inventoryId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/inventory/restore/${inventoryId}`, this.httpOptions);
  }

  deleteInventory(inventoryId): Observable<any> {
    return this.httpClient.delete<any>(`${environment.stockUrl}/inventory/delete/${inventoryId}`, this.httpOptions);
  }
  
}
