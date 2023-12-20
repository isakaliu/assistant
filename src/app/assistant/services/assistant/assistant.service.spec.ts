import { TestBed } from '@angular/core/testing';

import { AssistantService } from './assistant.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssistantSteps } from '../../enums/assistant.enums';
import { AssistantApiService } from '../assistant-api/assistant-api.service';
import { modalVars } from '../../../shared/constants/modal.constants';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../interfaces/assistant-interfaces';

describe('AssistantService', () => {
  let service: AssistantService;
  let assistantApiService: AssistantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssistantService);
    assistantApiService = TestBed.inject(AssistantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should initialize deviceSelectorForm', () => {
    service.initDeviceSelectorForm();
    expect(service.deviceSelectorForm).toBeDefined();
  });

  it('Should initialize intializeDeviceDuplicationForm', () => {
    service.initDeviceSelectorForm();
    expect(service.deviceDuplicationForm).toBeDefined();
  });

  it('Should set current active step', () => {
    service.setActiveStep(AssistantSteps.INVALIDATION);
    expect(service.assistantStep.value).toEqual(AssistantSteps.INVALIDATION);
  });

  it('Should trigger or stop setup', () => {
    const spyOnStartSetup = spyOn(service, 'startSetup');
    const spyOnStopSetup = spyOn(service, 'stopSetup');
    service.shouldTriggerOrStopSetup(AssistantSteps.INVALIDATION);
    expect(spyOnStartSetup).toHaveBeenCalled();
    service.shouldTriggerOrStopSetup(AssistantSteps.COMPLETED);
    expect(spyOnStopSetup).toHaveBeenCalled();
  });

  it('Should set formSubmitted and loading state to true', () => {
    service.startSetup();
    expect(service.isFormSubmitted).toBe(true);
    expect(assistantApiService.isLoading.value).toBe(true);
  });

  it('Should set formSubmitted and loading state to false', () => {
    service.stopSetup();
    expect(service.isFormSubmitted).toBe(false);
    expect(assistantApiService.isLoading.value).toBe(false);
  });

  it('Should reset entire process', () => {
    const spyOnSetStep = spyOn(service, 'setActiveStep');
    const spyOnStopSetup = spyOn(service, 'stopSetup');
    const formReset = spyOn(service.deviceSelectorForm, 'reset');
    const formEnable = spyOn(service.deviceSelectorForm, 'enable');

    service.resetEntireProcess();
    expect(spyOnSetStep).toHaveBeenCalledWith(AssistantSteps.STANDBY);
    expect(spyOnStopSetup).toHaveBeenCalled();
    expect(formReset).toHaveBeenCalled();
    expect(formEnable).toHaveBeenCalled();
  });

  it('Should display/hide modal', () => {
    service.displayModal(true);
    expect(modalVars['assistant']).toBe(true);
    service.displayModal(false);
    expect(modalVars['assistant']).toBe(false);
  });

  it('Should fetch devices', () => {
    const http = TestBed.inject(HttpClient);
    const spyOnFetchDevices = spyOn(
      service,
      'fetchDevicesFromApi'
    ).and.returnValue(
      http.get<Observable<Device[]>>('assets/devices.json') as any
    );
    service.fetchDevicesFromApi();
    expect(spyOnFetchDevices).toHaveBeenCalled();
  });

  it('Should fetch programmers', () => {
    const http = TestBed.inject(HttpClient);
    const spyOnFetchDevices = spyOn(
      service,
      'fetchProgrammersFromApi'
    ).and.returnValue(
      http.get<Observable<Device[]>>('assets/programmers.json') as any
    );
    service.fetchProgrammersFromApi();
    expect(spyOnFetchDevices).toHaveBeenCalled();
  });
});
