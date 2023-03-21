import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionStepsComponent } from './subscription-steps.component';

describe('SubscriptionStepsComponent', () => {
  let component: SubscriptionStepsComponent;
  let fixture: ComponentFixture<SubscriptionStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
