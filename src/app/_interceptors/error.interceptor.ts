import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
    constructor(private router: Router){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError(
          error => {console.log('AN ERRROR HAS BEEN INTERCEPTED')

          if (error){
            switch (error.status) {
              case 400:
                if(error.error.errors) {
                  const modalStateErrors = [];
                  for (const key in error.error.errors) {
                    if(error.error.errors[key]) {
                      modalStateErrors.push(error.error.errors[key])
                    }
                  }
                  throw modalStateErrors.flat();
                } 
                break;
              case 401:
                this.router.navigateByUrl('/login')
                break;
  
              case 404:
                
                break;
              
              case 500:
                
              break;
  
              default:
                
                console.log(error);
                break;
            }
          }
          return throwError(() => new Error('General failure'))
        })
      );
    }
}