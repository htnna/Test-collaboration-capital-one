import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationDataComponent } from './confirmation-data/confirmation-data.component';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { SubscriptionParametersComponent } from './subscription-parameters/subscription-parameters.component';
import { SubscriptionStepsComponent } from './subscription-steps/subscription-steps.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/subscription',
    pathMatch: 'full',
  },
  {
    path: 'subscription',
    component: SubscriptionStepsComponent,
    children: [
      {
        path: 'subscription-parameters',
        component: SubscriptionParametersComponent,
      },
      {
        path: 'payment-data',
        component: PaymentDataComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
