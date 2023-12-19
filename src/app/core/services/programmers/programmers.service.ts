import { Injectable } from '@angular/core';
import { Repository } from '../../interfaces/repository-service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProgrammersService<T extends { id: string }>
  implements Repository<T>
{
  private data: T[] = [];

  getById(id: string): T | null {
    const item = this.data.find((x) => x.id === id);
    return item ? { ...item } : null;
  }

  update(id: string, data: T): T {
    if (data) {
      const itemIndex = this.data.findIndex((x) => x.id === id);

      if (itemIndex !== -1) {
        const updatedItem = Object.assign({}, this.data[itemIndex], data);
        this.data[itemIndex] = updatedItem;
        return { ...updatedItem };
      }
    }
    throw 'Please specify a valid data';
  }

  delete(id: string): void {
    const itemIndex = this.data.findIndex((x) => x.id === id);

    if (itemIndex !== -1) {
      this.data.splice(itemIndex, 1);
    }
  }

  getAll(): T[] {
    return [...this.data];
  }

  setData(data: T[]) {
    this.data = data;
  }
}
