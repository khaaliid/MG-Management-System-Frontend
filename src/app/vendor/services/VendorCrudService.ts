import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/commons/Constants';
import { Actions } from 'src/app/commons/MGEnums';
import { Vendor } from '../dtos/Vendor';
import { VendorActionResponse } from '../dtos/VendorAction';

@Injectable({ providedIn: 'root' })
export class VendorCrudService {
    private vendorSubject = new Subject<VendorActionResponse>(); //need to create a subject

    constructor(private http: HttpClient){}
    

    addVendor(vendor: Vendor) { //the component that wants to update something, calls this fn.        
        this.http.post<Vendor>(Constants.VENDOR_ENDPOINT+"findOrCreateVendor",vendor,{observe: 'response'}).subscribe({
            next: response => {                           //next() callback
              console.log('Add Vendor response : '+JSON.stringify(response));
              if(response && response.body){
                 let vendorAction = new VendorActionResponse(response.body,Actions.ADD,response.status,response.statusText,0);
                 this.vendorSubject.next(vendorAction); //next() will feed the value in Subject
              }else{
                this.vendorSubject.error("Error during adding vendor as the response :  "+response);   
              }
            },
            error: error => {
                console.log('Error during adding Vendor ...', error)
            }});
        
    }

    
    updateVendor(vendor: Vendor, cacheIndex: number) { //the component that wants to update something, calls this fn.        
        this.http.patch<Vendor>(Constants.VENDOR_ENDPOINT+vendor.id,vendor,{observe: 'response'}).subscribe({
            next: response => {                           //next() callback
              console.log('update vendor response : '+JSON.stringify(response));
              if(response && response.body){
                 let vendorAction = new VendorActionResponse(response.body,Actions.UPDATE,response.status,response.statusText,cacheIndex);
                 this.vendorSubject.next(vendorAction); //next() will feed the value in Subject
              }else{
                this.vendorSubject.error("Error during adding vendor as the response :  "+response);   
              }
            },
            error: error => {
                console.log('Error during adding Vendor ...', error)
            }});
        
    }

    deleteVendor(vendorId: number, cacheIndex: number) { //the component that wants to update something, calls this fn.        
        this.http.delete(Constants.VENDOR_ENDPOINT+vendorId,{observe: 'response'}).subscribe({
            next: response => {                           //next() callback
              console.log('update vendor response : '+JSON.stringify(response));
              if(response && response.body){
                 let vendorAction = new VendorActionResponse(null,Actions.DELETE,response.status,response.statusText,cacheIndex);
                 this.vendorSubject.next(vendorAction); //next() will feed the value in Subject
              }else{
                this.vendorSubject.error("Error during adding vendor as the response :  "+response);   
              }
            },
            error: error => {
                console.log('Error during adding Vendor ...', error)
            }});
        
    }

    getVendorChangeObservable(): Observable<any> { //the receiver component calls this function         
        return this.vendorSubject.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
    }


    getAllVendors(offset:number): Observable<any> { //the component that wants to update something, calls this fn.
        return this.http.get(Constants.VENDOR_ENDPOINT+"?offset="+offset);
        
    }

    getVendorPage(pageNo: number, pageSize: number, sortBy: String): Observable<Vendor[]>{
      return this.http.get<Vendor[]>(Constants.VENDOR_ENDPOINT+"page?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
    }


}