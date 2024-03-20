import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeYouBeginComponent } from './before-you-begin.component';

describe('BeforeYouBeginComponent', () => {
  let component: BeforeYouBeginComponent;
  let fixture: ComponentFixture<BeforeYouBeginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeforeYouBeginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeYouBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
