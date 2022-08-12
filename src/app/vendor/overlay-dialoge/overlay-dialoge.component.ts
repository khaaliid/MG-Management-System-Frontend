import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateVendorComponent } from '../create-vendor-dialog/create-vendor.component';
import { Vendor } from '../dtos/Vendor';


@Component({
  selector: 'app-overlay-dialoge',
  templateUrl: './overlay-dialoge.component.html',
  styleUrls: ['./overlay-dialoge.component.css']
})
export class OverlayDialogeComponent implements OnInit {
  
  @Input() vendor:Vendor|null=null;
  @Input() vendorIndx:number=0;
  constructor( public dialog: MatDialog ) {
  }

  

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateVendorComponent, {
      width: '300px',
      data: {vendor:this.vendor, cachedIndex:this.vendorIndx}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Adding Vendor form closed ...");
    });
  }

}
