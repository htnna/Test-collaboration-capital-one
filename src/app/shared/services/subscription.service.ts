import { Injectable, OnDestroy } from '@angular/core';
import { SubscriptionPlan } from '../models/subscription-plan';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriptionStepsData } from '../models/subscription-steps-data';
import { SubscriptionParameters } from '../models/subscription-parameters';
import { SubscriptionPayment } from '../models/subscription-payment';
import { SubscriptionConfirmation } from '../models/subscription-confirmation';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService implements OnDestroy {
  subscriptionPlans: SubscriptionPlan[] = [];
  subscriptionStepsData$: BehaviorSubject<SubscriptionStepsData | null> =
    new BehaviorSubject<SubscriptionStepsData | null>(null);

  constructor() {
    this.subscriptionPlans = [
      {
        durationMonths: 3,
        priceUsdPerGb: 3,
      },
      {
        durationMonths: 6,
        priceUsdPerGb: 2.5,
      },
      {
        durationMonths: 12,
        priceUsdPerGb: 2,
      },
    ];
  }

  private getSubscriptionStepsDataValue() {
    let subscriptionStepsData = this.subscriptionStepsData$.value;
    if (!subscriptionStepsData) {
      subscriptionStepsData = {};
    }
    return subscriptionStepsData;
  }

  public setSubscriptionParameters(
    subscriptionParameters: SubscriptionParameters
  ) {
    let subscriptionStepsData = this.getSubscriptionStepsDataValue();
    subscriptionStepsData.subscriptionParameters = subscriptionParameters;
    this.subscriptionStepsData$.next(subscriptionStepsData);
  }

  public setSubscriptionPayment(subscriptionPayment: SubscriptionPayment) {
    let subscriptionStepsData = this.getSubscriptionStepsDataValue();
    subscriptionStepsData.subscriptionPayment = subscriptionPayment;
    this.subscriptionStepsData$.next(subscriptionStepsData);
  }

  public setSubscriptionConfirmation(
    subscriptionConfirmation: SubscriptionConfirmation
  ) {
    let subscriptionStepsData = this.getSubscriptionStepsDataValue();
    subscriptionStepsData.subscriptionConfirmation = subscriptionConfirmation;
    this.subscriptionStepsData$.next(subscriptionStepsData);
  }

  public resetSubscriptionStepsData() {
    this.subscriptionStepsData$.next(null);
  }

  public getPricePerGb() {
    let value: number | undefined = 0;
    let subscriptionStepsData: SubscriptionStepsData =
      this.getSubscriptionStepsDataValue();
    if (subscriptionStepsData.subscriptionParameters) {
      value = this.subscriptionPlans.find(
        (p) =>
          p.durationMonths ===
          subscriptionStepsData.subscriptionParameters?.duration
      )?.priceUsdPerGb;
    }
    return value ?? 0;
  }

  public getTotalPrice() {
    let value: number | undefined = 0;
    let subscriptionStepsData: SubscriptionStepsData =
      this.getSubscriptionStepsDataValue();
    if (subscriptionStepsData.subscriptionParameters) {
      value =
        this.getPricePerGb() *
        (subscriptionStepsData.subscriptionParameters?.gigabytesAmount ?? 0);
      if (subscriptionStepsData.subscriptionParameters?.upfrontPayment) {
        value = value * 0.9;
      }
    }
    return value;
  }

  public getSubscriptionStepsData(): Observable<SubscriptionStepsData | null> {
    return this.subscriptionStepsData$.asObservable();
  }

  ngOnDestroy(): void {
    this.subscriptionStepsData$.complete();
  }
}
