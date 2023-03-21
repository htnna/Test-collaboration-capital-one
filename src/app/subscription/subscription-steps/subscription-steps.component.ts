import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-subscription-steps',
  templateUrl: './subscription-steps.component.html',
  styleUrls: ['./subscription-steps.component.scss'],
})
export class SubscriptionStepsComponent implements OnInit {
  items?: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Subscription parameters',
        routerLink: 'subscription-parameters',
      },
      {
        label: 'Payment data',
        routerLink: 'payment-data',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
  }
}
