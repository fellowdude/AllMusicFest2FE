import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftpad'
})
export class LeftPadPipe implements PipeTransform {

  transform(item: any, length: number = 8, padStyle: string = '0'): string {
    return (item).toString().padStart( length, padStyle );
  }

}
