import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionParametersComponent } from './subscription-parameters/subscription-parameters.component';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { ConfirmationDataComponent } from './confirmation-data/confirmation-data.component';
import { SubscriptionStepsComponent } from './subscription-steps/subscription-steps.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    SubscriptionParametersComponent,
    PaymentDataComponent,
    ConfirmationDataComponent,
    SubscriptionStepsComponent,
    SubscriptionSuccessComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StepsModule,
    RadioButtonModule,
    InputSwitchModule,
    ButtonModule,
    PasswordModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
  ],
  exports: [SubscriptionRoutingModule],
})
export class SubscriptionModule {}
