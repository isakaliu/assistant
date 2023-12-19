import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device, Programmer } from '../../interfaces/assistant-interfaces';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss'],
})
export class DeviceSelectorComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() isFormSubmitted: boolean = false;
  @Input() devices!: Device[];
  @Input() programmers: Programmer[] = [];
  @Output() formValueChanged: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  constructor() {}

  ngOnInit(): void {
    this.subscribeToFromChange();
  }

  get isDeviceInvalid(): boolean | null {
    return this.form.controls['device'].errors && this.isFormSubmitted;
  }

  get isProgrammerInvalid(): boolean | null {
    return this.form.controls['programmer'].errors && this.isFormSubmitted;
  }

  subscribeToFromChange() {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.formValueChanged.emit(this.form);
      });
  }
}
