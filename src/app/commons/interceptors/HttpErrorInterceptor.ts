import {

    HttpEvent,
   
    HttpInterceptor,
   
    HttpHandler,
   
    HttpRequest,
   
    HttpResponse,
   
    HttpErrorResponse
   
   } from '@angular/common/http';
   
   import { Observable, throwError } from 'rxjs';
   
   import { map, catchError, finalize  } from 'rxjs/operators';
import { SpinnerOverlayService } from '../spinner/services/spinner-overlay.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

   
@Injectable({
    providedIn: 'root',
  })
   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private readonly spinnerOverlayService: SpinnerOverlayService, private toastr: ToastrService){}
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerOverlayService.show();
      return next.handle(request)
   
        .pipe(
          map(res => {
            console.log("Passed through the interceptor in response");
            return res
        }),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            console.log(error);
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = "Something went wrong happened .. please try again later";
            } else {
              // server-side error
              
              errorMessage = "Something went wrong when trying to communicate with the backend";
            }
            this.toastr.error(errorMessage);
            return throwError(()=> new Error(errorMessage));
   
          }),
          finalize(() => this.spinnerOverlayService.hide())        
        )
   
    }
   
   }