import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityCostComponent } from './utility-cost.component';

describe('UtilityCostComponent', () => {
  let component: UtilityCostComponent;
  let fixture: ComponentFixture<UtilityCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
