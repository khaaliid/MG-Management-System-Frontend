import { Injectable } from '@angular/core'; 
import { ModuleDto } from './dtos/ModuleDto';
@Injectable() 
export class Constants {
public static readonly BACKEND_HOST = 'localhost';
public static readonly VENDOR_API_ENDPOINT_BASE: string = 'http://'+Constants.BACKEND_HOST+':8106/mg/vendor/'; 
public static readonly USER_API_ENDPOINT_BASE : string  = 'http://'+Constants.BACKEND_HOST+':8107/mg/user/';
public static readonly PRODUCT_API_ENDPOINT_BASE : string  = 'http://'+Constants.BACKEND_HOST+':8108/mg/product/'
public static TitleOfSite: string = " MG managemet system"; 
public static Bearer_token: string = "us_4dhbsafr_t";
public static user_roles: string = "us_4dhbsafr_rs";
public static modules: ModuleDto[] = [
    {
        "name":"vendor",
        "allowed_roles":["super_admin","vendor_read","vendor_write","vendor_admin"]
    },
    {
        "name":"product",
        "allowed_roles":["super_admin","product_read","product_write","product_admin"]

    },
    {
        "name":"POS",
        "allowed_roles":["super_admin","POS_read","POS_write","POS_admin"]

    }
    ];


/**
 * Vendor - 
 */

public static readonly VENDOR_ENDPOINT = Constants.VENDOR_API_ENDPOINT_BASE;

/**
 * uSER
 */
public static readonly GET_BEARER_ENDPOINT = Constants.USER_API_ENDPOINT_BASE+ "login";
} 