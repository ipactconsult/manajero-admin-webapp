import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Parternership } from '../models/parternership';
import { IInternByCampaignModel } from '../models/IInternByCampaignModel';


@Injectable({
  providedIn: 'root'
})
export class ParternershipService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   
  private apiServerUrl = environment.comMarketing;

  constructor(private http: HttpClient){}

  findAll(): Observable<any> {
    return this.http.get<any>
  (`${this.apiServerUrl}/Parternership/allParternerships`, this.httpOptions);
  }


  public getParternerships(): Observable<Parternership[]> {
    return this.http.get<Parternership[]>(`${this.apiServerUrl}/Parternership/allParternerships`);

  }

  public addParternership(parternership: Parternership): Observable<Parternership> {
  
    return this.http.post<Parternership>(`${this.apiServerUrl}/Parternership/add`, parternership ,  this.httpOptions) ;
  }

  public updateParternership(parternership: Parternership): Observable<Parternership> {
    return this.http.put<Parternership>(`${this.apiServerUrl}/Parternership/update-Parternership`, parternership ,  this.httpOptions);
  }

  public deleteParternership(id: String): Observable<void> {
    return this.http.delete<void>(`${environment.comMarketing}/Parternership/delete/${id}`);

  
  }

  getPartnerById(id : String ): Observable<Parternership>{
    return this.http.get<Parternership>(`${environment.comMarketing}/Parternership/idParternership-by-id/${id}`);
  }

  findAllPartnerDesc(): Observable<Parternership[]> {
    return this.http.get<[Parternership]>(`${environment.comMarketing}/Parternership/descending`);
  }

  findAllPartnerAsc(): Observable<Parternership[]> {
    return this.http.get<[Parternership]>(`${environment.comMarketing}/Parternership/ascending`);
  }


  cancelArchivePartner(partner: Parternership, id: string): Observable<Parternership> {
    return this.http.put<Parternership>(
      `${environment.comMarketing}/Parternership/cancelArchive-partner/` + id,
      partner, this.httpOptions);
  }

  archivePartner(partner: Parternership, id: string): Observable<Parternership> {
    return this.http.put<Parternership>(
      `${environment.comMarketing}/Parternership/archive-partner/` + id,
      partner, this.httpOptions);
  }


  getPartnerByCountry(): Observable<Array<IInternByCampaignModel>>{
  //  const url = API_RESOURCES_BASE_URL + API_RESOURCES_PATHS.DASHBOARD_PATH.INTERNBYCAMPAIGN;

 //   return this.http.get<Array<IInternByCampaignModel>>(url,FETCHING_JSON_REQUESTS_HTTP_OPTIONS)
     return this.http.get<[IInternByCampaignModel]>(`${environment.comMarketing}/Parternership/stat`);

 
}


}
