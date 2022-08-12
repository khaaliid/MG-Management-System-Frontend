import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendor } from '../dtos/Vendor';
import { VendorActionResponse } from '../dtos/VendorAction';
import { VendorCrudService } from '../services/VendorCrudService';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css']
})
export class CreateVendorComponent implements OnInit {

  
  @Input() vendor!: Vendor;
  vendorCachedIndx: number=-1;
  formDirective!: FormGroupDirective;
  vendorCreationForm = this.formBuilder.group({
    id: new FormControl(''),
    vendorName: new FormControl('', [Validators.required]),
    vendorAddress: new FormControl('', [Validators.required])
  });

  constructor(
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<CreateVendorComponent>,
  private vendorCrudService: VendorCrudService,
    @Inject(MAT_DIALOG_DATA) public data: VendorActionResponse) 
  {
    
    this.vendor = data["vendor"]!;
    this.vendorCachedIndx = data["cachedIndex"];
   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  


  ngOnInit() {
    if(this.vendor){
      this.vendorCreationForm.controls["vendorName"].setValue(this.vendor.vendorName);
      this.vendorCreationForm.controls["vendorAddress"].setValue(this.vendor.vendorAddress);
      this.vendorCreationForm.controls["id"].setValue(this.vendor.id);
    }
  }

  
  addOrUpdateVendor(event:any, vendorIndx:number){
    
    console.warn('Your vendor obj is :', this.vendorCreationForm.value);  
    if(this.vendorCreationForm.value["id"]){
      this.vendorCrudService.updateVendor(this.vendorCreationForm.value, vendorIndx);
    }else{
      this.vendorCrudService.addVendor(this.vendorCreationForm.value);
    }
    event.currentTarget.reset();
    this.vendorCreationForm.reset();
    this.dialogRef.close();
  }

  public validationError = (controlName: string, errorName: string) =>{
    return this.vendorCreationForm.controls[controlName].hasError(errorName);
    }

  
}
