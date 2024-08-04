// card-number-mask.directive.ts
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCardNumberMask]'
})
export class CardNumberMaskDirective {
  private readonly AMEX_CARD_MASK = '#### ###### #####';
  private readonly OTHER_CARD_MASK = '#### #### #### ####';

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length) {
      input.value = this.formatCardNumber(value);
    }
  }

  private formatCardNumber(value: string): string {
    const cardType = this.getCardType(value);
    switch (cardType) {
      case 'amex':
        return this.applyMask(value, this.AMEX_CARD_MASK);
      case 'visa':
      case 'mastercard':
      case 'discover':
        return this.applyMask(value, this.OTHER_CARD_MASK);
      default:
        return value; // No mask applied if card type is unknown
    }
  }

  private applyMask(value: string, mask: string): string {
    let formattedValue = '';
    let maskIndex = 0;

    for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
      if (mask[maskIndex] === '#') {
        formattedValue += value[i];
      } else {
        formattedValue += mask[maskIndex];
        i--; // Adjust index to stay in sync with value
      }
      maskIndex++;
    }

    return formattedValue;
  }

  private getCardType(number: string): string {
    const patterns = {
      amex: /^3[47][0-9]{13}$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return 'unknown'; // Default type
  }
}
