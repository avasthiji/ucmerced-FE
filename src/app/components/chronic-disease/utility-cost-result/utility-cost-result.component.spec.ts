import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityCostResultComponent } from './utility-cost-result.component';

describe('UtilityCostResultComponent', () => {
  let component: UtilityCostResultComponent;
  let fixture: ComponentFixture<UtilityCostResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityCostResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityCostResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
