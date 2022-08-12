import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsViewerComponent } from './vendors-viewer.component';

describe('VendorsViewerComponent', () => {
  let component: VendorsViewerComponent;
  let fixture: ComponentFixture<VendorsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
