import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/user/services/AuthService';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective  implements OnInit {

  private currentRoles!:string[];
  private permissions!:string[];
  private logicalOp:string="OR";

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    
    this.currentRoles = this.authService.getRoles();
  }


  ngOnInit() {
    
    
  }

  @Input()
  set hasPermissionOp(permop:string) {
    this.logicalOp = permop;
  }

  @Input()
  set hasPermission(val:string []) {
    this.permissions = val;
    this.updateView();
  }



  private updateView() {
    if (this.checkPermission()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;
    console.log("XXX=>"+this.currentRoles);
    if (this.currentRoles) {
      for (const checkPermission of this.permissions) {  
           
        const permissionFound = this.currentRoles.find(x => x.toUpperCase() === checkPermission.toUpperCase());
        if(permissionFound){
          hasPermission=true;
          break;
        }
        
      }
    }

    return hasPermission;
  }

}
