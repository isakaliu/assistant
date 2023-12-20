import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSelectorComponent } from './device-selector.component';
import { FormGroup } from '@angular/forms';

describe('DeviceSelectorComponent', () => {
  let component: DeviceSelectorComponent;
  let fixture: ComponentFixture<DeviceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSelectorComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    spyOnProperty(component, 'isDeviceInvalid').and.returnValue(false);
    spyOnProperty(component, 'isProgrammerInvalid').and.returnValue(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
