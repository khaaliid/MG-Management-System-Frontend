import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/commons/Constants';
import { SpinnerOverlayService } from 'src/app/commons/spinner/services/spinner-overlay.service';
import { AuthService } from 'src/app/user/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm= this.formBuilder.group({
    id: new FormControl(''),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  backendHttpClient !: HttpClient;
  constructor(private readonly spinnerOverlayService: SpinnerOverlayService, private formBuilder: FormBuilder,
    private http: HttpClient, private httpBackend : HttpBackend, private router: Router,
    private toastr: ToastrService, private authService: AuthService) {
    this.backendHttpClient = new HttpClient(httpBackend);
   }

  ngOnInit(): void {
  }
submit(){
  console.log(this.loginForm.value);
  this.spinnerOverlayService.show();
  this.backendHttpClient.post(Constants.GET_BEARER_ENDPOINT,
    this.loginForm.value).subscribe({
      next: response  => {              
        console.log('Add Vendor response : '+JSON.stringify(response));
        let responseJson = JSON.parse(JSON.stringify(response));
        this.authService.setBearerToken(responseJson.access_token);
        this.authService.setRoles(responseJson.roles);
        this.spinnerOverlayService.hide();
        this.router.navigate(['home']);
      },
      error: error => {
          // console.log('Error during login ...', error);
          // this.toastr.error("Error during logging ..");
          // this.spinnerOverlayService.hide();
          let errorMessage = '';
            console.log(error);
            if (error.error instanceof ErrorEvent) {
              // client-side error
              console.log("clientSide error");
              errorMessage = "Something went wrong happened .. please try again later";
            } else if(error.status==401){
              console.log("authentication error");
              errorMessage = "UserName or password doesn't match !";
              sessionStorage.clear();
              this.router.navigate(['login'])
            }else{
              // server-side error
              console.log("serverSide error");
              errorMessage = "Something went wrong when trying to communicate with the backend";
            }
            this.spinnerOverlayService.hide();
            this.toastr.error(errorMessage);
      }});
      
  }
}
