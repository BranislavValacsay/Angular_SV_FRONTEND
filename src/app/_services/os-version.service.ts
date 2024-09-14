import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsVersionService {

  private apiUrl:string = environment.baseurl+'Get_OsImageInfo';

  constructor(private http: HttpClient) { }

    getData() {
      return this.http.get<any>(this.apiUrl).pipe(
        map((response:any) =>{
          const networks = response;
          return networks;
        })
      ) ;
    }
}
