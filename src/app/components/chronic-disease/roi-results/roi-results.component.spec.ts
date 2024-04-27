import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiResultsComponent } from './roi-results.component';

describe('RoiResultsComponent', () => {
  let component: RoiResultsComponent;
  let fixture: ComponentFixture<RoiResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoiResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoiResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
