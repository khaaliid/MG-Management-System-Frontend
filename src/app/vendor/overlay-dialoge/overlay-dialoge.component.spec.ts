import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayDialogeComponent } from './overlay-dialoge.component';

describe('OverlayDialogeComponent', () => {
  let component: OverlayDialogeComponent;
  let fixture: ComponentFixture<OverlayDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
