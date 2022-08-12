import { Component } from '@angular/core';
import { ComponentType } from 'ngx-toastr';
import { CreateVendorComponent } from './vendor/create-vendor-dialog/create-vendor.component';
import { Vendor } from './vendor/dtos/Vendor';
import { VendorCrudService } from './vendor/services/VendorCrudService';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              '../../node_modules/material-design-icons/iconfont/material-icons.css'
            ]
})
export class AppComponent {
  title = 'MG-Management-System-Frontend';
  vendors : Array<Vendor> = [];
  vendorCreation!:ComponentType<CreateVendorComponent>;
  inputData:{}={};

  constructor(private vendorCrudService: VendorCrudService){
    this.vendorCrudService.getVendorPage(0,11,"").subscribe(
      receivedVendors =>{
          this.vendors=receivedVendors;
      }
    );
  }

}
