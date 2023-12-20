import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { DevicesService } from '../../../core/services/devices/devices.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ProgrammersService } from '../../../core/services/programmers/programmers.service';
import { AssistantSteps } from '../../enums/assistant.enums';
import { AssistantApiService } from '../../services/assistant-api/assistant-api.service';
import { AssistantService } from '../../services/assistant/assistant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Device, Programmer } from '../../interfaces/assistant-interfaces';

describe('AssistantComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;
  let assistantApiService: AssistantApiService;
  let assistantService: AssistantService;
  let devicesService: DevicesService<Device>;
  let programmerService: ProgrammersService<Programmer>;
  let loggerService: LoggerService;
  const mockAssistantApiService = {
    isLoading: new BehaviorSubject<boolean>(false),
  };

  const mockDevicesService = {
    getAll: jasmine.createSpy('getAll'),
    getById: jasmine.createSpy('getById'),
  };

  const mockProgrammerService = {
    getAll: jasmine.createSpy('getAll'),
  };

  const mockLoggerService = {
    error: jasmine.createSpy('error'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistantComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        HttpClientTestingModule,
        AssistantApiService,
        AssistantService,
        DevicesService,
        ProgrammersService,
        LoggerService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantComponent);
    assistantApiService = TestBed.inject(AssistantApiService);
    assistantService = TestBed.inject(AssistantService);
    devicesService = TestBed.inject(DevicesService);
    programmerService = TestBed.inject(ProgrammersService);
    loggerService = TestBed.inject(LoggerService);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch devices, programmers, and listen to cancel process on ngOnInit', () => {
    const spyOntDevices = spyOn(
      assistantService,
      'fetchDevicesFromApi'
    ).and.callFake(() => of());
    const spyOnProgrammers = spyOn(
      assistantService,
      'fetchProgrammersFromApi'
    ).and.callFake(() => of());
    const spyOnCancel = spyOn(
      assistantService,
      'listenToCancelProcess'
    ).and.callFake(() => of());
    component.ngOnInit();
    expect(spyOntDevices).toHaveBeenCalled();
    expect(spyOnProgrammers).toHaveBeenCalled();
    expect(spyOnCancel).toHaveBeenCalled();
  });

  it('should subscribe to step change and trigger necessary action', () => {
    const spy = spyOn(component, 'subscribeToStepChange').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
