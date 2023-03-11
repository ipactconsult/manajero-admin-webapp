import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Risk } from "../../models/Risk";

@Injectable({
  providedIn: "root",
})
export class RiskService {
  url = environment.riskUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  findAllRiskByProject(id: string): Observable<[Risk]> {
    return this.http.get<[Risk]>(`${this.url}risk/AllRisksByProject/${id}`);
  }
  addRisk(risk: Risk): Observable<Risk> {
    return this.http.post<Risk>(
      `${this.url}risk/addRisk`,
      risk,
      this.httpOptions
    );
  }
  updateRisk(risk: Risk): Observable<Risk> {
    return this.http.put<Risk>(
      `${this.url}risk/updateRisk`,
      risk,
      this.httpOptions
    );
  }
  archiveRisk(risk: Risk): Observable<Risk> {
    return this.http.put<Risk>(
      `${this.url}risk/archiveRisk`,
      risk,
      this.httpOptions
    );
  }
}
