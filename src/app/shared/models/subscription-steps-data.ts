import { SubscriptionConfirmation } from './subscription-confirmation';
import { SubscriptionParameters } from './subscription-parameters';
import { SubscriptionPayment } from './subscription-payment';

export class SubscriptionStepsData {
  subscriptionParameters?: SubscriptionParameters;
  subscriptionPayment?: SubscriptionPayment;
  subscriptionConfirmation?: SubscriptionConfirmation;
}
