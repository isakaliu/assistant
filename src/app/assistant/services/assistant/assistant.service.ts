import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { AssistantSteps } from '../../enums/assistant.enums';
import { AssistantApiService } from '../assistant-api/assistant-api.service';
import { ModalService } from '../../../shared/services/modal.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { DevicesService } from '../../../core/services/devices/devices.service';
import { Device, Programmer } from '../../interfaces/assistant-interfaces';
import { ProgrammersService } from '../../../core/services/programmers/programmers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { deviceOverviewMetadata } from '../../constants/device-overview.metadata';

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  destruction$: Subject<any> = new Subject();
  // Can move most of the logic inside the service
  assistantStep: BehaviorSubject<AssistantSteps> =
    new BehaviorSubject<AssistantSteps>(AssistantSteps.STANDBY);
  deviceSelectorForm!: FormGroup;
  deviceDuplicationForm!: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(
    private assistantApiService: AssistantApiService,
    private modalService: ModalService,
    private loggerService: LoggerService,
    private devicesService: DevicesService<Device>,
    private programmerService: ProgrammersService<Programmer>
  ) {
    this.initDeviceSelectorForm();
    this.intializeDeviceDuplicationForm();
  }

  /** Initializes device selector form */
  initDeviceSelectorForm() {
    this.deviceSelectorForm = new FormGroup({
      device: new FormControl(null, [Validators.required]),
      programmer: new FormControl(null, [Validators.required]),
    });
  }

  intializeDeviceDuplicationForm() {
    this.deviceDuplicationForm = new FormGroup({
      deviceName: new FormControl('', [Validators.required]),
    });
  }

  /** Sets active step value */
  setActiveStep(step: AssistantSteps): void {
    this.assistantStep.next(step);
  }

  /** @param step {AssistanSteps}
   *  Decides whether to trigger or stop the loading states
   */
  shouldTriggerOrStopSetup(step: AssistantSteps): void {
    switch (step) {
      case AssistantSteps.INVALIDATION:
      case AssistantSteps.PROGRAMMING: {
        this.startSetup();
        break;
      }
      default: {
        this.stopSetup();
      }
    }
  }

  /** Sets loading state to true */
  startSetup(): void {
    this.isFormSubmitted = true;
    this.assistantApiService.isLoading.next(true);
  }

  /** Sets loading state to false */
  stopSetup(): void {
    this.isFormSubmitted = false;
    this.assistantApiService.isLoading.next(false);
  }

  /** Resets entire process to intial state */
  resetEntireProcess(): void {
    this.setActiveStep(AssistantSteps.STANDBY);
    this.stopSetup();
    this.deviceSelectorForm.reset();
    this.deviceSelectorForm.enable();
    this.deviceDuplicationForm?.reset();
  }

  /** @param state {boolean} Open/Close modal */
  displayModal(state = true) {
    if (state) {
      this.modalService.open('assistant');
    } else {
      this.resetEntireProcess();
      this.modalService.close('assistant');
    }
  }

  /** Retrieves a list of devices from API MOCK */
  fetchDevicesFromApi(): void {
    this.assistantApiService
      .getDevices()
      .pipe(
        takeUntil(this.destruction$),
        tap((data) => this.loggerService.info('Fetched devices'))
      )
      .subscribe({
        next: (data) => {
          this.devicesService.setData(data);
        },
        error: (error: HttpErrorResponse | any) => {
          this.loggerService.error('Failed to fetch devices');
        },
      });
  }

  /** Retrieves a list of programmer devices from API MOCK */
  fetchProgrammersFromApi(): void {
    this.assistantApiService
      .getProgrammers()
      .pipe(
        takeUntil(this.destruction$),
        tap((data) => this.loggerService.info('Fetched programmers'))
      )
      .subscribe({
        next: (data) => {
          this.programmerService.setData(data);
        },
        error: (error: HttpErrorResponse | any) => {
          this.loggerService.error('Failed to fetch programmers');
        },
      });
  }

  /** Listens and resets the process if canceled */
  listenToCancelProcess(): void {
    this.destruction$.subscribe((isCanceled) => {
      if (isCanceled) {
        this.resetEntireProcess();
        throw new Error('Process got canceled by user');
      }
    });
  }

  /** @param data: {Device}
   * Invalidates device
   */
  invalidateDevice(data: Device): void {
    this.assistantApiService
      .invalidateDevice(data)
      .pipe(takeUntil(this.destruction$))
      .subscribe({
        next: (data: Device) => this.handleInvalidateDeviceSuccess(data),
        error: (error: HttpErrorResponse) =>
          this.handleInvalidateDeviceError(error),
      });
  }

  /** Handles Invalidation Success settings */
  private handleInvalidateDeviceSuccess(data: Device): void {
    this.devicesService.update(data.id, data);
    this.stopSetup();
    this.moveToNextStep();
    this.loggerService.success('Device Invalidation successfull');
  }

  /** Handles Invalidation Error settings */
  private handleInvalidateDeviceError(error: HttpErrorResponse): void {
    this.resetEntireProcess();
    this.loggerService.error('Error occured during device invalidation');
  }

  /** @param data {Device}
   * Start Duplication process
   */
  startDuplicationProcess(data: Device): void {
    // Assuming we need to sync duplicated device and programm with API
    // which in this case does only update the name
    this.assistantApiService
      .duplicateDevice(data)
      .pipe(takeUntil(this.destruction$))
      .subscribe({
        next: (data) => {
          this.resolveDuplicationProcess(data);
        },
        error: (error) => {
          this.loggerService.error('Could not duplicate the device');
          this.resetEntireProcess();
        },
      });
  }

  /** Handles Duplication Success settings */
  resolveDuplicationProcess(data: Device): void {
    this.devicesService.update(data.id, data);
    deviceOverviewMetadata[
      AssistantSteps.COMPLETED
    ].description = `${data.name} is ready`;
    this.stopSetup();
    this.moveToNextStep();
  }

  /** Increments step */
  moveToNextStep() {
    const nextStep = this.assistantStep.value + 1;
    this.setActiveStep(nextStep);
  }
}
