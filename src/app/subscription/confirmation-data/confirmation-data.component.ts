import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { SubscriptionConfirmation } from 'src/app/shared/models/subscription-confirmation';
import { SubscriptionStepsData } from 'src/app/shared/models/subscription-steps-data';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-confirmation-data',
  templateUrl: './confirmation-data.component.html',
  styleUrls: ['./confirmation-data.component.scss'],
})
export class ConfirmationDataComponent {
  confirmationForm?: FormGroup;
  pricePerGb: number = 0;
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {
    this.confirmationForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      agreeTermAndConditions: new FormControl(true, [Validators.required]),
    });
    this.subscriptionService
      .getSubscriptionStepsData()
      .pipe(first())
      .subscribe({
        next: (data: SubscriptionStepsData | null) => {
          if (data && data.subscriptionConfirmation) {
            this.confirmationForm
              ?.get('email')
              ?.setValue(data.subscriptionConfirmation.email);
            this.confirmationForm
              ?.get('agreeTermAndConditions')
              ?.setValue(data.subscriptionConfirmation.agreeTermAndConditions);
          }
          this.pricePerGb = this.subscriptionService.getPricePerGb();
          this.totalPrice = this.subscriptionService.getTotalPrice();
        },
      });
  }

  openPrevious() {
    this.router.navigate(['subscription/payment-data']);
  }

  save() {
    this.confirmationForm?.markAllAsTouched();
    this.confirmationForm?.updateValueAndValidity();
    if (this.confirmationForm?.valid) {
      const subscriptionConfirmation: SubscriptionConfirmation = {
        email: this.confirmationForm.value.email,
        agreeTermAndConditions:
          this.confirmationForm.value.agreeTermAndConditions,
      };
      this.subscriptionService.setSubscriptionConfirmation(
        subscriptionConfirmation
      );
      this.router.navigate(['subscription-success']);
    }
  }
}
