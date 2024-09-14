import { Injectable } from "@angular/core";
import { Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BusyService {
  
  constructor() { }

  busyRequestCount:number = 0;
  public isLoading = new Subject<boolean>();
  public isLoading$ = this.isLoading.asObservable();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

}