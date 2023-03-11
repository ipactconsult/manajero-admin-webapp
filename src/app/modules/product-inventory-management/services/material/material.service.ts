import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Material} from "../../models/material/material";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllMaterials(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/material/all`, this.httpOptions);
  }
  
  getAllMaterialsASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/material/all/asc`, this.httpOptions);
  }
  
  getAllMaterialsDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/material/all/desc`, this.httpOptions);
  }

  getOneMaterial(materialId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/material/show/${materialId}`, this.httpOptions);
  }

  createNewMaterial(material: Material): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/material/create`, material, this.httpOptions);
  }

  updateMaterial(material: Material, materialId: String): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/edit/${materialId}`, material, this.httpOptions);
  }

  updateMaterialQuantity(material: Material, materialId: String): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/update-quantity/${materialId}`, material, this.httpOptions);
  }
  
  revertMaterial(materialId: String): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/revert/${materialId}`, this.httpOptions);
  }
  
  receiveMaterial(materialId, poId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/receive/${materialId}/${poId}`, this.httpOptions);
  }
  
  stockMaterial(material, materialId, warehouseId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/stock/${materialId}/${warehouseId}`, 
      material, this.httpOptions);
  }
  
  stockMaterialW(materialId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/stock-w/${materialId}`, this.httpOptions);
  }
  
  transferMaterialToW(material: Material, materialId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/material/transfer/${materialId}`, material, this.httpOptions);
  }
  
  returnMaterial(materialId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/return/${materialId}`, this.httpOptions);
  }
  
  updateMaterialStock(material: Material, materialId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/update-stock/${materialId}`, material, this.httpOptions);
  }

  fixMaterialStock(materialId, inventoryId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/material/fix-stock/${materialId}/${inventoryId}`, this.httpOptions);
  }

  replenishMaterial(materialId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/material/replenish/${materialId}`, this.httpOptions);
  }

  unreplenishMaterial(materialId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/material/unreplenish/${materialId}`, this.httpOptions);
  }

  archiveMaterial(materialId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/material/archive/${materialId}`, this.httpOptions);
  }
  
  restoreMaterial(materialId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/material/restore/${materialId}`, this.httpOptions);
  }
  
}
