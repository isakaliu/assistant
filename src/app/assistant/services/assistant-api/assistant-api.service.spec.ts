import { TestBed } from '@angular/core/testing';

import { AssistantApiService } from './assistant-api.service';

describe('AssistantApiService', () => {
  let service: AssistantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
