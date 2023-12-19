import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device, Programmer } from '../../interfaces/assistant-interfaces';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { DeviceStatus } from '../../enums/assistant.enums';
import { DeviceDto } from '../../models/device.model';
@Injectable({
  providedIn: 'root',
})
export class AssistantApiService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  canceled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>('assets/devices.json');
  }

  getProgrammers(): Observable<Programmer[]> {
    return this.http.get<Programmer[]>('assets/programmers.json');
  }

  invalidateDevice(device: Device): Observable<Device> {
    // Assuming an endpoint that will invalidate the device and return entity
    return of({ ...device, status: DeviceStatus.INVALID }).pipe(delay(3000));
  }

  duplicateDevice(device: Device): Observable<Device> {
    // Assuming an endpoint that will update device with new name, enable it and return new entity
    return of({ ...device, status: DeviceStatus.VALID }).pipe(delay(5000));
  }
}
