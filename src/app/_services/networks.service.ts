import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { vmmnetwork } from '../_models/vmmnetwork';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworksService {

  private baseurl:string = environment.baseurl
  private apiUrl:string = this.baseurl+'VmmNetworks';

  constructor(private http: HttpClient) { }

    getData(parameters?:HttpParams) {
      return this.http.get<vmmnetwork[]>(this.apiUrl+"?"+parameters).pipe(
        map((response:vmmnetwork[]) =>{
          const networks = response;
          return networks;
        })
      );
    }

    getFirstAvailableIP(params:HttpParams){
      const addr = this.baseurl+"Get_FirstFreeIp"
      return this.http.get<any>(addr+"?"+params).pipe(
        map((response:any) =>{
          return response;
        })
      );
    }

    SetIPAddressStatus(params:HttpParams){
      const addr = this.baseurl+"SetIPAddressStatus"
      return this.http.get<any>(addr+"?"+params).pipe(
        map((response:any) =>{
          return response;
        })
      );
    }
    
}
