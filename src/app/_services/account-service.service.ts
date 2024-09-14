import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Form } from '@angular/forms';
import { loginParams } from '../_models/loginparams';

  @Injectable({
    providedIn: 'root'
  })
  export class AccountServiceService {

    baseUrl = environment.baseurl;

    private currentUserSource = new ReplaySubject<user>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) {

     }

    login(user:loginParams) {
      return this.http.post<user>(this.baseUrl+"AD_Auth_Inquiry",user, { withCredentials: true }).pipe(map((response:user)=>
      {
        let user:user = response;
        if(user){
          this.setCurrentUser(user);
        }
      }
    )
  )
}

  logout(){
    var user:user;
    this.currentUserSource.next(user);
    localStorage.removeItem('session');
  }

  setCurrentUser(user:user) {
    if (user !== null ) {
      const roles = this.getDecodedToken(user.token).role;
      localStorage.setItem('session',JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }

  getSessionData() {
    const userJson = localStorage.getItem('session');
    if (userJson) {
      const user:user = JSON.parse(userJson);
      return user
    }
    return null;
  }


  getDecodedToken(token:any) {
    return (JSON.parse(atob(token.split('.')[1]))).role
  }

}
