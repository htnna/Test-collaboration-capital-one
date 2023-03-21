import { Component, Input } from '@angular/core';
import { SubscriptionStepsData } from 'src/app/shared/models/subscription-steps-data';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-subscription-selected',
  templateUrl: './subscription-selected.component.html',
  styleUrls: ['./subscription-selected.component.scss'],
})
export class SubscriptionSelectedComponent {
  @Input() subscriptionStepsData?: SubscriptionStepsData;
  @Input() showPricePerGb = false;

  constructor(private subscriptionService: SubscriptionService) {}

  get finalPrice() {
    return this.subscriptionService.getTotalPrice();
  }

  get pricePerGb() {
    return this.subscriptionService.getPricePerGb();
  }
}
