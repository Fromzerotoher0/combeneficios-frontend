import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentesco',
})
export class ParentescoPipe implements PipeTransform {
  transform(value: any): unknown {
    switch (value) {
      case 1:
        return 'titular';
      case 2:
        return 'esposo/a';
      case 3:
        return 'hijo';
      case 4:
        return 'hija';
      case 5:
        return 'padre';
      case 6:
        return 'madre';
    }
    return true;
  }
}
