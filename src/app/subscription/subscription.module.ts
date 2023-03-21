import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionParametersComponent } from './subscription-parameters/subscription-parameters.component';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { ConfirmationDataComponent } from './confirmation-data/confirmation-data.component';
import { SubscriptionStepsComponent } from './subscription-steps/subscription-steps.component';

import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    SubscriptionParametersComponent,
    PaymentDataComponent,
    ConfirmationDataComponent,
    SubscriptionStepsComponent,
  ],
  imports: [CommonModule, SubscriptionRoutingModule, StepsModule],
  exports: [SubscriptionRoutingModule],
})
export class SubscriptionModule {}
