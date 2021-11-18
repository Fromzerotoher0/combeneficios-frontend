import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calificacion',
})
export class CalificacionPipe implements PipeTransform {
  transform(value: any): unknown {
    switch (value) {
      case null:
        return 'sin calificaciones';
    }
    return value;
  }
}
