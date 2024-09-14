import { CanActivateFn, Router } from '@angular/router';
import { AccountServiceService } from '../_services/account-service.service';
import { SnackbarService } from '../_services/snackbar.service';
import { inject } from "@angular/core";
import { user } from '../_models/user';
import { take } from 'rxjs/internal/operators/take';

export const authGuard: CanActivateFn = (route, state) => {

  //return true
  let _user:user;
  let router = inject(Router);

  inject(AccountServiceService).currentUser$.pipe(take(1)).subscribe(
    result => {
      _user = result 
    }
  ) 

  if(_user) {
    return true;
  }
  
  let snack = inject(SnackbarService)
  snack.openSnackBar("Not logged in!")
  router.navigateByUrl('/login');
  return false
};
