import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/commons/Constants';
import { ModuleDto } from 'src/app/commons/dtos/ModuleDto';
import { Authorizable } from 'src/app/user/services/Authorizable';
import { AuthService } from 'src/app/user/services/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, Authorizable {

  roles: string[]=[];
  processedRoles: Map<string,string> = new Map<string,string>();
  modules: ModuleDto[]=Constants.modules;
  constructor(private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.roles = this.authService.getRoles();
    this.processedRoles = this.authService.getAuthoritiesMap();
  }

  openKeycloack(){
    window.open("http://localhost:8080/admin", "_blank");
  }

  isAllowed(module:string):boolean{
    return false;
  }

  
}

