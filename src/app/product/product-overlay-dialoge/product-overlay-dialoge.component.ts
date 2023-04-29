import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../dtos/Product';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product-component/create-product-component.component';

@Component({
  selector: 'product-overlay-dialoge',
  templateUrl: './product-overlay-dialoge.component.html',
  styleUrls: ['./product-overlay-dialoge.component.css']
})
export class ProductOverlayDialogeComponent implements OnInit {


  @Input() productIndx : Number=0;
  @Input() product !: Product;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    console.log(this.product);
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '300px',
      data: {product:this.product, cachedIndex:this.productIndx}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Adding product form closed ...");
    });
  }


}
