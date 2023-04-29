import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../dtos/Product';
import { productCrudService } from '../services/ProductCrudService';
import { Actions } from 'src/app/commons/MGEnums';

@Component({
  selector: 'app-products-viewer',
  templateUrl: './products-viewer.component.html',
  styleUrls: ['./products-viewer.component.css']
})
export class ProductsViewerComponent implements OnInit {

  @Input() 
  products !: Product[];
  pageLength=11;
  displayedColumns: string[] = [ 'productId', 'productName', 'actions'];

  constructor(private productCrudService:productCrudService) { }

  ngOnInit(): void {
    this.productCrudService.getproductChangeObservable().subscribe(
      value=>{
        console.log("This is from the child component the product action is : "+JSON.stringify(value));
        
        switch (value.action){
        
          case Actions.ADD:{
            this.products.push(value.product); 
            this.products = [...this.products]; // this is required to refresh the mat-table !
            return;
          }

          case Actions.UPDATE:{
            this.products[value.cachedIndex] = value.product; 
            this.products = [...this.products]; // this is required to refresh the mat-table !
            return;
          }

          case Actions.DELETE:{
            this.products.splice(value.cachedIndex, 1);
            this.products = [...this.products]; // this is required to refresh the mat-table !
            return;
          }


        }

      }
    )
  }

  paginationChanged(event:any){
    
    console.log("product viewer pagination changed with event : "+JSON.stringify(event));
    
    this.productCrudService.getproductPage(event.pageIndex,event.pageSize,"").subscribe(
      receivedproducts =>{
        if(receivedproducts && receivedproducts.length>0){
          this.products=receivedproducts;
          this.products = [...this.products];
          console.log("got a new product page");
          this.pageLength= this.pageLength+this.products.length;
        }else{
          console.log("After pagination call - products : "+receivedproducts);
          this.pageLength = this.pageLength-event.pageSize-2;
          console.log("No more product pages");
          this.products = [];
          this.products = [...this.products];
        }
        console.log("pagination length is : "+this.pageLength);
      }
    );
  }


  deleteProduct(productId:number, viewIndex:number){

    console.log("Will delete product with ID : "+productId+" and index : "+viewIndex);
    this.productCrudService.deleteproduct(productId,viewIndex);
    
  }

}
