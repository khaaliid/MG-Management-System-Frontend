export class ModuleDto{
    
    set name(name:string){
        this.name=name;
    }
    get name(){
        return this.name;
    }

    set allowed_roles(allowed_roles:string[]){
        this.allowed_roles=allowed_roles;
    }
    get allowed_roles(){
        return this.allowed_roles
    }
}