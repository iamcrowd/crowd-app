import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

declare var iziToast;

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.authService.getToken();
    if (token != null && this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.sessionExpiredMessage();
      return throwError("Session Timed Out");
    } else {
      const authRquest = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
      return next.handle(authRquest)
        .pipe(
          tap(event => {
          }, error => {
          })
        )
    }
  }

  sessionExpiredMessage() {
    iziToast.question({
      timeout: false,
      close: false,
      overlay: true,
      displayMode: 'replace',
      zindex: 1051,
      // theme: 'dark',
      icon: 'fa fa-user',
      color: 'yellow',
      message: 'Your session is expired, please login again.',
      position: 'topCenter',
      buttons: [
        ['<button>Close</button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true]
      ]
    });
  }
}
