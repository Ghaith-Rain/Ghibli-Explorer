import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  /**
   * Truncates text to a specified length and adds ellipsis
   * @param value - The text to truncate
   * @param limit - The maximum length (default: 100)
   * @returns Truncated text with ellipsis if needed
   */
  transform(value: string, limit: number = 100): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit).trim() + '...';
  }
}
