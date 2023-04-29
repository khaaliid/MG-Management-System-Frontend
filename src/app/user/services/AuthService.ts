import { Injectable } from "@angular/core";
import { Constants } from "src/app/commons/Constants";

@Injectable()
export class AuthService{

    constructor(){

    }

    isSignedIn(){
        if(sessionStorage.getItem(Constants.Bearer_token)){
            return true;
        }
        return false;
    }

    logout(){
        sessionStorage.clear();
    }

    setRoles(roles: string){
        sessionStorage.setItem(Constants.user_roles,roles);
    }

    getRoles():string[]{
        let rolesStr: string = sessionStorage.getItem(Constants.user_roles) as string;
        return  rolesStr.split(",");
    }

    getBearerToken(){
        sessionStorage.getItem(Constants.Bearer_token);
    }

    setBearerToken(token: string){
        sessionStorage.setItem(Constants.Bearer_token,token);
    }

    getAuthoritiesMap():Map<string,string> {
        let roleNameArr;
        let processedRoles: Map<string,string>=new Map<string,string>();
        this.getRoles().forEach(role => {
          roleNameArr = role.split("_");
          if(roleNameArr.length >=3 && roleNameArr[0]=="mg"){
            
            processedRoles.set(roleNameArr[1],roleNameArr[2]);
    
          }
        });
       return processedRoles;
      }
}