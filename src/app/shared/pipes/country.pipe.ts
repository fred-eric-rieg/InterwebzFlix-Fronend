import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country',
  standalone: true
})
export class CountryPipe implements PipeTransform {

  transform(value: number | null): string | null {
    if (value === null) {
      return null;
    }

    switch (value) {
      case 101:
        return 'USA';
      case 102:
        return 'Germany';
      case 103:
        return 'Türkiye';
      default:
        return 'Unknown';
    }
  }

}
