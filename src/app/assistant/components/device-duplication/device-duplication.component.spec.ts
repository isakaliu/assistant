import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDuplicationComponent } from './device-duplication.component';

describe('DeviceDuplicationComponent', () => {
  let component: DeviceDuplicationComponent;
  let fixture: ComponentFixture<DeviceDuplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDuplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDuplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
