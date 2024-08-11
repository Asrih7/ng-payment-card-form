import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  currentCardBackground: string = '';
  cardName = '';
  cardNumber = '';
  cardCvv = '';
  minCardYear = new Date().getFullYear();
  isCardFlipped = false;
  focusElementStyle: { border?: string } | null = null;
  isInputFocused = false;
  randomBackgrounds: boolean = true;
  backgroundImage: string | null = null;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 12 }, (_, i) => this.minCardYear + i);
  cardYear: number | null = null;
  cardMonth: string = '';
  cardType: string = '';
  cardNumberPattern: string = '';

  ngOnInit(): void {
    this.updateCardBackground();
    this.updateCardType();
    this.updateCardNumberPattern();
    this.cardNumber = this.getMaskForCardType(''); 
  }
  get minCardMonth(): number {
    return this.cardYear === this.currentYear ? this.currentMonth : 1;
  }

  updateCardType(): void {
    this.cardType = this.getCardType(); 
    this.updateCardNumberPattern(); 
  }

  getCardType(): string {
    const number = this.cardNumber.replace(/\D/g, '');
    const cardPatterns = {
      amex: /^3[47][0-9]{13}$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      dinersclub: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}$/,
      jcb: /^35(2[89]|[3-8])/,
      unionpay: /^62/,
      troy: /^9792/
    };

    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return ''; 
  }

  formatCardNumber(): void {
    let value = this.cardNumber.replace(/\D/g, ''); 
    const cardType = this.getCardType();
    let formattedValue = '';
    let mask = this.getMaskForCardType(cardType);
    let maxLength = mask.replace(/[^#]/g, '').length;
  
    if (value.length > maxLength) {
      value = value.substring(0, maxLength);
    }
  
    let maskIndex = 0;
    for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
      if (mask[maskIndex] === '#') {
        formattedValue += value[i];
      } else {
        formattedValue += mask[maskIndex];
        i--; 
      }
      maskIndex++;
    }
    this.cardNumber = formattedValue;
    this.updateCardType(); 
    this.updateCardNumberPattern(); 
  }

  getMaskForCardType(cardType: string): string {
    switch (cardType) {
      case 'amex':
        return '#### ###### #####';
      case 'dinersclub':
        return '#### ###### ####';
      default:
        return '#### #### #### ####'; 
    }
  }

  updateCardNumberPattern(): void {
    this.cardNumberPattern = this.getMaskForCardType(this.cardType).replace(/#/g, '_');
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
    this.focusElementStyle = this.isInputFocused ? { border: '2px solid blue' } : null;
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

  updateCardBackground(): void {
    const baseUrl = 'https://raw.githubusercontent.com/Asrih7/ng-payment-card-form/main/projects/ng-payment-card-form/src/assets/images/';
    
    if (this.randomBackgrounds && !this.backgroundImage) {
      const random = Math.floor(Math.random() * 25) + 1;
      this.currentCardBackground = `${baseUrl}${random}.jpeg`;
    } else if (this.backgroundImage) {
      this.currentCardBackground = this.backgroundImage;
    } else {
      this.currentCardBackground = '';
    }
  }

  getCardTypeImageUrl(): string {
    const baseUrl = 'https://raw.githubusercontent.com/Asrih7/ng-payment-card-form/main/projects/ng-payment-card-form/src/assets/images/';
    return this.cardType ? `${baseUrl}${this.cardType}.png` : `${baseUrl}visa.png`;
  }
}
