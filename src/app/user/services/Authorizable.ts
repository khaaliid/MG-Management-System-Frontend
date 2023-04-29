export interface Authorizable{

    isAllowed(role:string):boolean;
}