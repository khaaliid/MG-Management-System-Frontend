import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsSignedInGuard } from './commons/guards/IsSignedInGuard';
import { SecureInnerPagesGuardGuard } from './commons/guards/secure-inner-pages-guard.guard';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomeComponent } from './splash/home/home.component';
import { LoginComponent } from './splash/login/login.component';
import { VendorManagementComponent } from './vendor/vendor-management/vendor-management.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsSignedInGuard] },
  { path: 'home', component: HomeComponent, canActivate: [IsSignedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuardGuard] },
  { path: 'logout', component: LoginComponent, canActivate: [IsSignedInGuard] },
  { path: 'vendor', component: VendorManagementComponent, canActivate: [IsSignedInGuard] },
  { path: 'product', component: ProductManagementComponent, canActivate: [IsSignedInGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
