import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [ModalComponent, ProgressBarComponent],
  imports: [CommonModule],
  exports: [ModalComponent, ProgressBarComponent],
})
export class SharedModule {}
