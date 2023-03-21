import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SubscriptionModule } from './subscription/subscription.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [AppComponent, TermsAndConditionsComponent],
  imports: [BrowserModule, AppRoutingModule, SubscriptionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
