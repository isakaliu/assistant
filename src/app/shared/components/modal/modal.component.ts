import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Modal } from '../../interfaces/modal.interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Input() id: Modal = 'assistant';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.validateInputs();
  }

  close(): void {
    this.modalService.close(this.id);
    this.closeModal.emit();
  }

  /** Throw exception in case ID is not specified */
  validateInputs() {
    if (!this.id) throw 'Please specify an ID for the modal';
    if (!this.title) throw 'Please specify a title for the modal';
  }
}
