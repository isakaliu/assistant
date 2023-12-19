import { Component, OnDestroy, OnInit } from '@angular/core';
import { modalVars } from '../../../shared/constants/modal.constants';
import { AssistantApiService } from '../../services/assistant-api/assistant-api.service';
import { AssistantSteps } from '../../enums/assistant.enums';
import {
  Device,
  DeviceOverviewMetadata,
  Programmer,
} from '../../interfaces/assistant-interfaces';
import { AssistantService } from '../../services/assistant/assistant.service';
import { FormGroup } from '@angular/forms';
import { DevicesService } from '../../../core/services/devices/devices.service';
import { ProgrammersService } from '../../../core/services/programmers/programmers.service';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { deviceOverviewMetadata } from '../../constants/device-overview.metadata';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  modalVars = modalVars;
  constructor(
    private assistantApiService: AssistantApiService,
    private assistantService: AssistantService,
    private devicesService: DevicesService<Device>,
    private programmerService: ProgrammersService<Programmer>,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.assistantService.fetchDevicesFromApi();
    this.assistantService.fetchProgrammersFromApi();
    this.assistantService.listenToCancelProcess();
    this.subscribeToStepChange();
  }

  get isLoading(): BehaviorSubject<boolean> {
    return this.assistantApiService.isLoading;
  }

  get deviceSelectForm(): FormGroup {
    return this.assistantService.deviceSelectorForm;
  }

  get deviceDuplicationForm(): FormGroup {
    return this.assistantService.deviceDuplicationForm;
  }

  get devices(): Device[] {
    return this.devicesService.getAll();
  }

  get programmers(): Programmer[] {
    return this.programmerService.getAll();
  }

  get setupOverviewMetaData(): DeviceOverviewMetadata {
    return (
      deviceOverviewMetadata[this.stepValue] || {
        title: '',
        description: '',
      }
    );
  }

  get shouldShowDeviceDuplication(): boolean {
    return (
      this.stepValue === AssistantSteps.DUPLICATION && !this.isLoading.value
    );
  }

  get shouldShowNextButton(): boolean {
    return this.stepValue !== AssistantSteps.COMPLETED;
  }

  get selectedDevice(): Device {
    const selectedDeviceId = this.deviceSelectForm.value.device;
    return this.getDeviceById(selectedDeviceId) as Device;
  }

  get stepValue(): AssistantSteps {
    return this.assistantService.assistantStep.value;
  }

  get isInvalidationStep(): boolean {
    return (
      this.deviceSelectForm.valid &&
      this.stepValue === AssistantSteps.INVALIDATION
    );
  }

  get isDuplicationStep(): boolean {
    return (
      this.deviceDuplicationForm?.valid &&
      this.stepValue === AssistantSteps.PROGRAMMING
    );
  }

  get isFormSubmitted(): boolean {
    return this.assistantService.isFormSubmitted;
  }

  /** Moves to next step or cancels process */
  moveToNextStep(): void {
    if (this.isLoading.value) {
      this.assistantService.destruction$.next(true);
    } else {
      this.assistantService.moveToNextStep();
    }
  }

  /** Listens for step change and triggeres necessary action */
  subscribeToStepChange(): void {
    this.assistantService.assistantStep.subscribe(
      (step: AssistantSteps): void => {
        const isNotInitialStep = step !== AssistantSteps.STANDBY;
        if (isNotInitialStep) {
          this.assistantService.shouldTriggerOrStopSetup(step);
          this.handleNextClicked();
        }
      }
    );
  }

  handleNextClicked(): void {
    if (this.isInvalidationStep) {
      this.startInvalidateDeviceProcess(this.selectedDevice);
    } else if (this.isDuplicationStep) {
      this.handleDuplicationProcess();
    }
  }

  handleDuplicationProcess(): void {
    const { deviceName } = this.deviceDuplicationForm.value;
    const modifiedDevice: Device = { ...this.selectedDevice, name: deviceName };
    this.assistantService.startDuplicationProcess(modifiedDevice);
  }

  /** @param device: {Device}
   * Starts invalidation process
   */
  startInvalidateDeviceProcess(device: Device | null): void {
    if (device) {
      this.deviceSelectForm.disable();
      this.assistantService.invalidateDevice(device);
    } else {
      this.loggerService.error('No device found with that ID');
    }
  }

  /** @param id: {string}
   * Returns device
   */
  getDeviceById(id: string): Device | null {
    return this.devicesService.getById(id);
  }

  /** Hide/Show mdoal */
  displayModal(state = true) {
    this.assistantService.displayModal(state);
  }

  /** Destroys subscriptions */
  ngOnDestroy(): void {
    this.assistantService.destruction$.next(null);
    this.assistantService.destruction$.complete();
  }
}
