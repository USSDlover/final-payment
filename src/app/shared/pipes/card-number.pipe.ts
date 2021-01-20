import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(val: string | number): string {
    const parts = [];
    let value: string;

    if (typeof val === 'number') {
      value = val.toString();
    } else {
      value = val;
    }

    parts.push(value.slice(0, 4));
    parts.push(value.slice(4, 8));
    parts.push(value.slice(8, 12));
    parts.push(value.slice(12, 16));
    return parts.join(' ');
  }

}
