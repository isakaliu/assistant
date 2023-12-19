import { DeviceStatus } from '../enums/assistant.enums';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
}

export interface Programmer {
  id: string;
  name: string;
}

export interface DeviceOverviewMetadata {
  title?: string;
  description?: string;
  buttonText: string;
}
