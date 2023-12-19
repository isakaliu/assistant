import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'assistant', pathMatch: 'full' },
  {
    path: 'assistant',
    loadChildren: () =>
      import('./assistant/assistant.module').then(
        (module) => module.AssistantModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
