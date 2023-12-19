import { AssistantSteps } from '../enums/assistant.enums';
import { DeviceOverviewMetadata } from '../interfaces/assistant-interfaces';

export const deviceOverviewMetadata: Record<
  AssistantSteps,
  DeviceOverviewMetadata
> = {
  [AssistantSteps.STANDBY]: {
    description: 'Please select a device to be replaced',
    title: '',
    buttonText: 'Next',
  },
  [AssistantSteps.INVALIDATION]: {
    description: 'Please wait until the device is reset successfully',
    title: 'Invalidation',
    buttonText: 'Cancel',
  },
  [AssistantSteps.DUPLICATION]: {
    description: 'Please enter the name for a new device',
    title: 'Duplication',
    buttonText: 'Next',
  },
  [AssistantSteps.PROGRAMMING]: {
    description: 'Please wait until device will be programmed successfully',
    title: 'Programming',
    buttonText: 'Cancel',
  },
  [AssistantSteps.COMPLETED]: {
    description: 'Device is ready',
    title: 'Result',
    buttonText: '',
  },
};
