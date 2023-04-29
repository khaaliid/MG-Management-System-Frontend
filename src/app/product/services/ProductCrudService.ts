import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/commons/Constants';
import { Actions } from 'src/app/commons/MGEnums';
import { Product } from '../dtos/Product';
import { ProductActionResponse } from '../dtos/ProductAction';

@Injectable({ providedIn: 'root' })
export class productCrudService {
    private productSubject = new Subject<ProductActionResponse>(); //need to create a subject

    constructor(private http: HttpClient){}
    

    addproduct(product: Product) { //the component that wants to update something, calls this fn.        
        this.http.post<Product>(Constants.PRODUCT_API_ENDPOINT_BASE+"findOrCreateproduct",product,{observe: 'response'}).subscribe({
            next: response => {                           //next() callback
              console.log('Add product response : '+JSON.stringify(response));
              if(response && response.body){
                 let productAction = new ProductActionResponse(response.body,Actions.ADD,response.status,response.statusText,0);
                 this.productSubject.next(productAction); //next() will feed the value in Subject
              }else{
                this.productSubject.error("Error during adding product as the response :  "+response);   
              }
            },
            error: error => {
                console.log('Error during adding product ...', error)
            }});
        
    }

    
    updateproduct(product: Product, cacheIndex: number) { //the component that wants to update something, calls this fn.        
        this.http.patch<Product>(Constants.PRODUCT_API_ENDPOINT_BASE+product.productId,product,{observe: 'response'}).subscribe({
            next: response => {                           //next() callback
              console.log('update product response : '+JSON.stringify(response));
              if(response && response.body){
                 let productAction = new ProductActionResponse(response.body,Actions.UPDATE,response.status,response.statusText,cacheIndex);
                 this.productSubject.next(productAction); //next() will feed the value in Subject
              }else{
                this.productSubject.error("Error during adding product as the response :  "+response);   
              }
            },
            error: error => {
                console.log('Error during adding product ...', error)
            }});
        
    }

    deleteproduct(productId: number, cacheIndex: number) { //the component that wants to update something, calls this fn.        
        this.http.delete(Constants.PRODUCT_API_ENDPOINT_BASE+productId,{observe: 'response'}).subscribe({
            next: response => {                           //next() callback
              console.log('update product response : '+JSON.stringify(response));
              if(response && response.body){
                 let productAction = new ProductActionResponse(null,Actions.DELETE,response.status,response.statusText,cacheIndex);
                 this.productSubject.next(productAction); //next() will feed the value in Subject
              }else{
                this.productSubject.error("Error during adding product as the response :  "+response);   
              }
            },
            error: error => {
                console.log('Error during adding product ...', error)
            }});
        
    }

    getproductChangeObservable(): Observable<any> { //the receiver component calls this function         
        return this.productSubject.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
    }


    getAllproducts(offset:number): Observable<any> { //the component that wants to update something, calls this fn.
        return this.http.get(Constants.PRODUCT_API_ENDPOINT_BASE+"?offset="+offset);
        
    }

    getproductPage(pageNo: number, pageSize: number, sortBy: String): Observable<Product[]>{
      return this.http.get<Product[]>(Constants.PRODUCT_API_ENDPOINT_BASE+"page?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
    }


}