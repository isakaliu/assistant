import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-device-duplication',
  templateUrl: './device-duplication.component.html',
  styleUrls: ['./device-duplication.component.scss'],
})
export class DeviceDuplicationComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() isFormSubmitted: boolean = false;
  @Output() formValueChanged: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    this.subscribeToFromChange();
  }

  get isInpuValid(): boolean | null {
    return this.form.controls['deviceName'].errors && this.isFormSubmitted;
  }

  subscribeToFromChange() {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.formValueChanged.emit(this.form);
      });
  }
}
