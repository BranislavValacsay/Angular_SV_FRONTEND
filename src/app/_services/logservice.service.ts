import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { log } from '../_models/log';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private baseurl:string = environment.baseurl
  private apiUrl:string = this.baseurl+'Get_Log';
  hubUrl = environment.hubUrl;
  private hubConnection : HubConnection;

  private LogSource = new BehaviorSubject<log[]>([])
  logThread$ = this.LogSource.asObservable();

  constructor(private http: HttpClient) { }

  getLogs() {
    return this.http.get<log[]>(this.apiUrl).pipe(
      map((response:log[]) =>{
        const logs = response;
        this.LogSource.next(response);
        return logs;
      })
    );
  }

  getLogForGuid(guid:string) {
    return this.http.get<log>(this.apiUrl+"/"+guid).pipe(
      map((response:log) =>{
        const logs = response;
        return logs;
      })
    );
  }

  createHubConnection(){
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl).build();
    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('LogUpdate',newLogEntry => {
      this.logThread$.pipe(take(1)).subscribe(
        logs => {this.LogSource.next([newLogEntry,...logs])}
      )
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(error => console.log(error));
  }
}
