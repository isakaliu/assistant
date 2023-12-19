import { Injectable } from '@angular/core';
import { modalVars } from '../constants/modal.constants';
import { IModal, Modal } from '../interfaces/modal.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  open(modalId: Modal): void {
    modalVars[modalId] = true;
  }

  close(modalId: Modal): void {
    if (!modalId) return;
    modalVars[modalId] = false;
  }
}
