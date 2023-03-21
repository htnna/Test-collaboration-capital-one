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
  subscriptionStepsData?: SubscriptionStepsData | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {
    this.confirmationForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      agreeTermAndConditions: new FormControl(true, [Validators.requiredTrue]),
    });
    this.subscriptionService
      .getSubscriptionStepsData()
      .pipe(first())
      .subscribe({
        next: (data: SubscriptionStepsData | null) => {
          this.subscriptionStepsData = data;
          if (data && data.subscriptionConfirmation) {
            this.confirmationForm
              ?.get('email')
              ?.setValue(data.subscriptionConfirmation.email);
            this.confirmationForm
              ?.get('agreeTermAndConditions')
              ?.setValue(data.subscriptionConfirmation.agreeTermAndConditions);
          }
        },
      });
  }

  openPrevious() {
    this.router.navigate(['subscription/payment-data']);
  }

  save() {
    this.confirmationForm?.markAllAsTouched();
    this.confirmationForm?.updateValueAndValidity();
    if (
      this.confirmationForm?.valid &&
      this.confirmationForm.value.agreeTermAndConditions
    ) {
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
