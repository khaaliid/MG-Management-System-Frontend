import { Component, OnInit } from '@angular/core';
import { Vendor } from '../dtos/Vendor';
import { VendorCrudService } from '../services/VendorCrudService';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent implements OnInit {

  vendors : Array<Vendor> = [];
  constructor(private vendorCrudService: VendorCrudService) { 
    this.vendorCrudService.getVendorPage(0,11,"").subscribe(
      receivedVendors =>{
          this.vendors=receivedVendors;
      }
    );
  }

  ngOnInit(): void {
  }

}
