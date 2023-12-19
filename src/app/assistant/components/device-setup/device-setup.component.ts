import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-device-setup',
  templateUrl: './device-setup.component.html',
  styleUrls: ['./device-setup.component.scss'],
})
export class DeviceSetupComponent implements OnInit {
  @Input() disabled = false;
  @Input() buttonText: string = '';
  @Input() showNextButton = true;

  @Output() nextClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  handleNext() {
    this.nextClicked.emit();
  }
}
