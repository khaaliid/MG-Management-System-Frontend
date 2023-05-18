import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesManagementComponent } from './product-categories-management.component';

describe('ProductCategoriesManagementComponent', () => {
  let component: ProductCategoriesManagementComponent;
  let fixture: ComponentFixture<ProductCategoriesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoriesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
