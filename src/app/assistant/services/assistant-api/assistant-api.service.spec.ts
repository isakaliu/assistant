import { TestBed } from '@angular/core/testing';

import { AssistantApiService } from './assistant-api.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssistantApiService', () => {
  let service: AssistantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssistantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
