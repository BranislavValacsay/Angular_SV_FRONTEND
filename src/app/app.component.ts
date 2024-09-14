import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, take } from 'rxjs';
import { BusyService } from './_services/busy-service.service';
import { AccountServiceService } from './_services/account-service.service';
import { user } from './_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'provisioning portal';

  constructor(
    private busyservice:BusyService,
    private cdRef: ChangeDetectorRef,
    private accountService: AccountServiceService,
    private router: Router) {

  }

  navVal:boolean;
  isLoading$: Observable<boolean> = this.busyservice.isLoading$;
  isLoading:boolean;
  isLoggedIn:boolean = false;
  currentUser$: Observable<user> | undefined;
  user:user;

  ngOnInit(){
    this.UserLoginCheck();

    const userJson = this.accountService.getSessionData()
    if (userJson) {
      const user:user = userJson;
      this.accountService.setCurrentUser(user);
    } 
    else {
      this.router.navigateByUrl('/login');
    }
    
    this.isLoading$.subscribe(
      result =>{
        this.isLoading=result;
        this.cdRef.detectChanges();
      }
    )
  }

  UserLoginCheck(){
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      result => {
        this.user = result;
        if(this.user) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      }
    )
  }
}
