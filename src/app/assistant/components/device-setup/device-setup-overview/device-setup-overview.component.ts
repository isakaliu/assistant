import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-setup-overview',
  templateUrl: './device-setup-overview.component.html',
  styleUrls: ['./device-setup-overview.component.scss'],
})
export class DeviceSetupOverviewComponent implements OnInit {
  @Input() title: string | undefined = '';
  @Input() description: string | undefined = '';

  constructor() {}

  ngOnInit(): void {}
}
