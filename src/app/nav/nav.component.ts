import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { user } from '../_models/user';
import { Observable } from 'rxjs/internal/Observable';
import { AccountServiceService } from '../_services/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})
export class NavComponent {
  
  constructor(private accountservice:AccountServiceService, private router:Router) {}

  @Output() testValChange = new EventEmitter<boolean>();
  currentUser$: Observable<user> | undefined;
  currentUser:user;
  toggleSideNav:boolean = false;
  role:string = 'user';
  isAdmin:boolean = false;

  ngOnInit(){
    this.getCurrentUser();
  }

  getCurrentUser()
  {
    this.accountservice.currentUser$.subscribe( result => {
        this.currentUser = result
        this.isAdmin = this.elevatedUser(this.accountservice.getDecodedToken(this.currentUser.token))
    }),error => {
      console.log(error.error.error);
    }
  }

  elevatedUser(role:string){
    if(role == 'admin'){
      return true
    }
  return false
  }

  logout(){
    this.accountservice.logout()
    this.router.navigateByUrl('/login');
    location.reload();
  }

}


