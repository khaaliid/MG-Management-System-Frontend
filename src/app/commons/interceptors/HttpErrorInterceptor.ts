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
import { Router } from '@angular/router';
import { Constants } from '../Constants';

   
@Injectable({
    providedIn: 'root',
  })
   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private readonly spinnerOverlayService: SpinnerOverlayService,
                private toastr: ToastrService,
                private router:Router){}
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerOverlayService.show();
        const modifiedRequest = request.clone({ 
          headers: request.headers.set('Authorization', `Bearer `+sessionStorage.getItem(Constants.Bearer_token)),
        });
      return next.handle(modifiedRequest)
      // return next.handle(request)
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
              console.log("clientSide error");
              errorMessage = "Something went wrong happened .. please try again later";
            } else if(error.status==401){
              console.log("authentication error");
              errorMessage = "Please login first";
              sessionStorage.clear();
              this.router.navigate(['login'])
            }else{
              // server-side error
              console.log("serverSide error");
              errorMessage = "Something went wrong when trying to communicate with the backend";
            }
            this.toastr.error(errorMessage);
            return throwError(()=> new Error(errorMessage));
   
          }),
          finalize(() => this.spinnerOverlayService.hide())        
        )
   
    }
   
   }