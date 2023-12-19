import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantComponent } from './pages/assistant/assistant.component';

const routes: Routes = [{ path: '', component: AssistantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistantRoutingModule {}
