import { TestBed } from '@angular/core/testing';

import { DevicesService } from './devices.service';
import { Device } from '../../../assistant/interfaces/assistant-interfaces';
import { DeviceStatus } from '../../../assistant/enums/assistant.enums';

describe('DevicesService', () => {
  let service: DevicesService<Device>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add data when calling create', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.create(testData);

    expect(service.getAll()).toContain(testData);
  });

  it('should return null for non-existing id when calling getById', () => {
    expect(service.getById('nonexistent')).toBeNull();
  });

  it('should return item when calling getById with an existing id', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.setData([testData]);

    expect(service.getById('1')).toEqual(testData);
  });

  it('should update data when calling update', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.setData([testData]);

    const updatedData: Device = {
      name: 'Updated Device',
      status: DeviceStatus.INVALID,
      id: '',
    };
    service.update('1', updatedData);

    expect(service.getAll()[0].name).toBe('Updated Device');
    expect(service.getAll()[0].status).toBe(DeviceStatus.INVALID);
  });

  it('should throw an error when calling update with invalid data', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.setData([testData]);

    expect(() => service.update('1', null as any)).toThrow(
      'Please specify a valid data'
    );
  });

  it('should delete data when calling delete', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.setData([testData]);

    service.delete('1');

    expect(service.getAll()).toEqual([]);
  });

  it('should not delete data when calling delete with a nonexistent id', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.setData([testData]);

    service.delete('nonexistent');

    expect(service.getAll()).toContain(testData);
  });

  it('should return all data when calling getAll', () => {
    const testData1: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    const testData2: Device = {
      id: '2',
      name: 'Device 2',
      status: DeviceStatus.INVALID,
    };
    service.setData([testData1, testData2]);

    const allData = service.getAll();

    expect(allData.length).toBe(2);
    expect(allData).toContain(testData1);
    expect(allData).toContain(testData2);
  });

  it('should set data when calling setData', () => {
    const testData: Device = {
      id: '1',
      name: 'Device 1',
      status: DeviceStatus.VALID,
    };
    service.setData([testData]);

    expect(service.getAll()).toEqual([testData]);
  });
});
