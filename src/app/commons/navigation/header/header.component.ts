import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/services/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean=false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event)=>{
    this.isAuthenticated = this.authService.isSignedIn();
    });
  }

  onToggleSidenav(){
    console.log("Toggle !");
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
