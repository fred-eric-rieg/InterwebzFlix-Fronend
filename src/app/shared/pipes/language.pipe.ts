import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language',
  standalone: true
})
export class LanguagePipe implements PipeTransform {

  transform(value: number[] | number | null): string[] {
    if (value === null) {
      return [];
    }
      
    if (typeof value === 'number') {
      return [this.getNumberAsString(value)];
    } else {
      return value.map((item) => this.getNumberAsString(item));
    }
  }


  private getNumberAsString(value: number): string {
    switch (value) {
      case 1:
        return 'English';
      case 2:
        return 'German';
      case 3:
        return 'French';
      case 4:
        return 'Spanish';
      case 5:
        return 'Italian';
      case 6:
        return 'Russian';
      case 7:
        return 'Japanese';
      case 8:
        return 'Chinese';
      case 9:
        return 'Hindi';
      case 10:
        return 'Arabic';
      default:
        return 'Unknown';
    }
  }

}
