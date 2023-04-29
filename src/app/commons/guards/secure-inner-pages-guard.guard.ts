import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuardGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router,
    private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isSignedIn()) {
        this.toastr.warning("You are already logged in !");
        this.router.navigate(['vendor']);
      }
      return true;
  }
  
}
