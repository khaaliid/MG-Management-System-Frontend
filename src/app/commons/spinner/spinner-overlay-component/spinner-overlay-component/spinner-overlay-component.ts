import { Component, Input, OnInit } from '@angular/core';
import { SpinnerOverlayService } from '../../services/spinner-overlay.service';

@Component({
  selector: 'app-spinner-overlay-component',
  templateUrl: './spinner-overlay-component.html',
  styleUrls: ['./spinner-overlay-component.css']
})
export class SpinnerOverlayComponent implements OnInit {
  
  show:boolean = false;

  constructor(private spinnerOverlayService:SpinnerOverlayService) { }

  ngOnInit(): void {
    this.spinnerOverlayService.loading$.subscribe(loading=>{
      this.show = loading;
    })
  }

}
