import { TestBed } from '@angular/core/testing';

import { ProgrammersService } from './programmers.service';

describe('ProgrammersService', () => {
  let service: ProgrammersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
