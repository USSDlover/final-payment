import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, RoutedComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {CoreModule} from './core/core.module';
import {storeCardReducer} from './purchase/store/store-card.reducer';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardNumberDirective } from './purchase/directives/card-number.directive';
import { ExpirationDateDirective } from './purchase/directives/expiration-date.directive';
import { CcvDirective } from './purchase/directives/ccv.directive';
import { AmountDirective } from './purchase/directives/amount.directive';

@NgModule({
  declarations: [
    AppComponent,
    ...RoutedComponents,
    CardNumberDirective,
    ExpirationDateDirective,
    CcvDirective,
    AmountDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    StoreModule.forRoot({ cards: storeCardReducer }),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
