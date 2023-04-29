import { Component, OnInit, Input, Inject } from '@angular/core';
import { Product } from '../dtos/Product';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { productCrudService } from '../services/ProductCrudService';
import { ProductActionResponse } from '../dtos/ProductAction';

@Component({
  selector: 'app-create-product-component',
  templateUrl: './create-product-component.component.html',
  styleUrls: ['./create-product-component.component.css']
})
export class CreateProductComponent implements OnInit {

  @Input() product!: Product|null;
  productCachedIndx: number=-1;
  formDirective!: FormGroupDirective;
  productCreationForm = this.formBuilder.group({
    productId: new FormControl(''),
    productName: new FormControl('', [Validators.required])
  });

  constructor(
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<CreateProductComponent>,
  private productCrudService: productCrudService,
    @Inject(MAT_DIALOG_DATA) public data: ProductActionResponse) 
  {
    
    this.product = data["product"];
    this.productCachedIndx = data["cachedIndex"];
   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  


  ngOnInit() {
    if(this.product){
      this.productCreationForm.controls["productName"].setValue(this.product.productName);
      this.productCreationForm.controls["productId"].setValue(this.product.productId);
    }
  }

  
  addOrUpdateProduct(event:any, productIndx:number){
    
    console.warn('Your product obj is :', this.productCreationForm.value);  
    if(this.productCreationForm.value["productId"]){
      this.productCrudService.updateproduct(this.productCreationForm.value, productIndx);
    }else{
      this.productCrudService.addproduct(this.productCreationForm.value);
    }
    event.currentTarget.reset();
    this.productCreationForm.reset();
    this.dialogRef.close();
  }

  public validationError = (controlName: string, errorName: string) =>{
    return this.productCreationForm.controls[controlName].hasError(errorName);
    }

  

}
