import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core'; 
@Injectable() 
export class Constants {
public static readonly API_ENDPOINT_BASE: string = 'http://localhost:8080/'; 
public static TitleOfSite: string = " Making API calls the Right Way by Monica"; 


/**
 * Vendor - 
 */

public static readonly VENDOR_ENDPOINT_BASE = Constants.API_ENDPOINT_BASE+"mg/vendor/";
} 