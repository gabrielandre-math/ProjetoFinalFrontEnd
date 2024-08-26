import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate',
  standalone: true  // Torna o pipe standalone
})
export class StringToDatePipe implements PipeTransform {
  transform(value: string | Date): Date | null {
    if (!value || value instanceof Date) return value as Date;

    if (typeof value === 'string') {
      const [day, month, year] = value.split('/');
      return new Date(`${year}-${month}-${day}`);
    }

    return null;
  }
}
