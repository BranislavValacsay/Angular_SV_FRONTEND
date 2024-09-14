import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ad_domain } from '../_models/ad_domain';

@Injectable({
  providedIn: 'root'
})
export class AdDomainService {

  private apiUrl:string = environment.baseurl+'Get_AdDomains';

  constructor(private http: HttpClient) { }

    getData() {
      return this.http.get<ad_domain[]>(this.apiUrl).pipe(
        map((response:ad_domain[]) =>{
          const domains = response;
          return domains;
        })
      ) ;
    }
}