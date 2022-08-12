import { Component, Input, OnInit } from '@angular/core';
import { Actions } from 'src/app/commons/MGEnums';
import { Vendor } from '../dtos/Vendor';
import { VendorCrudService } from '../services/VendorCrudService';





@Component({
  selector: 'app-vendors-viewer',
  templateUrl: './vendors-viewer.component.html',
  styleUrls: ['./vendors-viewer.component.css']
})


export class VendorsViewerComponent implements OnInit {

  displayedColumns: string[] = [ 'vendorId', 'vendorName', 'address', 'actions'];
  @Input() vendors!: Array<Vendor>;
  pageLength: number=11;

  constructor(
    private vendorCrudService: VendorCrudService
  ) {
   }

  ngOnInit(): void {
    this.vendorCrudService.getVendorChangeObservable().subscribe(
      value=>{
        console.log("This is from the child component the vendor action is : "+JSON.stringify(value));
        
        switch (value.action){
        
          case Actions.ADD:{
            this.vendors.push(value.vendor); 
            this.vendors = [...this.vendors]; // this is required to refresh the mat-table !
            return;
          }

          case Actions.UPDATE:{
            this.vendors[value.cachedIndex] = value.vendor; 
            this.vendors = [...this.vendors]; // this is required to refresh the mat-table !
            return;
          }

          case Actions.DELETE:{
            this.vendors.splice(value.cachedIndex, 1);
            this.vendors = [...this.vendors]; // this is required to refresh the mat-table !
            return;
          }


        }

      }
    )
  }

  deleteVendor(vendorId:number, viewIndex:number){

    console.log("Will delete vendor with ID : "+vendorId+" and index : "+viewIndex);
    this.vendorCrudService.deleteVendor(vendorId,viewIndex);
    
  }

  editVendor(vendor:Vendor, viewIndex:number){
    console.log("Will edit vendor with details : "+JSON.stringify(vendor)+" and index : "+viewIndex);
    this.vendorCrudService.updateVendor(vendor,viewIndex);
  
  }

  paginationChanged(event:any){
    
    console.log("vendor viewer pagination changed with event : "+JSON.stringify(event));
    
    this.vendorCrudService.getVendorPage(event.pageIndex,event.pageSize,"").subscribe(
      receivedVendors =>{
        if(receivedVendors && receivedVendors.length>0){
          this.vendors=receivedVendors;
          this.vendors = [...this.vendors];
          console.log("got a new vendor page");
          this.pageLength= this.pageLength+this.vendors.length;
        }else{
          console.log("After pagination call - vendors : "+receivedVendors);
          this.pageLength = this.pageLength-event.pageSize-2;
          console.log("No more vendor pages");
          this.vendors = [];
          this.vendors = [...this.vendors];
        }
        console.log("pagination length is : "+this.pageLength);
      }
    );
  }
}
