import {Customer} from './Customer';

export class Visit {
  id : number;
  dateVisit: Date;
  hourVisit: string;
  refVisit : string;
  description : string;
  availability: string;
  status: string;
  title: string;
  customer : Customer;
  property : object;
}