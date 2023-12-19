import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSetupOverviewComponent } from './device-setup-overview.component';

describe('DeviceSetupOverviewComponent', () => {
  let component: DeviceSetupOverviewComponent;
  let fixture: ComponentFixture<DeviceSetupOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSetupOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSetupOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
