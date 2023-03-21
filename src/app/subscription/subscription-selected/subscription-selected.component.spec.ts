import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSelectedComponent } from './subscription-selected.component';

describe('SubscriptionSelectedComponent', () => {
  let component: SubscriptionSelectedComponent;
  let fixture: ComponentFixture<SubscriptionSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
