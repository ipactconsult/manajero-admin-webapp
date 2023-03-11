import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private detailsSource = new BehaviorSubject<string>('');
  private dateSource = new BehaviorSubject<string>('');


  date = this.dateSource.asObservable()
  details = this.detailsSource.asObservable()

  constructor() { }
  
  transferData(date:string,details:string) {
    this.dateSource.next(date);
    this.detailsSource.next(details);
  }
}
