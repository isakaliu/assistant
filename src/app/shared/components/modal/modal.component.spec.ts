import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from '../../services/modal.service';
import { modalVars } from '../../constants/modal.constants';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    component.id = 'assistant';
    component.title = 'title';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should close modal and emit an event', () => {
    const spyOnEmmiter = spyOn(component.closeModal, 'emit');
    modalService.open('assistant');
    component.close();
    expect(modalVars['assistant']).toBe(false);
    expect(spyOnEmmiter).toHaveBeenCalled();
  });
});
