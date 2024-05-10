import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppNumber]'
})
export class AppNumberDirective {

  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^0-9]*/g, '');
    if ( initialValue !== event.target.value) {
      event.stopPropagation();
    }
  }

}

