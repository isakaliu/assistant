import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AssistantRoutingModule } from './assistant-routing.module';
import { AssistantComponent } from './pages/assistant/assistant.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceSelectorComponent } from './components/device-selector/device-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceSetupComponent } from './components/device-setup/device-setup.component';
import { DeviceSetupOverviewComponent } from './components/device-setup/device-setup-overview/device-setup-overview.component';
import { DeviceDuplicationComponent } from './components/device-duplication/device-duplication.component';

@NgModule({
  declarations: [
    AssistantComponent,
    DeviceSelectorComponent,
    DeviceSetupComponent,
    DeviceSetupOverviewComponent,
    DeviceDuplicationComponent,
  ],
  imports: [
    CommonModule,
    AssistantRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AssistantModule {}
