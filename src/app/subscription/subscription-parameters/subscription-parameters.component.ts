import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { first } from 'rxjs';
import { SubscriptionStepsData } from 'src/app/shared/models/subscription-steps-data';
import { SubscriptionParameters } from 'src/app/shared/models/subscription-parameters';

@Component({
  selector: 'app-subscription-parameters',
  templateUrl: './subscription-parameters.component.html',
  styleUrls: ['./subscription-parameters.component.scss'],
})
export class SubscriptionParametersComponent {
  parametersForm?: FormGroup;
  durations = [3, 6, 12];
  gbAmounts = [5, 10, 50];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {
    this.parametersForm = this.fb.group({
      duration: new FormControl(12, [Validators.required]),
      gigabytesAmount: new FormControl(5, [Validators.required]),
      upfrontPayment: new FormControl(false, [Validators.required]),
    });
    this.subscriptionService
      .getSubscriptionStepsData()
      .pipe(first())
      .subscribe({
        next: (data: SubscriptionStepsData | null) => {
          if (data && data.subscriptionParameters) {
            this.parametersForm
              ?.get('duration')
              ?.setValue(data.subscriptionParameters.duration ?? 12);
            this.parametersForm
              ?.get('gigabytesAmount')
              ?.setValue(data.subscriptionParameters.gigabytesAmount ?? 5);
            this.parametersForm
              ?.get('upfrontPayment')
              ?.setValue(data.subscriptionParameters.upfrontPayment ?? false);
          }
        },
      });
  }

  save() {
    this.parametersForm?.markAllAsTouched();
    this.parametersForm?.updateValueAndValidity();
    if (this.parametersForm?.valid) {
      const subscriptionParameters: SubscriptionParameters = {
        duration: this.parametersForm.value.duration,
        gigabytesAmount: this.parametersForm.value.gigabytesAmount,
        upfrontPayment: this.parametersForm.value.upfrontPayment,
      };
      this.subscriptionService.setSubscriptionParameters(
        subscriptionParameters
      );
      this.router.navigate(['subscription/payment-data']);
    }
  }
}
