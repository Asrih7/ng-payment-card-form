import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCvvMask]'
})
export class CvvMaskDirective {
  private readonly MAX_LENGTH = 4;

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    this.formatValue();
  }

  private formatValue(): void {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > this.MAX_LENGTH) {
      this.renderer.setProperty(input, 'value', value.slice(0, this.MAX_LENGTH)); // Limit the length
    } else {
      this.renderer.setProperty(input, 'value', value); // Set the formatted value
    }
  }
}
