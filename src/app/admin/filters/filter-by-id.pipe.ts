import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {

  transform(users: any[], id?: number): any[] {
    if (!users) {
      return [];
    }

    if (id === undefined || id === null || id === 0) {
      return users; 
    }

    id = Number(id);

    return users.filter(user => user.id === id);
  }


}
