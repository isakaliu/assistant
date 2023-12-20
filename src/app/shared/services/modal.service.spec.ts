import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { modalVars } from '../constants/modal.constants';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should open modal', () => {
    service.open('assistant');
    expect(modalVars['assistant']).toBe(true);
  });

  it('Should close modal', () => {
    service.close('assistant');
    expect(modalVars['assistant']).toBe(false);
  });
});
