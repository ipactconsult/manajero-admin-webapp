import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loi } from '../../models/Loi';
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
export class LoiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  constructor(private httpClient: HttpClient) {

  }

  getAllLois(): Observable<[Loi]> {
    return this.httpClient.get<[Loi]>(`https://recovery-dispute.herokuapp.com/lois/all`);

  }
  
  addLoi(c: Loi) {
    return this.httpClient.post<Loi>(`https://recovery-dispute.herokuapp.com/lois/add`, c, this.httpOptions);
  }

  updateLoi(id:string ,loi: Loi): Observable<Loi>{
    const path = `https://recovery-dispute.herokuapp.com/lois/update/` +id ;
    //@ts-ignore
    return this.httpClient.put<Loi>(path ,loi , this.httpOptions);

  }
  
 GetLoibyCategory(name:string){
  console.log("Calling Method !",`https://recovery-dispute.herokuapp.com/lois/allcategories/`+name);
  return this.httpClient.get<[Loi]>(`https://recovery-dispute.herokuapp.com/lois/allcategories/`+name);

}
getLoiByid(id: string):Observable<Loi>{
  return this.httpClient.get<Loi>(`https://recovery-dispute.herokuapp.com/lois/findbyid/`+id  , this.httpOptions);
}
deleteLoi(id: string): Observable<Loi> {
  return this.httpClient.delete<Loi>(`https://recovery-dispute.herokuapp.com/lois/delete/` + id);
}

}
