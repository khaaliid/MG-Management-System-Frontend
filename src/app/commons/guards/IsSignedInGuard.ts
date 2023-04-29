import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/user/services/AuthService";

@Injectable()
export class IsSignedInGuard implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(private authService: AuthService,private router: Router,
    private toastr: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isSignedIn()) {
      this.toastr.error("Kindly login first");
      this.router.navigate(["login"]); // or home
      // return true;
    }
    // this.router.navigate(["login"]);
    return true;
  }
}