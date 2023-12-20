import { TestBed } from '@angular/core/testing';

import { ProgrammersService } from './programmers.service';
import { Programmer } from '../../../assistant/interfaces/assistant-interfaces';

describe('ProgrammersService', () => {
  let service: ProgrammersService<Programmer>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null for non-existing id when calling getById', () => {
    expect(service.getById('nonexistent')).toBeNull();
  });

  it('should return item when calling getById with an existing id', () => {
    const testData: Programmer = { id: '1', name: 'Programmer 1' };
    service.setData([testData]);

    expect(service.getById('1')).toEqual(testData);
  });

  it('should update data when calling update', () => {
    const testData: Programmer = { id: '1', name: 'Programmer 1' };
    service.setData([testData]);

    const updatedData: Programmer = {
      name: 'Updated Programmer',
      id: '',
    };
    service.update('1', updatedData);

    expect(service.getAll()[0].name).toBe('Updated Programmer');
  });

  it('should throw an error when calling update with invalid data', () => {
    const testData: Programmer = { id: '1', name: 'Programmer 1' };
    service.setData([testData]);

    expect(() => service.update('1', null as any)).toThrow(
      'Please specify a valid data'
    );
  });

  it('should delete data when calling delete', () => {
    const testData: Programmer = { id: '1', name: 'Programmer 1' };
    service.setData([testData]);

    service.delete('1');

    expect(service.getAll()).toEqual([]);
  });

  it('should not delete data when calling delete with a nonexistent id', () => {
    const testData: Programmer = { id: '1', name: 'Programmer 1' };
    service.setData([testData]);

    service.delete('nonexistent');

    expect(service.getAll()).toContain(testData);
  });

  it('should return all data when calling getAll', () => {
    const testData1: Programmer = { id: '1', name: 'Programmer 1' };
    const testData2: Programmer = { id: '2', name: 'Programmer 2' };
    service.setData([testData1, testData2]);

    const allData = service.getAll();

    expect(allData.length).toBe(2);
    expect(allData).toContain(testData1);
    expect(allData).toContain(testData2);
  });

  it('should set data when calling setData', () => {
    const testData: Programmer = { id: '1', name: 'Programmer 1' };
    service.setData([testData]);

    expect(service.getAll()).toEqual([testData]);
  });
});
