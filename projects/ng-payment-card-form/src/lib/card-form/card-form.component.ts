// card-form.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  currentCardBackground?: string;
  cardName = '';
  cardNumber = '';
  cardMonth = '';
  cardYear = '';
  cardCvv = '';
  minCardYear = new Date().getFullYear();
  minCardMonth = 1;
  amexCardMask = '#### ###### #####';
  otherCardMask = '#### #### #### ####';
  isCardFlipped = false;
  focusElementStyle: { border?: string } | null = null;
  isInputFocused = false;

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 12 }, (_, i) => this.minCardYear + i);

  ngOnInit(): void {}

  getCardType(): string {
    const number = this.cardNumber.replace(/\D/g, '');
    const cardPatterns = {
      amex: /^3[47][0-9]{13}$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };
  
    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return 'visa'; // default type
  }
  

  focusInput(): void {
    this.isInputFocused = true;
    this.updateFocusElementStyle();
  }
  
  blurInput(): void {
    this.isInputFocused = false;
    this.updateFocusElementStyle();
  }
  
  private updateFocusElementStyle(): void {
    if (this.isInputFocused) {
      this.focusElementStyle = { border: '2px solid blue' }; // Example
    } else {
      this.focusElementStyle = null;
    }
  }
  

  flipCard(isFlipped: boolean): void {
    this.isCardFlipped = isFlipped;
  }
  

  submitForm(): void {
    console.log('Form submitted:', {
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cardMonth: this.cardMonth,
      cardYear: this.cardYear,
      cardCvv: this.cardCvv
    });
  }
  

 
  getFormattedCardName(): string[] {
    return this.cardName.replace(/\s\s+/g, ' ').split('');
  }
}
