import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { serverNameDto } from '../_dto/serverNameDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerNamesService {

  private apiUrl:string = environment.baseurl+'Get_LastReservedName';

  constructor(private http: HttpClient) { }

  getNameForServer(guid:string) {
    
    return this.http.get<serverNameDto>(this.apiUrl+"/"+guid).pipe(
      map((response:any) =>{
        const servers = response;
        return servers;
      })
    );
  }
}
