// ng-payment-card-form/src/lib/credit-card-form.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFormComponent } from './card-form/card-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [CardFormComponent] // Ensure the component is exported
})
export class CreditCardFormModule { }
