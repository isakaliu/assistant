import { DeviceStatus } from '../enums/assistant.enums';

export class DeviceDto {
  name: string;
  status: DeviceStatus;
  id: string;
  constructor(name: string, id: string, status = DeviceStatus.VALID) {
    this.name = name;
    this.id = id;
    this.status = status;
  }
}
