export interface Repository<T extends { id: string }> {
  getById(id: string): T | null;
  update(id: string, data: T): T;
  delete(id: string): void;
  getAll(): T[];
}
