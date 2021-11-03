import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especializaciones',
})
export class EspecializacionesPipe implements PipeTransform {
  transform(value: any): unknown {
    switch (value) {
      case 'medicina':
        return 'medicina general';
    }
    return value;
  }
}
