import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
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

@NgModule({
  declarations: [
    AppComponent,
    VendorsViewerComponent,
    CreateVendorComponent,
    SpinnerOverlayComponent,
    OverlayDialogeComponent
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
    MatPaginatorModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
