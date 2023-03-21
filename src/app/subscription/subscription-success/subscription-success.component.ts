import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.scss'],
})
export class SubscriptionSuccessComponent {
  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  sendAnotherSubscription() {
    this.subscriptionService.resetSubscriptionStepsData();
    this.router.navigate(['subscription/subscription-parameters']);
  }
}
