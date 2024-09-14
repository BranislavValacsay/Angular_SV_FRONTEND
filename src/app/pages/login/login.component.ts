import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/_services/account-service.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (private accountService:AccountServiceService,
    private snackbar:SnackbarService,
    private router: Router
    ) {}

  user:any = {}

 login(){
  if (this.user.username == null) {this.snackbar.openSnackBar("user name missing"); return} 
  if (this.user.password == null) {this.snackbar.openSnackBar("password field is empty"); return} 
  this.accountService.login(this.user).subscribe(
    result => (
      this.snackbar.openSnackBar("login successfull"),
      this.router.navigateByUrl("/serverlist")
    ),
    error => (this.snackbar.openSnackBar("login failed"),
    this.user.password = null
    )
  );
 }

}
