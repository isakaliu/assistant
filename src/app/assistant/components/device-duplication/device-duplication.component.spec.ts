import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDuplicationComponent } from './device-duplication.component';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';

describe('DeviceDuplicationComponent', () => {
  let component: DeviceDuplicationComponent;
  let fixture: ComponentFixture<DeviceDuplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceDuplicationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDuplicationComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    spyOnProperty(component, 'isInpuValid').and.returnValue(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
