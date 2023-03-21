import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationDataComponent } from './confirmation-data/confirmation-data.component';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { SubscriptionParametersComponent } from './subscription-parameters/subscription-parameters.component';
import { SubscriptionStepsComponent } from './subscription-steps/subscription-steps.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/subscription/subscription-parameters',
    pathMatch: 'full',
  },
  {
    path: 'subscription',
    component: SubscriptionStepsComponent,
    children: [
      {
        path: '',
        redirectTo: '/subscription/subscription-parameters',
        pathMatch: 'full',
      },
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
  {
    path: 'subscription-success',
    component: SubscriptionSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
