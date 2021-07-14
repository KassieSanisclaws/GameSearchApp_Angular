import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError as observableThrowError } from 'rxjs';
  import { catchError } from 'rxjs/operators';


@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor() {}

// the below is the intercept method for http interface. 
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(  // this line is a return of handle next for our request and pipe that ctahes the error. // 
      catchError((err) => {
        console.log(err);
        return observableThrowError(err);     //  return returns the error from observable. //
      })
    );
  }
}