import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { SubscriptionPayment } from 'src/app/shared/models/subscription-payment';
import { SubscriptionStepsData } from 'src/app/shared/models/subscription-steps-data';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.scss'],
})
export class PaymentDataComponent {
  paymentForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {
    this.paymentForm = this.fb.group({
      creditCardNumber: new FormControl(null, [Validators.required]),
      creditCardExpirationDate: new FormControl('', [Validators.required]),
      creditCardSecurityCode: new FormControl('', [Validators.required]),
    });
    this.subscriptionService
      .getSubscriptionStepsData()
      .pipe(first())
      .subscribe({
        next: (data: SubscriptionStepsData | null) => {
          if (data && data.subscriptionPayment) {
            this.paymentForm
              ?.get('creditCardNumber')
              ?.setValue(data.subscriptionPayment.creditCardNumber);
            this.paymentForm
              ?.get('creditCardExpirationDate')
              ?.setValue(data.subscriptionPayment.creditCardExpirationDate);
            this.paymentForm
              ?.get('creditCardSecurityCode')
              ?.setValue(data.subscriptionPayment.creditCardSecurityCode);
          }
        },
      });
  }

  openPrevious() {
    this.router.navigate(['subscription/subscription-parameters']);
  }

  save() {
    this.paymentForm?.markAllAsTouched();
    this.paymentForm?.updateValueAndValidity();
    if (this.paymentForm?.valid) {
      const subscriptionPayment: SubscriptionPayment = {
        creditCardNumber: this.paymentForm.value.creditCardNumber,
        creditCardExpirationDate:
          this.paymentForm.value.creditCardExpirationDate,
        creditCardSecurityCode: this.paymentForm.value.creditCardSecurityCode,
      };
      this.subscriptionService.setSubscriptionPayment(subscriptionPayment);
      this.router.navigate(['subscription/confirmation']);
    }
  }
}
