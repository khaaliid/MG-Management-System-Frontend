import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VendorsViewerComponent } from './vendor/vendors-viewer/vendors-viewer.component';
import { CreateVendorComponent } from './vendor/create-vendor-dialog/create-vendor.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './commons/interceptors/HttpErrorInterceptor';
import { SpinnerOverlayComponent } from './commons/spinner/spinner-overlay-component/spinner-overlay-component/spinner-overlay-component';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OverlayDialogeComponent } from './vendor/overlay-dialoge/overlay-dialoge.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './splash/login/login.component';
import { VendorManagementComponent } from './vendor/vendor-management/vendor-management.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { IsSignedInGuard } from './commons/guards/IsSignedInGuard';
import { AuthService } from './user/services/AuthService';
import { HomeComponent } from './splash/home/home.component';
import { SecureInnerPagesGuardGuard } from './commons/guards/secure-inner-pages-guard.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './commons/navigation/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HasPermissionDirective } from './commons/directives/has-permission.directive';
import { ProductsViewerComponent } from './product/products-viewer/products-viewer.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';
import { ProductOverlayDialogeComponent } from './product/product-overlay-dialoge/product-overlay-dialoge.component';
import { CreateProductComponent } from './product/create-product-component/create-product-component.component';
import { ProductCategoriesManagementComponent } from './product/product-categories/product-categories-management/product-categories-management.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorsViewerComponent,
    CreateVendorComponent,
    SpinnerOverlayComponent,
    OverlayDialogeComponent,
    LoginComponent,
    VendorManagementComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    HasPermissionDirective,
    ProductsViewerComponent,
    ProductManagementComponent,
    ProductOverlayDialogeComponent,
    CreateProductComponent,
    ProductCategoriesManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,
 
      useClass: HttpErrorInterceptor,
 
      multi: true
 
    },
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {
      provide: MatDialogRef,
      useValue: {}
    },
IsSignedInGuard,
AuthService,
SecureInnerPagesGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
