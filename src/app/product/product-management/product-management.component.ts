import { Component, OnInit } from '@angular/core';
import { Product } from '../dtos/Product';
import { productCrudService } from '../services/ProductCrudService';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products : Array<Product>=[];
  constructor(private productCrudService : productCrudService) { 
    this.productCrudService.getproductPage(0,11,"").subscribe(
      receivedProducts=>{        
        this.products=receivedProducts;
      }
    )
  }

  ngOnInit(): void {
  }

}
