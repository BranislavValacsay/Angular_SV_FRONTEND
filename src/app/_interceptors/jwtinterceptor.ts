import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { user } from '../_models/user';
import { AccountServiceService } from '../_services/account-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Jwtinterceptor implements HttpInterceptor{

  constructor(private accountService:AccountServiceService){}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let currentUser: user;
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
        if (currentUser) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
            }
          })
        }
        return next.handle(request);
      }
}
